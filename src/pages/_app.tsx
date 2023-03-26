import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";

import { LayoutNProgressBar } from "@/components/Layout/LayoutNProgressBar";

import theme from "../theme";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <LayoutNProgressBar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default appWithTranslation(App);
