import { Link, Stack } from "@chakra-ui/react";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";

import { SearchButton } from "@/components/Search/SearchButton";
import { Logo } from "@/components/Shared/Logo";

import { CreateToolButton } from "../Tool/CreateToolButton";
import { LayoutContainer } from "./LayoutContainer";
import { LayoutDrawerButton } from "./LayoutDrawerButton";

export const LayoutHeader = () => {
  const { t } = useTranslation("common");

  return (
    <Stack
      as="header"
      position="fixed"
      top={0}
      w="full"
      justify="center"
      height={16}
      backdropFilter="auto"
      backdropBlur="12px"
      boxShadow="xs"
      boxSizing="content-box"
      zIndex="docked"
    >
      <LayoutContainer>
        <Stack direction="row" alignItems="center" spacing={3}>
          <NextLink href="/">
            <Logo color="black" w={8} h={8} />
          </NextLink>

          <NextLink href="/" passHref legacyBehavior>
            <Link
              display={{ base: "none", md: "inline" }}
              fontSize="xl"
              fontWeight="bold"
            >
              SobreIA
            </Link>
          </NextLink>

          <SearchButton />

          <CreateToolButton display={{ base: "none", md: "flex" }} size="md">
            {t("header.suggest_button")}
          </CreateToolButton>

          <LayoutDrawerButton variant="ghost" aria-label={t("drawer.button")} />
        </Stack>
      </LayoutContainer>
    </Stack>
  );
};
