import { LayoutContainer, LayoutContainerProps } from "./LayoutContainer";

export type LayoutMainProps = LayoutContainerProps;

export const LayoutMain = (props: LayoutMainProps) => (
  <LayoutContainer as="main" my={16} pt={8} flex="1 1 0" {...props} />
);
