import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import DeleteUserService from '../../../services/DeleteUserService';
import ListUserService from '../../../services/ListUserService';
import ShowUserService from '../../../services/ShowUserService';
import UpdateUserService from '../../../services/UpdateUserService';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute();

    return res.json(instanceToInstance(users));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showUser = container.resolve(ShowUserService);

    const user = await showUser.execute({ id });

    return res.json(instanceToInstance(user));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return res.json(instanceToInstance(user));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const { id } = req.params;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({ id, name, email, password });

    return res.json(instanceToInstance(user));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({ id });

    return res.json([]);
  }
}
export default UsersController;
