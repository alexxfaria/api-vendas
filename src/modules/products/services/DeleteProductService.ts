import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IFindProduct } from '../domain/models/IFindProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class DeleteProductService {
  constructor(@inject('ProductsRepository') private productsRepository: IProductsRepository) {}
  public async execute({ id }: IFindProduct): Promise<void> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found.');
    }
    await this.productsRepository.remove(product);
  }
}
export default DeleteProductService;
