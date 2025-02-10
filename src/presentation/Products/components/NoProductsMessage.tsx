import { Center, Text, Stack } from "@mantine/core";
import { IconBoxSeam } from "@tabler/icons-react";

export default function NoProductsMessage() {
  return (
    <Center
      style={{ height: "50vh", flexDirection: "column", textAlign: "center" }}
    >
      <Stack align="center">
        <IconBoxSeam size={64} stroke={1.5} color="gray" />
        <Text size="xl" c="gray">
          No products registered yet
        </Text>
        <Text size="sm" c="dimmed">
          Start adding new products to your inventory.
        </Text>
      </Stack>
    </Center>
  );
}
