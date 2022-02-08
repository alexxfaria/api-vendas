import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';

@injectable()
class ListProductService {
  constructor(@inject('ProductsRepository') private productsRepository: IProductsRepository) {}

  public async execute(): Promise<IProduct[]> {
    const products = await this.productsRepository.findAll();
    return products;
  }
}
export default ListProductService;
