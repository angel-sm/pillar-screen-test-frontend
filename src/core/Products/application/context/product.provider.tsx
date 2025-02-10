/* eslint-disable react-hooks/exhaustive-deps */
import { ReactNode, useEffect, useState, FC } from "react";
import { Product } from "../../domain/Product.entity";
import { ApiProductRepository } from "../../infrastructure/api-products.repository";
import { SearchProductsUseCase } from "../usecases/search-products.usecase";
import { ProductContext } from "./useProduct.context";
import { CreateProductUseCase } from "../usecases/create-product.usecase";
import { DeleteProductUseCase } from "../usecases/delete-product.usecase";
import { UpdateProductsUseCase } from "../usecases/update-product.usecase";

interface ProductProviderProps {
  children: ReactNode;
}

const repository = new ApiProductRepository();

export const ProductProvider: FC<ProductProviderProps> = ({ children }) => {
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    limit: 5,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const productInitialValues = {
    id: "",
    name: "",
    price: 0,
    quantity: 0,
    category: [],
    description: "",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const usecase = new SearchProductsUseCase(repository);
      try {
        window.scrollTo({ top: 0, behavior: "smooth" });
        const { data, pagination: currentPagination } = await usecase.execute(
          page,
          pagination.limit
        );
        setProducts(data);
        setPagination(currentPagination);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, refresh]);

  const createProduct = async (product: Product) => {
    const usecase = new CreateProductUseCase(repository);
    const newProduct = await usecase.execute(product);
    setProducts((old) => [newProduct, ...old]);
  };

  const updateProduct = async (id: string, newAttr: Partial<Product>) => {
    const usecase = new UpdateProductsUseCase(repository);
    const product = await usecase.execute(id, newAttr);
    const idx = products.findIndex(({ id }) => product.id === id);
    setProducts((oldState) => {
      oldState[idx] = product;
      return [...oldState];
    });
  };

  const deleteProduct = async (id: string) => {
    const usecase = new DeleteProductUseCase(repository);
    await usecase.execute(id);
    setRefresh(old => !old)    
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        createProduct,
        updateProduct,
        deleteProduct,
        productInitialValues,
        pagination,
        setPage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
