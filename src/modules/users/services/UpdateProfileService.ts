import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class UpdateProfileService {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<IUser> {
    const user = await this.usersRepository.findByUserId(user_id);

    if (!user) {
      throw new AppError('User not exist.');
    }
    const usersExists = await this.usersRepository.findByName(email);

    if (usersExists && usersExists.id != user_id) {
      throw new AppError('There is already one user with this email.');
    }

    if (usersExists && email != user.email) {
      throw new AppError('Email address already used.');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required.');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.');
      }
      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await this.usersRepository.save(user);
    return user;
  }
}
export default UpdateProfileService;
