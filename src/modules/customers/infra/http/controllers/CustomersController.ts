import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomerService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

class CustomersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createCustomers = container.resolve(CreateCustomerService);

    const customers = await createCustomers.execute({ name, email });

    return res.json(customers);
  }
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showCustomer = container.resolve(ShowCustomerService);

    const customer = await showCustomer.execute({ id });

    return res.json(customer);
  }
  public async index(req: Request, res: Response): Promise<Response> {
    const listCustomers = container.resolve(ListCustomerService);

    const customers = await listCustomers.execute();

    return res.json(customers);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute({ id, name, email });

    return res.json(customer);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ id });

    return res.json([]);
  }
}
export default CustomersController;
