import { Product } from "../../domain/Product.entity";
import { ProductsRepository } from "../../domain/Products.repository";

export class UpdateProductsUseCase {
  constructor(private repository: ProductsRepository) {}

  async execute(id: string, newAttr: Partial<Product>) {
    return this.repository.updateProduct(id, newAttr);
  }
}
