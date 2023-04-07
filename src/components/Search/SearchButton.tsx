import { SearchIcon } from "@chakra-ui/icons";
import {
  chakra,
  HStack,
  HTMLChakraProps,
  Kbd,
  Text,
  VisuallyHidden,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";

import SearchModal from "./SearchModal";

const ACTION_KEY_DEFAULT = ["Ctrl", "Control"];
const ACTION_KEY_APPLE = ["⌘", "Command"];

export const SearchButton = (props: HTMLChakraProps<"button">) => {
  const { t } = useTranslation("common");
  const [actionKey, setActionKey] = useState<string[]>(ACTION_KEY_APPLE);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  useEffect(() => {
    if (typeof navigator === "undefined") {
      return;
    }

    const isMac = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

    if (!isMac) {
      setActionKey(ACTION_KEY_DEFAULT);
    }
  }, []);

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && e.metaKey) {
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <SearchModal isOpen={isOpen} onClose={handleToggle} />

      <chakra.button
        w="full"
        bg="white"
        whiteSpace="nowrap"
        display="flex"
        alignItems="center"
        color="gray.600"
        py="3"
        px="4"
        outline={0}
        _focus={{ shadow: "outline" }}
        shadow="base"
        rounded="md"
        onClick={handleToggle}
        {...props}
      >
        <HStack w="full" spacing={2}>
          <SearchIcon />

          <Text textAlign="left" flex="1">
            {t("search.button")}
          </Text>

          <HStack display={{ base: "none", md: "flex" }} spacing={1}>
            <VisuallyHidden>2</VisuallyHidden>
            <Kbd rounded="sm">
              <chakra.div
                as="abbr"
                title={actionKey[1]}
                textDecoration="none !important"
              >
                {actionKey[0]}
              </chakra.div>
            </Kbd>
            <VisuallyHidden>4</VisuallyHidden>
            <Kbd rounded="sm">K</Kbd>
            <VisuallyHidden>3</VisuallyHidden>
          </HStack>
        </HStack>
      </chakra.button>
    </>
  );
};
