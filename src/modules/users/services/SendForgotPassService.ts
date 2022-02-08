import EtherealMail from '@config/mail/EtherealMail';
import AppError from '@shared/errors/AppError';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import { ISendForgotPasswordEmail } from '../domain/models/ISendForgotPasswordEmail';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';

@injectable()
class SendForgotPassService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('UsersTokenRepository') private usersTokenRepository: IUserTokensRepository,
  ) {}
  public async execute({ email }: ISendForgotPasswordEmail): Promise<void> {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (!emailExists) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.usersTokenRepository.generate(emailExists.id);

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
          link: `${process.env.APP_WEB_URL}/reset_password?token=${token}`,
        },
      },
    });
  }
}
export default SendForgotPassService;
