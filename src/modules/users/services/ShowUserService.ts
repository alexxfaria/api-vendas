import AppError from '@shared/errors/AppError';
import { inject } from 'tsyringe';
import { IShowId } from '../domain/models/IShowid';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

class ShowUserService {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}
  public async execute({ id }: IShowId): Promise<IUser> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found');
    }
    return user;
  }
}
export default ShowUserService;
