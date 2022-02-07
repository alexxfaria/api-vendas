import { Request, Response } from 'express';
import CreateSessionService from '../../../services/CreateSessionService';
import { instanceToInstance } from 'class-transformer';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSession = new CreateSessionService();

    const user = await createSession.execute({ email, password });

    return res.json(instanceToInstance(user));
  }
}
export default SessionsController;