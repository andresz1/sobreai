import {
  AspectRatio,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Grid,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { LayoutBody } from "@/components/Layout/LayoutBody";
import { LayoutFooter } from "@/components/Layout/LayoutFooter";
import { LayoutHeader } from "@/components/Layout/LayoutHeader";
import { LayoutMain } from "@/components/Layout/LayoutMain";
import { ShareIconButton } from "@/components/Share/ShareIconButton";
import { createExtractors } from "@/extractors";

const ToolDetailPage = ({ tool }) => {
  const { t } = useTranslation(["common", "detail"]);

  return (
    <LayoutBody>
      <LayoutHeader />

      <LayoutMain>
        <SimpleGrid
          py={8}
          gap={10}
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
        >
          <Stack spacing={4}>
            <Breadcrumb>
              <BreadcrumbItem>
                <Link href="/" passHref legacyBehavior>
                  <BreadcrumbLink>Home</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <Link href="/" passHref legacyBehavior>
                  <BreadcrumbLink href="#">Category</BreadcrumbLink>
                </Link>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
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
              <Image src={tool.thumbnail} alt="" objectFit="contain" fill />
            </AspectRatio>
          </Stack>

          <Stack>
            <Heading as="h2">Description</Heading>

            <Text>{tool.description}</Text>

            <Stack direction="row">
              <ShareIconButton
                title={t("share.title")}
                text={t("share.text")}
                aria-label=""
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </LayoutMain>

      <LayoutFooter />
    </LayoutBody>
  );
};

export async function getStaticPaths({ locale }) {
  const extractors = createExtractors();

  const tools = await extractors.tools.fetchAll();

  return {
    paths: tools.map((project) => ({ params: { slug: project.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ locale, params }) {
  const { slug } = params;
  const extractors = createExtractors();

  const [i18n, tool] = await Promise.all([
    serverSideTranslations(locale, ["common", "detail"]),
    extractors.tools.fetchOne({ slug }),
  ]);

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

export default ToolDetailPage;
