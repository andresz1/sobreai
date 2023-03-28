import { Button, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
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
import { createExtractors } from "@/extractors";
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
      <NextSeo title={t("seo.title")} description={t("seo.title")} />

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
            <CreateToolButton size="lg">Agregar herramienta</CreateToolButton>

            <RepositoryButton size="lg" colorScheme="gray" variant="outline">
              Star on GitHub
            </RepositoryButton>
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

            <Stack direction="row" spacing={4}>
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  passHref
                  legacyBehavior
                >
                  <Button as="a">{category.name}</Button>
                </Link>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </LayoutMain>

      <LayoutFooter />
    </>
  );
};

export async function getStaticProps({ locale }) {
  const i18n = await serverSideTranslations(locale, ["common", "index"]);
  const extractors = createExtractors();

  const [categories, tools] = await Promise.all([
    extractors.categories.fetchAll(),
    extractors.tools.fetchAll(),
  ]);

  return {
    props: {
      ...i18n,
      categories,
      tools,
    },
  };
}

export default IndexPage;
