import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/react";
import { useAsyncCallback } from "react-async-hook";

import { useServices } from "@/components/Services/useServices";

import { ToolForm, ToolFormValues } from "./ToolForm";

export interface CreateToolModalProps extends Omit<ModalProps, "children"> {}

export const CreateToolModal = ({
  onClose,
  ...others
}: CreateToolModalProps) => {
  const services = useServices();
  const { execute: createTool, loading: isLoading } = useAsyncCallback(
    ({ url }: { url: string }) => {
      return services.tools.create({ url });
    },
    {
      onSuccess: () => {
        onClose();
      },
    }
  );
  const formId = "create-tool-form";

  const handleSubmit = ({ url }: ToolFormValues) => {
    createTool({ url });
  };

  return (
    <Modal onClose={onClose} isCentered {...others}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Agregar herramienta</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ToolForm id={formId} onSubmit={handleSubmit} />
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Button variant="ghost" onClick={onClose}>
              Cerrar
            </Button>
            <Button type="submit" form={formId} isLoading={isLoading}>
              Enviar
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
