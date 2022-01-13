import { Request, Response } from 'express';
import SendForgotPassService from '../services/SendForgotPassService';

class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;

    const sendForgot = new SendForgotPassService();

    await sendForgot.execute({ email });

    return res.status(204).json();
  }
}
export default ForgotPasswordController;
