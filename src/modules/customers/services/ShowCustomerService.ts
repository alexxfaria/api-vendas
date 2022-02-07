import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';
import { INameCustomer } from '../domain/models/INameCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepositories';
import Customers from '../infra/typeorm/entities/Customers';

@injectable()
class ShowCustomerService {
  constructor(@inject('CustomersRepository') private customersRepository: ICustomersRepository) {}
  public async execute({ id }: IDeleteCustomer): Promise<Customers> {
    const customers = await this.customersRepository.findById(id);
    if (!customers) {
      throw new AppError('User not found');
    }
    return customers;
  }
  public async nameid({ name }: INameCustomer): Promise<Customers> {
    const customers = await this.customersRepository.findByName(name);
    if (!customers) {
      throw new AppError('User not found');
    }
    return customers;
  }
}
export default ShowCustomerService;
