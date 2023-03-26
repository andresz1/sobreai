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

import { LayoutHeader } from "@/components/Layout/LayoutHeader";
import { LayoutMain } from "@/components/Layout/LayoutMain";
import { ToolCard } from "@/components/Tool/ToolCard";
import { createExtractors } from "@/extractors";

const Index = ({ tools }) => {
  const { t } = useTranslation(["home"]);

  return (
    <>
      <LayoutHeader />
      <LayoutMain>
        <Stack my={24} align="center" spacing={8}>
          <Stack textAlign="center" spacing={0}>
            <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }}>
              {t("h1")}
            </Heading>
            <Text as="p" fontSize={{ base: "2xl", md: "3xl" }}>
              {t("description")}
            </Text>
          </Stack>

          <ButtonGroup>
            <Button>1</Button>
            <Button>2</Button>
          </ButtonGroup>
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
    </>
  );
};

export async function getStaticProps({ locale }) {
  const i18n = await serverSideTranslations(locale, ["common", "home"]);
  const extractors = createExtractors();

  const tools = await extractors.tools.fetchAll();

  return {
    props: {
      ...i18n,
      tools,
      // Will be passed to the page component as props
    },
  };
}

export default Index;
