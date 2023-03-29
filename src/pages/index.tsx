import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

import { LayoutFooter } from "@/components/Layout/LayoutFooter";
import { LayoutHeader } from "@/components/Layout/LayoutHeader";
import { LayoutMain } from "@/components/Layout/LayoutMain";
import { RepositoryButton } from "@/components/Shared/RepositoryButton";
import { CreateToolButton } from "@/components/Tool/CreateToolButton";
import { ToolCard } from "@/components/Tool/ToolCard";
import { createExtractors } from "@/server/extractors";
import { Category } from "@/types/Category";
import { Tool } from "@/types/Tool";

interface IndexPage {
  categories: Array<Category>;
  tools: Array<Tool>;
}

const IndexPage = ({ categories, tools }: IndexPage) => {
  const { t } = useTranslation(["index"]);

  return (
    <>
      <NextSeo title={t("seo.title")} description={t("seo.description")} />

      <LayoutHeader />

      <LayoutMain>
        <Stack py={{ base: 8, md: 16 }} align="center" spacing={8}>
          <Stack textAlign="center" spacing={0} maxW="container.sm">
            <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }}>
              {t("hero.title")}
            </Heading>
            <Text as="p" fontSize={{ base: "xl", md: "2xl" }}>
              {t("hero.description")}
            </Text>
          </Stack>

          <Stack spacing={4} direction={{ base: "column", md: "row" }}>
            <CreateToolButton size="lg">
              {t("hero.suggest_button")}
            </CreateToolButton>
          </Stack>
        </Stack>

        <Stack spacing={{ base: 8, md: 16 }}>
          <Stack as="section" spacing={6}>
            <Heading as="h2">{t("tools_section.title")}</Heading>

            <SimpleGrid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              gap={6}
            >
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </SimpleGrid>
          </Stack>

          <Stack as="section" spacing={6}>
            <Heading as="h2">{t("categories_section.title")}</Heading>

            <Box display="inline-block">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/herramientas/${category.slug}`}
                  passHref
                  legacyBehavior
                >
                  <Button as="a" mr={4} mb={4}>
                    {category.name}
                  </Button>
                </Link>
              ))}
            </Box>
          </Stack>

          <SimpleGrid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            gap={6}
          >
            <Stack>
              <Heading as="h3" fontSize="lg">
                {t("seo_section.about.title")}
              </Heading>
              <Text>{t("seo_section.about.description")}</Text>
            </Stack>

            <Stack>
              <Heading as="h3" fontSize="lg">
                {t("seo_section.revolution.title")}
              </Heading>
              <Text>{t("seo_section.revolution.description")}</Text>
            </Stack>

            <Stack>
              <Heading as="h3" fontSize="lg">
                {t("seo_section.benefits.title")}
              </Heading>
              <Text>{t("seo_section.benefits.description")}</Text>
            </Stack>

            <Stack>
              <Heading as="h3" fontSize="lg">
                {t("seo_section.community.title")}
              </Heading>
              <Text>{t("seo_section.community.description")}</Text>
            </Stack>
          </SimpleGrid>
        </Stack>
      </LayoutMain>

      <LayoutFooter />
    </>
  );
};

export async function getStaticProps({ locale }) {
  const extractors = createExtractors();

  const i18n = await serverSideTranslations(locale, [
    "common",
    "tool",
    "index",
  ]);
  const categories = extractors.categories.fetchAll();
  const tools = extractors.tools.fetchAll({ limit: 3 });

  return {
    props: {
      ...i18n,
      categories,
      tools,
    },
  };
}

export default IndexPage;
