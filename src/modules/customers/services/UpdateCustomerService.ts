import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepositories';

@injectable()
class UpdateCustomerService {
  constructor(@inject('CustomersRepository') private customersRepository: ICustomersRepository) {}

  public async execute({ id, name, email }: IUpdateCustomer): Promise<ICustomer> {
    const customer = await this.customersRepository.findById(id);
    if (!customer) {
      throw new AppError('Customer not exist.');
    }
    const usersExists = await this.customersRepository.findByEmail(email);

    if (usersExists && email != customer.email) {
      throw new AppError('Email address already used');
    }

    customer.name = name;
    customer.email = email;
    return customer;
  }
}
export default UpdateCustomerService;
