import { Box, BoxProps } from "@chakra-ui/layout";

export type LayoutContainerProps = BoxProps;

export const LayoutContainer = (props: LayoutContainerProps) => (
  <Box
    w="full"
    ml="auto"
    mr="auto"
    maxW="container.xl"
    px={4}
    boxSizing="border-box"
    {...props}
  />
);
