import { IconButton } from "@chakra-ui/button";
import { Flex, Stack, Text } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from "@chakra-ui/modal";
import { useTranslation } from "next-i18next";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";

import ShareInputGroup from "./ShareInputGroup";

export type ShareModalProps = Omit<ModalProps, "children"> & {
  text: string;
  url: string;
};

const ShareModal = ({ text, url, ...others }: ShareModalProps) => {
  const { t } = useTranslation("common");
  const size = useBreakpointValue({ base: "full", md: "sm" });

  const share = ({
    href,
    width = 800,
    height = 600,
  }: {
    href: string;
    width?: number;
    height?: number;
  }) => {
    const top = screen.height / 2 - width / 2;
    const left = screen.width / 2 - height / 2;

    window.open(
      href,
      "sharer",
      `top=${top},left=${left},toolbar=0,status=0,width=${width},height=${height}`
    );
  };

  const handleFacebookClick = () => {
    const href = `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    share({ href });
  };

  const handleTwitterClick = () => {
    const href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;

    share({ href });
  };

  const handleWhatsappClick = () => {
    const href = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      text
    )}%20${encodeURIComponent(url)}`;

    share({ href });
  };

  return (
    <Modal size={size} isCentered {...others}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("share.title")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingBottom={6}>
          <Stack spacing={4}>
            <Text>{t("share.social")}</Text>

            <Flex justifyContent="center">
              <Stack direction="row" spacing={4}>
                <IconButton
                  colorScheme="facebook"
                  aria-label={t("share.facebook")}
                  icon={<FaFacebook />}
                  onClick={handleFacebookClick}
                />
                <IconButton
                  colorScheme="twitter"
                  aria-label={t("share.twitter")}
                  icon={<FaTwitter />}
                  onClick={handleTwitterClick}
                />
                <IconButton
                  colorScheme="whatsapp"
                  aria-label={t("share.whatsapp")}
                  icon={<FaWhatsapp />}
                  onClick={handleWhatsappClick}
                />
              </Stack>
            </Flex>

            <Text>{t("share.copy")}</Text>
            <ShareInputGroup value={url} />
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShareModal;
