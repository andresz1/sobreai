import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
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

interface CategoryPageProps {
  categories: Array<Category>;
  category: Category;
  tools: Array<Tool>;
}

const CategoryPage = ({ categories, category, tools }: CategoryPageProps) => {
  const { t } = useTranslation(["category_feed"]);

  return (
    <>
      <NextSeo
        title={t("seo.title", { name: category.name })}
        description={t("seo.description", { name: category.name })}
      />
      <LayoutBody>
        <LayoutHeader />

        <LayoutMain>
          <Stack spacing={8}>
            <Stack spacing={4}>
              <Breadcrumb fontSize="xl">
                <BreadcrumbItem>
                  <Link href="/" passHref legacyBehavior>
                    <BreadcrumbLink>{t("breadcrumb.home")}</BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>

                <BreadcrumbItem>
                  <BreadcrumbLink>
                    {t("breadcrumb.current", { name: category.name })}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>

              <Stack spacing={0}>
                <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }}>
                  {category.name}
                </Heading>

                <Text fontSize="xl">{category.description}</Text>
              </Stack>
            </Stack>

            <SimpleGrid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(3, 1fr)",
              }}
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

export async function getStaticPaths() {
  const extractors = createExtractors();

  const categories = extractors.categories.fetchAll();

  return {
    paths: categories.map((category) => ({ params: { slug: category.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ locale, params }) {
  const { slug } = params;
  const extractors = createExtractors();

  const i18n = await serverSideTranslations(locale, [
    "common",
    "tool",
    "category_feed",
  ]);
  const categories = extractors.categories.fetchAll();
  const category = extractors.categories.fetchOne({ slug });
  const tools = extractors.tools.fetchAll({ category: slug });

  if (!category) {
    return { notFound: true };
  }

  return {
    props: {
      ...i18n,
      categories,
      category,
      tools,
    },
  };
}

export default CategoryPage;
