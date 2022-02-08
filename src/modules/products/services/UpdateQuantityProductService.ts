import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProduct } from '../domain/models/IProduct';
import { IUpdateStockProduct } from '../domain/models/IUpdateStockProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class UpdateQuantityProductService {
  constructor(@inject('ProductsRepository') private productsRepository: IProductsRepository) {}

  public async execute({ id, quantity }: IUpdateStockProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found.');
    }

    product.quantity = quantity;
    await this.productsRepository.save(product);
    return product;
  }
}
export default UpdateQuantityProductService;
