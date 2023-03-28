import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "next-seo";

import { LayoutNProgressBar } from "@/components/Layout/LayoutNProgressBar";

import theme from "../theme";

function App({ Component, pageProps }: AppProps) {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  const siteName = "Sobre IA";
  const router = useRouter();
  const canonical = url.concat(router.asPath);

  return (
    <ChakraProvider theme={theme}>
      <LayoutNProgressBar />
      <DefaultSeo
        openGraph={{
          type: "website",
          locale: "es",
          url: canonical,
          siteName,
        }}
        canonical={canonical}
        titleTemplate={`%s | ${siteName}`}
        defaultTitle={siteName}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default appWithTranslation(App);
