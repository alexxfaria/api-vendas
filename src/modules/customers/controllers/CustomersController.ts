import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import ListCustomerService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';

class CustomersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createCustomers = new CreateCustomerService();

    const customers = await createCustomers.execute({ name, email });

    return res.json(customers);
  }
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showCustomer = new ShowCustomerService();

    const customer = await showCustomer.execute({ id });

    return res.json(customer);
  }
  public async index(req: Request, res: Response): Promise<Response> {
    const listCustomers = new ListCustomerService();

    const customers = await listCustomers.execute();

    return res.json(customers);
  }
}
export default CustomersController;
