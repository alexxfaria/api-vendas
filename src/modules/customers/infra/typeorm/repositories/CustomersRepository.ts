import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepositories';
import RedisCache from '@shared/cache/RedisCache';
import { getRepository, Repository } from 'typeorm';
import Customers from '../entities/Customers';

class CustomersRepository implements ICustomersRepository {
  private ormRepository: Repository<Customers>;

  constructor() {
    this.ormRepository = getRepository(Customers);
  }

  public async create({ name, email }: ICreateCustomer): Promise<Customers> {
    const customer = this.ormRepository.create({ name, email });
    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-CUSTOMERS_LIST');
    await this.ormRepository.save(customer);
    return customer;
  }
  public async save(customer: Customers): Promise<Customers> {
    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-CUSTOMERS_LIST');
    await this.ormRepository.save(customer);
    return customer;
  }
  public async remove(customer: Customers): Promise<void> {
    const redisCache = new RedisCache();
    await redisCache.invalidate('api-vendas-CUSTOMERS_LIST');
    await this.ormRepository.remove(customer);
  }

  public async findByEmail(email: string): Promise<Customers | undefined> {
    const customers = this.ormRepository.findOne({
      where: {
        email,
      },
    });
    return customers;
  }
  public async findByName(name: string): Promise<Customers | undefined> {
    const customers = this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return customers;
  }
  public async findById(id: string): Promise<Customers | undefined> {
    const customers = this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return customers;
  }
  public async findAll(): Promise<Customers[] | undefined> {
    const customers = await this.ormRepository.find();

    return customers;
  }
}
export default CustomersRepository;
