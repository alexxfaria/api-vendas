import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IFindProduct } from '../domain/models/IFindProduct';
import { IProduct } from '../domain/models/IProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class ShowProductService {
  constructor(@inject('ProductsRepository') private productsRepository: IProductsRepository) {}

  public async execute({ id }: IFindProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);
    if (!product) {
      throw new AppError('Product not found.');
    }
    return product;
  }
}
export default ShowProductService;
