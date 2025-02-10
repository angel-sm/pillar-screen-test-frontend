import { Product } from "../domain/Product.entity";
import { ProductsRepository } from "../domain/Products.repository";

interface Response {
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

export class ApiProductRepository extends ProductsRepository {
  private readonly baseUrl = import.meta.env.VITE_API_URL;

  async searchProduct(page = 0, limit = 2): Promise<Response> {
    console.log("🚀 ~ ApiProductRepository ~ baseUrl:", this.baseUrl)

    const response = await fetch(
      `${this.baseUrl}/products/search?page=${page}&limit=${limit}`
    );
    const data = (await response.json()) as Response;
    return data;
  }

  async createProduct(product: Product): Promise<Product> {
    const response = await fetch(`${this.baseUrl}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    const { data } = await response.json();
    return data;
  }

  async updateProduct(id: string, newAttr: Partial<Product>): Promise<Product> {
    delete newAttr.id;

    const response = await fetch(`${this.baseUrl}/products/product/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAttr),
    });
    const { data } = await response.json();
    return data;
  }

  async deleteProduct(id: string): Promise<void> {
    await fetch(`${this.baseUrl}/products/${id}`, {
      method: "Delete",
    });
  }
}
