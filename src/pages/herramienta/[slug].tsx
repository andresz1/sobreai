import {
  AspectRatio,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  ButtonGroup,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";

import { LayoutBody } from "@/components/Layout/LayoutBody";
import { LayoutFooter } from "@/components/Layout/LayoutFooter";
import { LayoutHeader } from "@/components/Layout/LayoutHeader";
import { LayoutMain } from "@/components/Layout/LayoutMain";
import { ShareIconButton } from "@/components/Share/ShareIconButton";
import { createExtractors } from "@/server/extractors";
import { Tool } from "@/types/Tool";

interface ToolsDetailPage {
  tool: Tool;
}

const ToolsDetailPage = ({ tool }) => {
  const { t } = useTranslation("tool_detail");

  const { category } = tool;

  return (
    <>
      <NextSeo
        title={t("seo.title", { name: tool.name })}
        description={t("seo.description", { name: tool.name })}
      />

      <LayoutBody>
        <LayoutHeader />

        <LayoutMain>
          <SimpleGrid
            py={8}
            gap={10}
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          >
            <Stack spacing={4}>
              <Breadcrumb fontSize="xl">
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

              <Heading as="h1">{tool.name}</Heading>

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
              <Heading as="h2">{t("description_section.title")}</Heading>

              <Text fontSize="xl">{tool.description}</Text>

              <ButtonGroup size="lg" justifyContent="center">
                <ShareIconButton
                  title={t("share.title")}
                  text={t("share.text")}
                  aria-label={t("description_section.share_button")}
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

  return {
    props: {
      ...i18n,
      tool,
    },
  };
}

export default ToolsDetailPage;
