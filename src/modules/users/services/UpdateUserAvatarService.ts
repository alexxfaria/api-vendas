import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';

@injectable()
class UpdateUserAvatarService {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatarFilename }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); //Deleta o avatar
      }
    }
    user.avatar = avatarFilename;
    await this.usersRepository.save(user);

    return user;
  }
}
export default UpdateUserAvatarService;
