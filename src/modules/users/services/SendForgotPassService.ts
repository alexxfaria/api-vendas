import EtherealMail from '@config/mail/EtherealMail';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepositories';
import UsersTokenRepository from '../typeorm/repositories/UsersTokenRepository';

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

    const { token } = await usersTokenRepository.generate(emailExists.id);

    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await EtherealMail.sendMail({
      to: {
        name: emailExists.name,
        email: emailExists.email,
      },
      subject: 'Recuperação de senhas',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: emailExists.name,
          link: `http://localhost:3333/reset_password?token=${token}`,
        },
      },
    });
  }
}
export default SendForgotPassService;
