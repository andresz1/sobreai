import {
  AspectRatio,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Heading,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { FiActivity, FiDollarSign } from "react-icons/fi";

import { CategorySection } from "@/components/Category/CategorySection";
import { LayoutBody } from "@/components/Layout/LayoutBody";
import { LayoutFooter } from "@/components/Layout/LayoutFooter";
import { LayoutHeader } from "@/components/Layout/LayoutHeader";
import { LayoutMain } from "@/components/Layout/LayoutMain";
import { ShareIconButton } from "@/components/Share/ShareIconButton";
import { ToolCard } from "@/components/Tool/ToolCard";
import { createExtractors } from "@/server/extractors";
import { Category } from "@/types/Category";
import { Tool } from "@/types/Tool";

interface ToolsDetailPage {
  categories: Array<Category>;
  tool: Tool;
  related: Array<Tool>;
}

const ToolsDetailPage = ({ categories, tool, related }) => {
  const { t } = useTranslation("tool_detail");

  const { category } = tool;

  return (
    <>
      <NextSeo
        title={t("seo.title", { name: tool.name })}
        description={t("seo.description", { description: tool.description })}
      />

      <LayoutBody>
        <LayoutHeader />

        <LayoutMain>
          <Stack spacing={8}>
            <SimpleGrid
              gap={10}
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            >
              <Stack spacing={4}>
                <Breadcrumb sx={{ ol: { display: "inline" } }} fontSize="xl">
                  <BreadcrumbItem>
                    <Link href="/" passHref legacyBehavior>
                      <BreadcrumbLink>{t("breadcrumb.home")}</BreadcrumbLink>
                    </Link>
                  </BreadcrumbItem>

                  <BreadcrumbItem>
                    <Link
                      href={`/herramientas/${category.slug}`}
                      passHref
                      legacyBehavior
                    >
                      <BreadcrumbLink>{category.name}</BreadcrumbLink>
                    </Link>
                  </BreadcrumbItem>

                  <BreadcrumbItem isCurrentPage>
                    <BreadcrumbLink href={`/herramienta/${tool.slug}`}>
                      {tool.name}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </Breadcrumb>

                <Heading as="h1" fontSize={{ base: "3xl", md: "4xl" }}>
                  {tool.name}
                </Heading>

                <AspectRatio
                  ratio={128 / 80}
                  bgColor="blackAlpha.100"
                  borderRadius="lg"
                  boxShadow="lg"
                  overflow="hidden"
                >
                  <Image
                    src={tool.thumbnail}
                    alt={t("image", { name: tool.name })}
                    objectFit="contain"
                    fill
                    priority
                  />
                </AspectRatio>
              </Stack>

              <Stack as="section" spacing={4}>
                <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }}>
                  {t("description_section.title")}
                </Heading>

                <Text fontSize="xl">{tool.description}</Text>

                <List spacing={3} fontSize="xl">
                  <ListItem>
                    <ListIcon as={FiActivity} fontSize="2xl" />
                    {tool.waiting
                      ? t("description_section.status_waiting")
                      : t("description_section.status_ready")}
                  </ListItem>

                  {tool.pricing && (
                    <ListItem>
                      <ListIcon as={FiDollarSign} fontSize="2xl" />

                      {t("description_section.pricing", {
                        pricing: tool.pricing.name,
                      })}
                    </ListItem>
                  )}
                </List>

                <ButtonGroup size="lg" justifyContent="center">
                  <ShareIconButton
                    title={t("share.title", { name: tool.name })}
                    text={t("share.text", { name: tool.name })}
                    aria-label={t("share.button", { name: tool.name })}
                  />

                  <Button
                    as="a"
                    href={tool.url}
                    target="_blank"
                    rel="noopener nofollow"
                  >
                    {t("description_section.link")}
                  </Button>
                </ButtonGroup>
              </Stack>
            </SimpleGrid>

            {related.length > 0 && (
              <Stack as="section" spacing={8}>
                <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }}>
                  {t("related_section.title")}
                </Heading>

                <SimpleGrid
                  templateColumns={{
                    base: "repeat(1, 1fr)",
                    md: "repeat(3, 1fr)",
                  }}
                  gap={6}
                >
                  {related.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </SimpleGrid>
              </Stack>
            )}

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

  const tools = extractors.tools.fetchAll();

  return {
    paths: tools.map((tool) => ({ params: { slug: tool.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ locale, params }) {
  const { slug } = params;
  const extractors = createExtractors();

  const i18n = await serverSideTranslations(locale, [
    "common",
    "tool",
    "tool_detail",
  ]);
  const tool = extractors.tools.fetchOne({ slug });

  if (!tool) {
    return { notFound: true };
  }

  const categories = extractors.categories.fetchAll();
  const related = extractors.tools.fetchRelated({ slug, limit: 3 });

  return {
    props: {
      ...i18n,
      categories,
      tool,
      related,
    },
  };
}

export default ToolsDetailPage;
