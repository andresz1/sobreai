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
  useToast,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useAsyncCallback } from "react-async-hook";

import { useServices } from "@/components/Services/useServices";

import { ToolForm, ToolFormValues } from "./ToolForm";

export interface CreateToolModalProps extends Omit<ModalProps, "children"> {}

export const CreateToolModal = ({
  onClose,
  ...others
}: CreateToolModalProps) => {
  const { t } = useTranslation("tool");
  const toast = useToast();
  const services = useServices();
  const { execute: createTool, loading: isLoading } = useAsyncCallback(
    ({ url }: { url: string }) => {
      return services.tools.create({ url });
    },
    {
      onSuccess: () => {
        toast({
          title: t("create_modal.success.title"),
          description: t("create_modal.success.description"),
          status: "success",
        });
        onClose();
      },
      onError: () => {
        toast({
          title: t("create_modal.error.title"),
          description: t("create_modal.error.description"),
          status: "error",
        });
      },
    }
  );
  const formId = "create-tool-form";

  const handleSubmit = ({ url }: ToolFormValues) => {
    createTool({ url });
  };

  return (
    <Modal
      onClose={onClose}
      size={{ base: "full", md: "lg" }}
      isCentered
      {...others}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>{t("create_modal.title")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ToolForm id={formId} onSubmit={handleSubmit} />
        </ModalBody>

        <ModalFooter>
          <ButtonGroup>
            <Button variant="ghost" onClick={onClose}>
              {t("create_modal.close_button")}
            </Button>
            <Button type="submit" form={formId} isLoading={isLoading}>
              {t("create_modal.send_button")}
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
