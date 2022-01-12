import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepositories';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne(id);
    if (!user) {
      throw new AppError('Product not found.');
    }
    const usersExists = await usersRepository.findByName(name);

    if (usersExists && name != user.name) {
      throw new AppError('Email address already used');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await usersRepository.save(user);
    return user;
  }
}
export default UpdateUserService;
