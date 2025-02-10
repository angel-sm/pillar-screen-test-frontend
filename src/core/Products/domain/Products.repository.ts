import { Product } from "./Product.entity";

export abstract class ProductsRepository {
  abstract searchProduct(page: number, limit: number): Promise<{
    data: Product[],
    pagination: {
      page: number,
      limit: number,
      total: number
    }
  }>;
  abstract createProduct(product: Product): Promise<Product>;
  abstract updateProduct(id: string, newAttr: Partial<Product>): Promise<Product>;
  abstract deleteProduct(id: string): Promise<void>;
}
