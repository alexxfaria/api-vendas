import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IShowId } from '../domain/models/IShowid';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class DeleteUserService {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}
  public async execute({ id }: IShowId): Promise<void> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found.');
    }
    await this.usersRepository.remove(user);
  }
}
export default DeleteUserService;
