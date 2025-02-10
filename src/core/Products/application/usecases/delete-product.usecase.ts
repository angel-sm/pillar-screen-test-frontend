import { ProductsRepository } from "../../domain/Products.repository";

export class DeleteProductUseCase {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async execute(id: string) {
    await this.productsRepository.deleteProduct(id);
  }
}
