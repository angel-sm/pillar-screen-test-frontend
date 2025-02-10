import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import ProductsPage from "./presentation/Products/Products.page";
import { theme } from "./theme";
import { ProductProvider } from "./core/Products/application/context/product.provider";

function App() {
  return (
    <MantineProvider theme={theme}>
      <ProductProvider>
        <ProductsPage />
      </ProductProvider>
    </MantineProvider>
  );
}

export default App;
