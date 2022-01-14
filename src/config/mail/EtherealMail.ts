import nodemailer from 'nodemailer';

interface ISendEmail {
  to: string;
  body: string;
}
class EtherealMail {
  static async sendMail({ to, body }: ISendEmail): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transporter.sendMail({
      from: 'teste@apivendas.com.br',
      to,
      subject: 'Teste de email',
      text: body,
    });
    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
export default EtherealMail;
