import { Box, BoxProps } from "@chakra-ui/layout";

export type LayoutBodyProps = BoxProps;

export const LayoutBody = (props: LayoutBodyProps) => (
  <Box
    display="flex"
    flexDirection="column"
    width="full"
    minHeight={{ md: "100vh" }}
    {...props}
  />
);
