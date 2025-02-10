/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useContext } from "react";
import { Product } from "../../domain/Product.entity";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  productInitialValues: Product;
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  createProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, newAttr: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  setPage: (newPage: number) => void
}

const initialState: ProductContextType = {
  products: [],
  loading: false,
  createProduct: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  updateProduct: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  deleteProduct: function (): Promise<void> {
    throw new Error("Function not implemented.");
  },
  productInitialValues: {
    id: "",
    name: "",
    price: 0,
    quantity: 0,
    category: [],
    description: "",
  },
  pagination: {
    page: 0,
    limit: 0,
    total: 0
  },
  setPage: function (): void {
    throw new Error("Function not implemented.");
  }
};

export const ProductContext = createContext<ProductContextType>(initialState);

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
