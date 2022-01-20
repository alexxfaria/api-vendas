import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}

class DeleteOrderService {
  public async execute({ id }: IRequest): Promise<void> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const order = await ordersRepository.findOne(id);
    if (!order) {
      throw new AppError('Order not found.');
    }

    await ordersRepository.remove(order);
  }
}
export default DeleteOrderService;
