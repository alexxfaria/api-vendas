import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepositories';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const redisCache = new RedisCache();
    const user = await usersRepository.findOne(id);
    if (!user) {
      throw new AppError('User not found.');
    }
    await redisCache.invalidate('api-vendas-USER_LIST');
    await usersRepository.remove(user);
  }
}
export default DeleteUserService;
