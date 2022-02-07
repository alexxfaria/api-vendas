import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UsersTokenRepository from '../infra/typeorm/repositories/UsersTokenRepository';
import { isAfter, addHours } from 'date-fns';
import UsersRepository from '../infra/typeorm/repositories/UsersRepositories';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokenRepository = getCustomRepository(UsersTokenRepository);
    const redisCache = new RedisCache();

    const userToken = await usersTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User Token does not exists');
    }
    const user = await usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreateAt = userToken.created_at;
    const compareDate = addHours(tokenCreateAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired.');
    }
    const hashedPassword = await hash(password, 8);
    user.password = hashedPassword;
    await redisCache.invalidate('api-vendas-USER_LIST');
    await usersRepository.save(user);
  }
}
export default ResetPasswordService;
