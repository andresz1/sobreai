import { Stack } from "@chakra-ui/react";

import { LayoutContainer } from "./LayoutContainer";

export const LayoutHeader = () => {
  return (
    <Stack
      position="fixed"
      top={0}
      w="full"
      justify="center"
      height={12}
      backdropFilter="auto"
      backdropBlur="12px"
      boxShadow="xs"
      zIndex="docked"
    >
      <LayoutContainer>
        <div>13432432432342</div>
      </LayoutContainer>
    </Stack>
  );
};
