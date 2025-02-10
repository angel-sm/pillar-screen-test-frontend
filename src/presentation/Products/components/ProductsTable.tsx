import { Skeleton, Table } from "@mantine/core";
import { Product } from "../../../core/Products/domain/Product.entity";
import ProductCardActionsMenu from "./ProductCardActionsMenu";
import currency from "currency.js";
import { useProduct } from "../../../core/Products/application/context/useProduct.context";
import Pagination from "../../components/Pagination";
import NoProductsMessage from "./NoProductsMessage";

interface Props {
  products: Product[];
}

function ProductsTable({ products }: Props) {
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
          .map(() => <Skeleton height={50} mt={6} />)}
    </>
  );

  const rows = products.map((product) => (
    <Table.Tr key={product.id}>
      <Table.Td>{product.name}</Table.Td>
      <Table.Td>{currency(product.price).format()}</Table.Td>
      <Table.Td>{product.quantity}</Table.Td>
      <Table.Td>{product.description}</Table.Td>
      <Table.Td>{product.category.join(", ")}</Table.Td>
      <Table.Td>
        <ProductCardActionsMenu product={product} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      {LoaderContainer}
      {!loading && (
        <>
          <Table
            stickyHeader
            stickyHeaderOffset={0}
            c="#fff"
            verticalSpacing="md"
            layout="fixed"
          >
            <Table.Thead>
              <Table.Tr bg="rgba(0,0,0,.9)">
                <Table.Th>Product</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Quantity</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Categories</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
          <Pagination limit={limit} setPage={setPage} total={total} />
        </>
      )}
    </>
  );
}

export default ProductsTable;
