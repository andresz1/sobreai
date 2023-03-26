import {
  Button,
  ButtonGroup,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { LayoutFooter } from "@/components/Layout/LayoutFooter";
import { LayoutHeader } from "@/components/Layout/LayoutHeader";
import { LayoutMain } from "@/components/Layout/LayoutMain";
import { RepositoryButton } from "@/components/Shared/RepositoryButton";
import { CreateToolButton } from "@/components/Tool/CreateToolButton";
import { ToolCard } from "@/components/Tool/ToolCard";
import { createExtractors } from "@/extractors";

const IndexPage = ({ tools }) => {
  const { t } = useTranslation(["index"]);

  return (
    <>
      <LayoutHeader />
      <LayoutMain>
        <Stack py={{ base: 20, md: 36 }} align="center" spacing={8}>
          <Stack textAlign="center" spacing={0}>
            <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }}>
              {t("h1")}
            </Heading>
            <Text as="p" fontSize={{ base: "2xl", md: "3xl" }}>
              {t("description")}
            </Text>
          </Stack>

          <Stack spacing={4} direction={{ base: "column", md: "row" }}>
            <CreateToolButton size="lg">Agregar herramienta</CreateToolButton>

            <RepositoryButton size="lg" colorScheme="gray" variant="outline">
              Star on GitHub
            </RepositoryButton>
          </Stack>
        </Stack>

        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
          gap={6}
        >
          {tools.map((tool) => (
            <GridItem key={tool.slug}>
              <ToolCard tool={tool} />
            </GridItem>
          ))}
        </Grid>
      </LayoutMain>

      <LayoutFooter />
    </>
  );
};

export async function getStaticProps({ locale }) {
  const i18n = await serverSideTranslations(locale, ["common", "index"]);
  const extractors = createExtractors();

  const tools = await extractors.tools.fetchAll();

  return {
    props: {
      ...i18n,
      tools,
    },
  };
}

export default IndexPage;
