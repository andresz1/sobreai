import { Heading } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { LayoutHeader } from "@/components/Layout/LayoutHeader";
import { LayoutMain } from "@/components/Layout/LayoutMain";
import { createExtractors } from "@/extractors";

const ToolDetailPage = ({ tool }) => {
  const { t } = useTranslation(["common", "detail"]);

  console.log(tool);

  return (
    <>
      <LayoutHeader />
      <LayoutMain>
        <Heading>{tool.name}</Heading>
      </LayoutMain>
    </>
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
