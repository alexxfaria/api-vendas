import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  quantity: number;
}

class UpdateQuantityProductService {
  public async execute({ id, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found.');
    }

    product.quantity = quantity;

    await productsRepository.save(product);
    return product;
  }
}
export default UpdateQuantityProductService;
