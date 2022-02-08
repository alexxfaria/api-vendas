import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IFindProduct } from '@modules/products/domain/models/IFindProduct';
import { IUpdateStockProduct } from '@modules/products/domain/models/IUpdateStockProduct';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { EntityRepository, Repository, In, getRepository } from 'typeorm';
import Product from '../entities/Product';

@EntityRepository(Product)
class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }
  public async create({ name, price, quantity }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async updateStock(products: IUpdateStockProduct[]): Promise<void> {
    await this.ormRepository.save(products);
  }
  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return product;
  }
  public async findById(id: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne(id);

    return product;
  }
  public async findAll(): Promise<Product[]> {
    const products = this.ormRepository.find();

    return products;
  }
  public async findAllByIds(products: IFindProduct[]): Promise<Product[]> {
    const productIds = products.map(product => product.id);
    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productIds),
      },
    });
    return existsProducts;
  }
}
export default ProductsRepository;
