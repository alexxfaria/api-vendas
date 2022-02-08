import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUpdateUser } from '../domain/models/IUpdateUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class UpdateUserService {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  public async execute({ id, name, email, password }: IUpdateUser): Promise<IUser> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError('User not exist.');
    }
    const usersExists = await this.usersRepository.findByName(email);

    if (usersExists && email != user.email) {
      throw new AppError('Email address already used');
    }

    const hashedPassword = await hash(password, 8);

    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await this.usersRepository.save(user);
    return user;
  }
}
export default UpdateUserService;
