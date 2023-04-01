import { Link, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";

import { Logo } from "@/components/Shared/Logo";

import { LayoutContainer } from "./LayoutContainer";

export const LayoutHeader = () => {
  return (
    <Stack
      position="fixed"
      top={0}
      w="full"
      justify="center"
      height={16}
      backdropFilter="auto"
      backdropBlur="12px"
      boxShadow="xs"
      zIndex="docked"
    >
      <LayoutContainer>
        <Stack direction="row" alignItems="center" spacing={2}>
          <NextLink href="/">
            <Logo color="black" w={8} h={8} />
          </NextLink>

          <NextLink href="/" passHref legacyBehavior>
            <Link fontSize="xl" fontWeight="bold">
              SobreIA
            </Link>
          </NextLink>
        </Stack>
      </LayoutContainer>
    </Stack>
  );
};
