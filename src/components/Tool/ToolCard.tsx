import {
  AspectRatio,
  Box,
  Heading,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Stack,
  Tag,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";

import { Tool } from "@/types/Tool";

export interface ToolCardProps extends LinkBoxProps {
  tool: Tool;
}

export const ToolCard = ({ tool, ...others }: ToolCardProps) => {
  const { t } = useTranslation("tool");

  return (
    <LinkBox
      as="article"
      borderRadius="lg"
      boxShadow="lg"
      overflow="hidden"
      transition="all .3s ease-in-out"
      _hover={{ transform: "scale(1.02)" }}
      {...others}
    >
      <AspectRatio ratio={128 / 80} bgColor="blackAlpha.100">
        <Box position="relative" w="full" h="full">
          <Image
            src={tool.thumbnail}
            alt={t("card.image", { name: tool.name })}
            objectFit="contain"
            fill
          />
          <Tag
            position="absolute"
            bottom={3}
            right={3}
            borderRadius="full"
            boxShadow="lg"
          >
            {tool.category.name}
          </Tag>
        </Box>
      </AspectRatio>

      <Stack as="footer" p={4}>
        <Heading as="h3" fontSize="2xl">
          <Link href={`/herramienta/${tool.slug}`} passHref legacyBehavior>
            <LinkOverlay>{tool.name}</LinkOverlay>
          </Link>
        </Heading>

        <Text as="p" fontSize="xl" noOfLines={2}>
          {tool.description}
        </Text>
      </Stack>
    </LinkBox>
  );
};
