import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

interface IName {
  name: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customers> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customers = await customerRepository.findOne(id);
    if (!customers) {
      throw new AppError('User not found');
    }
    return customers;
  }
  public async nameid({ name }: IName): Promise<Customers> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customers = await customerRepository.findOne(name);
    if (!customers) {
      throw new AppError('User not found');
    }
    return customers;
  }
}
export default ShowCustomerService;
