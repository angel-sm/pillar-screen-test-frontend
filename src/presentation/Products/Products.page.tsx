import { Container, Title } from "@mantine/core";
import ProductList from "./components/ProductsList";
import { useProduct } from "../../core/Products/application/context/useProduct.context";
import ProductForm from "./components/ProductForm";
import { useWindowSize } from "../../hooks/useWindowSize";
import ProductsTable from "./components/ProductsTable";

const ProductsPage: React.FC = () => {
  const { products, productInitialValues } = useProduct();
  const { isMobile } = useWindowSize();

  return (
    <Container>
      <Title c="#fff" order={1} pt="xl">
        My Products
      </Title>
      <ProductForm product={productInitialValues} />
      {isMobile && <ProductList products={products} />}
      {!isMobile && <ProductsTable products={products} />}
    </Container>
  );
};

export default ProductsPage;
