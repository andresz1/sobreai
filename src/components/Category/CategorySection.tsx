import { Box, Button, Heading, Stack, StackProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";

import { Category } from "@/types/Category";

export interface CategorySectionProps extends StackProps {
  categories: Array<Category>;
}

export const CategorySection = ({
  categories,
  children,
  ...others
}: CategorySectionProps) => {
  const { t } = useTranslation("common");

  return (
    <Stack as="section" spacing={6} {...others}>
      <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }}>
        {t("categories_section.title")}
      </Heading>

      <Box display="inline-block">
        {categories.map((category) => (
          <NextLink
            key={category.slug}
            href={`/herramientas/${category.slug}`}
            passHref
            legacyBehavior
          >
            <Button size="md" as="a" mr={2} mb={2}>
              {category.name}
            </Button>
          </NextLink>
        ))}
      </Box>

      {children}
    </Stack>
  );
};
