import { getCustomRepository } from 'typeorm';
import Product from '../entities/Product';
import { ProductRepository } from '../repositories/ProductsRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = productsRepository.find();
    return product;
  }
}
export default ListProductService;
