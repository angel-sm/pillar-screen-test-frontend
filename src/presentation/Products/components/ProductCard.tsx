import { Text, Paper, Title, Grid, Pill, Flex } from "@mantine/core";
import { Product } from "../../../core/Products/domain/Product.entity";
import ProductCardActionsMenu from "./ProductCardActionsMenu";
import { IconBuildingWarehouse } from "@tabler/icons-react";
import currency from "currency.js";

export const ProductCard = ({
  name,
  price,
  category,
  description,
  quantity,
  id,
}: Product) => (
  <Paper shadow="lg" pr="xl" pl="md" py="md" w="100%">
    <Grid mb={4}>
      <Grid.Col span={8}>
        <Title order={3}>{name}</Title>
      </Grid.Col>
    </Grid>
    <Grid mt={3}>
      <Grid.Col span={8}>
        <Text>{currency(price).format()}</Text>
      </Grid.Col>
      <Grid.Col span={4}>
        <Flex>
          <IconBuildingWarehouse />
          <Text>{quantity}</Text>
        </Flex>
      </Grid.Col>
      <Grid.Col span={12}>
        <Text>{description}</Text>
      </Grid.Col>
      <Grid.Col span={12}>
        <Pill.Group>
          {category.map((category) => (
            <Pill key={category}>{category}</Pill>
          ))}
        </Pill.Group>
      </Grid.Col>
      <Grid.Col span={4} offset={8}>
        <ProductCardActionsMenu
          product={{
            name,
            category,
            description,
            id,
            price,
            quantity,
          }}
        />
      </Grid.Col>
    </Grid>
  </Paper>
);

export default ProductCard;
