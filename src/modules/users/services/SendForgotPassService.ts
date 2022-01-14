import EtherealMail from '@config/mail/EtherealMail';
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

    const { token } = await usersTokenRepository.generate(emailExists.id);

    await EtherealMail.sendMail({
      to: {
        name: emailExists.name,
        email: emailExists.email,
      },
      subject: 'Recuperação de senhas',
      templateData: {
        template: `Olá {{name}}: {{token}}`,
        variables: {
          name: emailExists.name,
          token,
        },
      },
    });
  }
}
export default SendForgotPassService;
