import {
  AspectRatio,
  Box,
  Heading,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

import { Tool } from "@/types/Tool";

export interface ToolCardProps extends LinkBoxProps {
  tool: Tool;
}

export const ToolCard = ({ tool, ...others }: ToolCardProps) => {
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
        <Image src={tool.thumbnail} alt="" objectFit="contain" fill />
      </AspectRatio>

      <Stack as="footer" p={4}>
        <Heading as="h2" fontSize="2xl">
          <Link href={`/herramientas/${tool.slug}`} passHref legacyBehavior>
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
