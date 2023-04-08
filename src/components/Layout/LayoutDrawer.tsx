import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerProps,
  Heading,
  Stack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import { FiGithub, FiGrid, FiHome } from "react-icons/fi";
import { RxDiscordLogo } from "react-icons/rx";

import { CreateToolButton } from "../Tool/CreateToolButton";
import { LayoutDrawerItem } from "./LayoutDrawerItem";

export type LayoutDrawerProps = Omit<DrawerProps, "children">;

export const LayoutDrawer = ({ onClose, ...others }: LayoutDrawerProps) => {
  const { t } = useTranslation("common");
  const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER;
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;

  const handleClose = () => {
    onClose();
  };

  return (
    <Drawer onClose={onClose} {...others}>
      <DrawerOverlay />

      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          <Heading fontSize="2xl">SobreIA</Heading>
        </DrawerHeader>

        <DrawerBody px={0}>
          <NextLink href="/" passHref legacyBehavior>
            <LayoutDrawerItem as="a" icon={<FiHome />} onClick={handleClose}>
              {t("drawer.home")}
            </LayoutDrawerItem>
          </NextLink>

          <NextLink href="/herramientas" passHref legacyBehavior>
            <LayoutDrawerItem as="a" icon={<FiGrid />} onClick={handleClose}>
              {t("drawer.tools")}
            </LayoutDrawerItem>
          </NextLink>

          <LayoutDrawerItem
            as="a"
            href={`https://github.com/${owner}/${repo}`}
            rel="noopener noreferrer nofollow"
            target="_blank"
            icon={<FiGithub />}
            onClick={handleClose}
          >
            {t("drawer.github")}
          </LayoutDrawerItem>

          <LayoutDrawerItem
            as="a"
            href="https://discord.gg/fMWVJVcW"
            rel="noopener noreferrer nofollow"
            target="_blank"
            icon={<RxDiscordLogo />}
            onClick={handleClose}
          >
            {t("drawer.discord")}
          </LayoutDrawerItem>
        </DrawerBody>

        <DrawerFooter>
          <Stack w="full" alignItems="center">
            <CreateToolButton size="lg">
              {t("drawer.suggest_button")}
            </CreateToolButton>
          </Stack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
