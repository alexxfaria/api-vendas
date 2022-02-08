import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IShowOrder } from '../domain/models/IShowOrder ';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';

@injectable()
class DeleteOrderService {
  constructor(@inject('OrdersRepository') private ordersRepository: IOrdersRepository) {}
  public async execute({ id }: IShowOrder): Promise<void> {
    const order = await this.ordersRepository.findById(id);
    if (!order) {
      throw new AppError('Order not found.');
    }
    await this.ordersRepository.remove(order);
  }
}
export default DeleteOrderService;
