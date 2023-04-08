import { Stack, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { FiGithub, FiTwitter } from "react-icons/fi";
import { RxDiscordLogo } from "react-icons/rx";

import { LayoutContainer } from "./LayoutContainer";

export const LayoutFooter = () => {
  const { t } = useTranslation("common");

  const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER;
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;

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
            variant="outline"
            href={`https://github.com/${owner}/${repo}`}
            rel="noopener noreferrer nofollow"
            target="_blank"
            aria-label="GitHub"
            icon={<FiGithub />}
          />

          <IconButton
            as="a"
            variant="outline"
            href="https://twitter.com/sobreia_"
            rel="noopener noreferrer nofollow"
            target="_blank"
            aria-label="Twitter"
            icon={<FiTwitter />}
          />

          <IconButton
            as="a"
            variant="outline"
            href="https://discord.gg/fMWVJVcW"
            rel="noopener noreferrer nofollow"
            target="_blank"
            aria-label="Discord"
            icon={<RxDiscordLogo />}
          />
        </Stack>
      </Stack>
    </LayoutContainer>
  );
};
