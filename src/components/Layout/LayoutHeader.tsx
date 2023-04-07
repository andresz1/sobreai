import { Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import { SearchButton } from "@/components/Search/SearchButton";
import { Logo } from "@/components/Shared/Logo";

import { LayoutContainer } from "./LayoutContainer";

export const LayoutHeader = () => {
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
        <Stack direction="row" alignItems="center" spacing={4}>
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
        </Stack>
      </LayoutContainer>
    </Stack>
  );
};
