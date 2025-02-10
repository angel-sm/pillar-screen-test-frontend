/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDisclosure } from "@mantine/hooks";
import {
  Modal,
  Button,
  Group,
  TextInput,
  MultiSelect,
  NumberInput,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Product } from "../../../core/Products/domain/Product.entity";
import { useEffect } from "react";
import { IconClipboardPlus, IconEdit } from "@tabler/icons-react";
import { useProduct } from "../../../core/Products/application/context/useProduct.context";

interface Props {
  product: Product;
}

function ProductForm({ product }: Props) {
  const { createProduct, updateProduct } = useProduct();

  const isUpdating = Boolean(product.id);
  const title = isUpdating ? "Update producto" : "New Product";

  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<Product>({
    mode: "uncontrolled",
    initialValues: product as Product,
    validate: {
      name: (value) => (value.trim().length > 0 ? null : "Name is required"),
      price: (value) => (value > 0 ? null : "Price must be greater than zero"),
      quantity: (value) => (value >= 0 ? null : "Quantity cannot be negative"),
      category: (value) =>
        value.length > 0 ? null : "Select at least one category",
      description: (value) =>
        value.trim().length > 10
          ? null
          : "Description must be at least 10 characters",
    },
  });

  useEffect(() => {
    if (isUpdating) {
      form.setValues(product);
    }
  }, []);

  const handleSubmit = (values: Product) => {
    if (isUpdating) {
      updateProduct(product.id as string, values);
    } else {
      delete values.id;
      createProduct(values);
    }

    close();
    form.reset();
  };

  const FormContainer = (
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
      <TextInput
        withAsterisk
        label="Product Name"
        placeholder="Enter product name"
        key={form.key("name")}
        {...form.getInputProps("name")}
        mt="sm"
      />

      <NumberInput
        withAsterisk
        label="Price"
        placeholder="Enter price"
        key={form.key("price")}
        {...form.getInputProps("price")}
        mt="sm"
      />

      <NumberInput
        withAsterisk
        label="Quantity"
        placeholder="Enter quantity"
        key={form.key("quantity")}
        {...form.getInputProps("quantity")}
        mt="sm"
      />

      <Textarea
        withAsterisk
        label="Description"
        placeholder="Enter product description"
        key={form.key("description")}
        {...form.getInputProps("description")}
        mt="sm"
      />

      <MultiSelect
        withAsterisk
        label="Category"
        placeholder="Select categories"
        data={["Electronics", "Clothing", "Books", "Furniture", "Groceries"]}
        key={form.key("category")}
        {...form.getInputProps("category")}
        hidePickedOptions
        maxDropdownHeight={100}
        clearable
        mt="sm"
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );

  return (
    <>
      <Modal opened={opened} onClose={close} title={title}>
        {FormContainer}
      </Modal>

      {isUpdating && (
        <Button size="compact-md" variant="light" onClick={open}>
          <IconEdit />
        </Button>
      )}

      {!isUpdating && (
        <Button
          onClick={open}
          leftSection={<IconClipboardPlus size={18}  />}
          variant="filled"
          size="compact-sm"
          my="lg"
        >
          New Product
        </Button>
      )}
    </>
  );
}

export default ProductForm;
