import { Flex, Skeleton } from "@mantine/core";
import { Product } from "../../../core/Products/domain/Product.entity";
import ProductCard from "./ProductCard";
import { useProduct } from "../../../core/Products/application/context/useProduct.context";
import Pagination from "../../components/Pagination";
import NoProductsMessage from "./NoProductsMessage";

interface Props {
  products: Product[];
}

const ProductList = ({ products }: Props) => {
  const {
    pagination: { limit, total },
    setPage,
    loading,
  } = useProduct();

  if (!products.length) {
    return <NoProductsMessage />
  }

  const LoaderContainer = (
    <>
      {loading &&
        Array(limit)
          .fill(() => Math.random())
          .map(() => <Skeleton height={280} />)}
    </>
  );

  const ProductContainer = (
    <>{!loading && products.map((product) => <ProductCard {...product} />)}</>
  );

  return (
    <>
      <Flex
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {LoaderContainer}
        {ProductContainer}
      </Flex>
      <Pagination limit={limit} setPage={setPage} total={total} /> 
    </>
  );
};

export default ProductList;
