import {
  AspectRatio,
  Box,
  Heading,
  LinkBox,
  LinkBoxProps,
  LinkOverlay,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";

import { Tool } from "@/types/Tool";

export interface ToolCardProps extends LinkBoxProps {
  tool: Tool;
}

export const ToolCard = ({ tool, ...others }: ToolCardProps) => {
  return (
    <LinkBox
      as="article"
      borderRadius="md"
      boxShadow="md"
      overflow="hidden"
      transition="all .3s ease-in-out"
      _hover={{ transform: "scale(1.02)" }}
      {...others}
    >
      <AspectRatio ratio={1280 / 800}>
        <Box as="img" src={tool.thumbnail} alt="" objectFit="contain" />
      </AspectRatio>

      <Stack as="footer" p={4}>
        <Heading as="h2" fontSize="2xl">
          <Link href={`/herramientas/${tool.name}`} passHref legacyBehavior>
            <LinkOverlay>{tool.name}</LinkOverlay>
          </Link>
        </Heading>
      </Stack>
    </LinkBox>
  );
};
