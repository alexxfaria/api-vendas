import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import OrdersRepository from '../infra/typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}

class DeleteOrderService {
  public async execute({ id }: IRequest): Promise<void> {
    const ordersRepository = getCustomRepository(OrdersRepository);
    const redisCache = new RedisCache();

    const order = await ordersRepository.findOne(id);
    if (!order) {
      throw new AppError('Order not found.');
    }
    await redisCache.invalidate('api-vendas-ORDER_LIST');
    await ordersRepository.remove(order);
  }
}
export default DeleteOrderService;
