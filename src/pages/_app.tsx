import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { appWithTranslation } from "next-i18next";
import { DefaultSeo } from "next-seo";
import { GoogleAnalytics } from "nextjs-google-analytics";

import { LayoutNProgressBar } from "@/components/Layout/LayoutNProgressBar";

import theme from "../theme";

function App({ Component, pageProps }: AppProps) {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  const siteName = "SobreIA";
  const router = useRouter();
  const canonical = url.concat(router.asPath);

  return (
    <>
      <GoogleAnalytics trackPageViews />
      <ChakraProvider theme={theme}>
        <LayoutNProgressBar />
        <DefaultSeo
          openGraph={{
            type: "website",
            locale: "es",
            url: canonical,
            images: [{ url: "/og-logo.png" }],
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
          themeColor="#ffffff"
          additionalLinkTags={[
            {
              rel: "apple-touch-icon",
              sizes: "180x180",
              href: "/apple-touch-icon.png",
            },
            {
              rel: "icon",
              type: "image/png",
              sizes: "16x16",
              href: "/favicon-16x16.png",
            },
            {
              rel: "icon",
              type: "image/png",
              sizes: "32x32",
              href: "/favicon-32x32.png",
            },
          ]}
        />
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default appWithTranslation(App);
