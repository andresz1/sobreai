import { Container, ContainerProps } from "@chakra-ui/layout";

export type LayoutContainerProps = ContainerProps;

export const LayoutContainer = (props: LayoutContainerProps) => (
  <Container maxW="container.xl" {...props} />
);
