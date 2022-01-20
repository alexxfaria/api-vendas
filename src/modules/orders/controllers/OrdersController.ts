import { Request, Response } from 'express';
import CreateOrderService from '../services/CreateOrderService';
import DeleteOrderService from '../services/DeleteOrderService';
import ListOrderService from '../services/ListOrderService';
import ShowOrderService from '../services/ShowOrderService';

class OrdersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOrder = new ShowOrderService();

    const order = await showOrder.execute({ id });

    return res.json(order);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({ customer_id, products });

    return res.json(order);
  }
  public async index(req: Request, res: Response): Promise<Response> {
    const listOrders = new ListOrderService();

    const orders = await listOrders.execute();

    return res.json(orders);
  }
  // public async update(req: Request, res: Response): Promise<Response> {
  //   const { name, email } = req.body;
  //   const { id } = req.params;

  //   const updateCustomer = new UpdateCustomerService();

  //   const customer = await updateCustomer.execute({ id, name, email });

  //   return res.json(customer);
  // }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteOrder = new DeleteOrderService();

    await deleteOrder.execute({ id });

    return res.json([]);
  }
}
export default OrdersController;
