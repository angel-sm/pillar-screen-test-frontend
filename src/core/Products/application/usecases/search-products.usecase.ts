import { ProductsRepository } from "../../domain/Products.repository";

export class SearchProductsUseCase {
  constructor(private repository: ProductsRepository) {}

  async execute(page: number, limit: number) {
    return await this.repository.searchProduct(page, limit);
  }
}
