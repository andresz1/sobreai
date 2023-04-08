import { IconButton, IconButtonProps, useDisclosure } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";

import { LayoutDrawer } from "./LayoutDrawer";

export interface LayoutDrawerButton extends IconButtonProps {}

export const LayoutDrawerButton = (props: LayoutDrawerButton) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton icon={<FiMenu />} onClick={onOpen} {...props} />

      <LayoutDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};
