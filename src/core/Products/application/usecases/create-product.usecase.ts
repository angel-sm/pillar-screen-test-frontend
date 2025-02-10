import { Product } from "../../domain/Product.entity";
import { ProductsRepository } from "../../domain/Products.repository";

export class CreateProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(product: Product): Promise<Product> {
    return await this.productsRepository.createProduct(product);
  }
}
