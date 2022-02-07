import { EntityRepository, Repository } from 'typeorm';
import Customers from '../entities/Customers';

@EntityRepository(Customers)
class CustomersRepository extends Repository<Customers> {
  public async findByEmail(email: string): Promise<Customers | undefined> {
    const customers = this.findOne({
      where: {
        email,
      },
    });
    return customers;
  }
  public async findByName(name: string): Promise<Customers | undefined> {
    const customers = this.findOne({
      where: {
        name,
      },
    });
    return customers;
  }
  public async findById(id: string): Promise<Customers | undefined> {
    const customers = this.findOne({
      where: {
        id,
      },
    });
    return customers;
  }
}
export default CustomersRepository;
