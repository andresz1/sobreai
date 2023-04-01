import { Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

import { CategorySection } from "@/components/Category/CategorySection";
import { LayoutBody } from "@/components/Layout/LayoutBody";
import { LayoutFooter } from "@/components/Layout/LayoutFooter";
import { LayoutHeader } from "@/components/Layout/LayoutHeader";
import { LayoutMain } from "@/components/Layout/LayoutMain";
import { ToolCard } from "@/components/Tool/ToolCard";
import { createExtractors } from "@/server/extractors";
import { Category } from "@/types/Category";
import { Tool } from "@/types/Tool";

interface FeedPageProps {
  categories: Array<Category>;
  tools: Array<Tool>;
}

const FeedPage = ({ categories, tools }: FeedPageProps) => {
  const { t } = useTranslation(["feed"]);

  return (
    <>
      <NextSeo title={t("seo.title")} description={t("seo.description")} />

      <LayoutBody>
        <LayoutHeader />

        <LayoutMain>
          <Stack spacing={8}>
            <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }}>
              {t("title")}
            </Heading>

            <SimpleGrid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              gap={6}
            >
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </SimpleGrid>

            <CategorySection categories={categories} />
          </Stack>
        </LayoutMain>

        <LayoutFooter />
      </LayoutBody>
    </>
  );
};

export async function getStaticProps({ locale }) {
  const extractors = createExtractors();

  const i18n = await serverSideTranslations(locale, ["common", "tool", "feed"]);
  const tools = extractors.tools.fetchAll();
  const categories = extractors.categories.fetchAll();

  return {
    props: {
      ...i18n,
      categories,
      tools,
    },
  };
}

export default FeedPage;
