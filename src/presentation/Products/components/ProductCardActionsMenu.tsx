import { Button, Grid } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import ProductForm from "./ProductForm";
import { Product } from "../../../core/Products/domain/Product.entity";
import { useProduct } from "../../../core/Products/application/context/useProduct.context";

interface Props {
  product: Product;
}

function ProductCardActionsMenu({ product }: Props) {
  const { deleteProduct } = useProduct();

  const handleDelete = () => deleteProduct(product.id as string);

  return (
    <Grid gutter="xs">
      <Grid.Col span={6}>
        <ProductForm product={product} />
      </Grid.Col>
      <Grid.Col span={6}>
        <Button
          size="compact-md"
          variant="light"
          bg="rgba(250, 160, 160, .5)"
          onClick={handleDelete}
        >
          <IconTrash color="var(--mantine-color-red-text)" />
        </Button>
      </Grid.Col>
    </Grid>
  );
}

export default ProductCardActionsMenu;
