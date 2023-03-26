import { Button, ButtonProps, useDisclosure } from "@chakra-ui/react";

import { CreateToolModal } from "./CreateToolModal";

export interface CreateToolButtonProps extends ButtonProps {}

export const CreateToolButton = (props: CreateToolButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} {...props} />

      <CreateToolModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};
