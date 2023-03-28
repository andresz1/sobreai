import { Stack, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { FaDiscord, FaFacebook, FaTwitter } from "react-icons/fa";

import { LayoutContainer } from "./LayoutContainer";

export const LayoutFooter = () => {
  const { t } = useTranslation("common");

  return (
    <LayoutContainer as="footer" py={6}>
      <Stack
        direction={{ base: "column", md: "row" }}
        alignItems="center"
        justify="space-between"
        spacing={6}
      >
        <Text fontSize="md" textAlign="center">
          {t("footer.copyright")}
        </Text>

        <Stack direction="row" spacing={4}>
          <IconButton
            as="a"
            href="https://www.facebook.com/todosobreia"
            rel="noopener noreferrer nofollow"
            target="_blank"
            colorScheme="facebook"
            aria-label="Facebook"
            icon={<FaFacebook />}
          />

          <IconButton
            as="a"
            href="https://twitter.com/todosobreia"
            rel="noopener noreferrer nofollow"
            target="_blank"
            colorScheme="twitter"
            aria-label="Twitter"
            icon={<FaTwitter />}
          />

          <IconButton
            as="a"
            href="https://www.linkedin.com/company/todosobreia"
            rel="noopener noreferrer nofollow"
            target="_blank"
            aria-label="Discord"
            icon={<FaDiscord />}
          />
        </Stack>
      </Stack>
    </LayoutContainer>
  );
};
