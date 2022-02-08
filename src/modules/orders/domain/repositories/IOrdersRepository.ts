import { IShowId } from '@modules/users/domain/models/IShowId';
import { ICreateOrder } from '../models/ICreateOrder';
import { IOrder } from '../models/IOrder';

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | undefined>;
  create(data: ICreateOrder): Promise<IOrder>;
  remove(order: IShowId): Promise<void>;
  findAll(): Promise<IOrder[]>;
}
