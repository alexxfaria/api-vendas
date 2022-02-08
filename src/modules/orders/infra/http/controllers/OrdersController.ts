import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../../../services/CreateOrderService';
import DeleteOrderService from '../../../services/DeleteOrderService';
import ListOrderService from '../../../services/ListOrderService';
import ShowOrderService from '../../../services/ShowOrderService';

class OrdersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id });

    return res.json(order);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({ customer_id, products });

    return res.json(order);
  }
  public async index(req: Request, res: Response): Promise<Response> {
    const listOrders = container.resolve(ListOrderService);

    const orders = await listOrders.execute();
    return res.json(orders);
  }
  // public async update(req: Request, res: Response): Promise<Response> {
  //   const { customer_id, products } = req.body;
  //   const { id } = req.params;

  //   const updateOrder = container.resolve(UpdateOrderService);

  //   const order = await updateOrder.execute({ id, customer_id, products });

  //   return res.json(order);
  // }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteOrder = container.resolve(DeleteOrderService);

    await deleteOrder.execute({ id });

    return res.json([]);
  }
}
export default OrdersController;
