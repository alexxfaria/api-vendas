import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customers from '../typeorm/entities/Customers';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customers> {
    const customerRepository = getCustomRepository(CustomersRepository);
    const customer = await customerRepository.findOne(id);
    if (!customer) {
      throw new AppError('Customer not exist.');
    }
    const usersExists = await customerRepository.findByName(email);

    if (usersExists && email != customer.email) {
      throw new AppError('Email address already used');
    }

    customer.name = name;
    customer.email = email;

    await customerRepository.save(customer);
    return customer;
  }
}
export default UpdateCustomerService;
