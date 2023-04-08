import { Icon } from "@chakra-ui/icons";
import { Stack, StackProps, Text } from "@chakra-ui/layout";
import { ReactElement } from "react";

export interface LayoutDrawerItemProps extends StackProps {
  icon?: ReactElement;
}

export const LayoutDrawerItem = ({ icon, children, ...others }) => {
  return (
    <Stack
      direction="row"
      p={4}
      align="center"
      cursor="pointer"
      outline="none"
      _hover={{
        bg: "gray.100",
      }}
      _focus={{ boxShadow: "outline" }}
      spacing={2}
      {...others}
    >
      <Icon fontSize="xl">{icon}</Icon>

      <Text fontSize="lg" flex={1}>
        {children}
      </Text>
    </Stack>
  );
};
