import RedisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../infra/typeorm/entities/Product';
import ProductRepository from '../infra/typeorm/repositories/ProductsRepository';

interface IRequest {
  id: string;
  quantity: number;
}

class UpdateQuantityProductService {
  public async execute({ id, quantity }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);
    const redisCache = new RedisCache();
    const product = await productsRepository.findOne(id);
    if (!product) {
      throw new AppError('Product not found.');
    }

    product.quantity = quantity;
    await redisCache.invalidate('api-vendas-PRODUCT_LIST');
    await productsRepository.save(product);
    return product;
  }
}
export default UpdateQuantityProductService;
