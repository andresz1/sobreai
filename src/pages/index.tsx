import {
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Trans, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { RxDiscordLogo } from "react-icons/rx";

import { CategorySection } from "@/components/Category/CategorySection";
import { LayoutFooter } from "@/components/Layout/LayoutFooter";
import { LayoutHeader } from "@/components/Layout/LayoutHeader";
import { LayoutMain } from "@/components/Layout/LayoutMain";
import { RepositoryButton } from "@/components/Shared/RepositoryButton";
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
        <Stack spacing={8}>
          <Stack align="center" spacing={4}>
            <Stack textAlign="center" spacing={0} maxW="container.sm">
              <Heading as="h1" fontSize={{ base: "4xl", md: "6xl" }}>
                {t("hero.title")}
              </Heading>
              <Text as="p" fontSize={{ base: "xl", md: "2xl" }}>
                {t("hero.description")}
              </Text>
            </Stack>

            <Stack direction={{ base: "column", md: "row" }}>
              <NextLink href="/herramientas" passHref legacyBehavior>
                <Button as="a" size="lg">
                  {t("hero.search_button")}
                </Button>
              </NextLink>

              <Button
                variant="outline"
                size="lg"
                as="a"
                href="https://discord.gg/fMWVJVcW"
                rel="noopener noreferrer nofollow"
                target="_blank"
                leftIcon={<RxDiscordLogo />}
              >
                {t("hero.discord_button")}
              </Button>
            </Stack>
          </Stack>

          <Stack as="section" spacing={6}>
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }}>
              {t("tools_section.title")}
            </Heading>

            <SimpleGrid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
              gap={6}
            >
              {tools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </SimpleGrid>

            <Flex justify="center">
              <NextLink href="/herramientas" passHref legacyBehavior>
                <Button as="a" size="lg">
                  {t("tools_section.search_button")}
                </Button>
              </NextLink>
            </Flex>
          </Stack>

          <CategorySection categories={categories} />

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
              <Text>
                <Trans
                  t={t}
                  i18nKey="seo_section.community.description"
                  components={{
                    GitHubLink: (
                      <RepositoryButton variant="link" leftIcon={null} />
                    ),
                  }}
                />
              </Text>
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
