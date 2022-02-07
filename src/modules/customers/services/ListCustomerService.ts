import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepositories';
import Customers from '../infra/typeorm/entities/Customers';

@injectable()
class ListCustomerService {
  constructor(@inject('CustomersRepository') private customersRepository: ICustomersRepository) {}

  public async execute(): Promise<Customers[] | undefined> {
    const customers = await this.customersRepository.findAll();
    return customers;
  }
}
export default ListCustomerService;
