import {
  AspectRatio,
  Box,
  Heading,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Stack,
  Tag,
  TagLeftIcon,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { FiDollarSign } from "react-icons/fi";

import { Tool } from "@/types/Tool";

export interface ToolCardProps extends LinkBoxProps {
  tool: Tool;
}

export const ToolCard = ({ tool, ...others }: ToolCardProps) => {
  const { t } = useTranslation("tool");

  return (
    <LinkBox
      as="article"
      display="flex"
      flexDir="column"
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

          {tool.pricing && (
            <Tag
              position="absolute"
              bottom={3}
              right={3}
              size="lg"
              borderRadius="full"
              boxShadow="lg"
            >
              <TagLeftIcon as={FiDollarSign} />
              {tool.pricing.name}
            </Tag>
          )}
        </Box>
      </AspectRatio>

      <Stack flex={1} p={4}>
        <Heading as="h3" fontSize="2xl">
          <Link href={`/herramienta/${tool.slug}`} passHref legacyBehavior>
            <LinkOverlay>{tool.name}</LinkOverlay>
          </Link>
        </Heading>

        <Text as="p" fontSize="xl" flex={1} noOfLines={2}>
          {tool.description}
        </Text>

        <Box display="inline-block">
          <Tag borderRadius="full" size="lg">
            {tool.category.name}
          </Tag>
        </Box>
      </Stack>
    </LinkBox>
  );
};
