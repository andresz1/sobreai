import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import theme from "../theme";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default appWithTranslation(App);
