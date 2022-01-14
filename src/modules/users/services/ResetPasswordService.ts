import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { UsersRepository } from '../typeorm/repositories/UsersRepositories';
import UsersTokenRepository from '../typeorm/repositories/UsersTokenRepositories';
import { isAfter, addHours } from 'date-fns';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokenRepository = getCustomRepository(UsersTokenRepository);

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

    await usersRepository.save(user);
  }
}
export default ResetPasswordService;
