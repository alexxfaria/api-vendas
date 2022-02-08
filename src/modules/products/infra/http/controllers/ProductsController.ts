import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductService from '../../../services/CreateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import ListProductService from '../../../services/ListProductService';
import ShowProductService from '../../../services/ShowProductService';
import UpdateProductService from '../../../services/UpdateProductService';
import UpdateQuantityProductService from '../../../services/UpdateQuantityProductService';

class ProductController {
  public async index(req: Request, res: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);

    const products = await listProducts.execute();

    return res.json(products);
  }
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showProduct = container.resolve(ShowProductService);

    const product = await showProduct.execute({ id });

    return res.json(product);
  }
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });
    return res.json(product);
  }
  public async update(req: Request, res: Response): Promise<Response> {
    const { name, price, quantity } = req.body;
    const { id } = req.params;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });
    return res.json(product);
  }
  public async patchQuantity(req: Request, res: Response): Promise<Response> {
    const { quantity } = req.body;
    const { id } = req.params;

    const updateQuantityProduct = container.resolve(UpdateQuantityProductService);

    const product = await updateQuantityProduct.execute({
      id,
      quantity,
    });
    return res.json(product);
  }
  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({ id });

    return res.json([]);
  }
}
export default ProductController;
