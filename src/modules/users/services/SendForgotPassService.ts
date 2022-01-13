import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepositories';
import UsersTokenRepository from '../typeorm/repositories/UsersTokenRepositories';

interface IRequest {
  email: string;
}

class SendForgotPassService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UsersRepository);
    const usersTokenRepository = getCustomRepository(UsersTokenRepository);

    const emailExists = await usersRepository.findByEmail(email);

    if (!emailExists) {
      throw new AppError('User does not exists');
    }

    const token = await usersTokenRepository.generate(emailExists.id);

    console.log(token);
  }
}
export default SendForgotPassService;
