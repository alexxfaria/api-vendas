import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepositories';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const redisCache = new RedisCache();
    const user = await usersRepository.findOne(id);
    if (!user) {
      throw new AppError('User not exist.');
    }
    const usersExists = await usersRepository.findByName(email);

    if (usersExists && email != user.email) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await redisCache.invalidate('api-vendas-USER_LIST');
    await usersRepository.save(user);
    return user;
  }
}
export default UpdateUserService;
