import {
  Box,
  BoxProps,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useTranslation } from "next-i18next";
import { MouseEventHandler } from "react";
import { Highlight, useHits } from "react-instantsearch-hooks-web";

export interface SearchListBox extends BoxProps {
  onLinkClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const SearchListBox = ({ onLinkClick, ...others }: SearchListBox) => {
  const { t } = useTranslation("common");
  const { hits, results } = useHits();

  if (results.query.length < 3) {
    return null;
  }

  return (
    <Box {...others}>
      {hits.length === 0 && <Text>{t("search.empty")}</Text>}

      {hits.length > 0 && (
        <Stack spacing={4}>
          {hits.map((hit) => (
            <LinkBox
              key={hit.objectID}
              as="article"
              p={4}
              borderRadius="md"
              bgColor="gray.50"
              _hover={{ bgColor: "gray.200" }}
              sx={{ mark: { background: "gray.300" } }}
            >
              <Stack spacing={0}>
                <NextLink href={hit.url} passHref legacyBehavior>
                  <LinkOverlay fontWeight="bold" onClick={onLinkClick}>
                    <Highlight attribute="title" hit={hit} />
                  </LinkOverlay>
                </NextLink>

                <Text fontSize="sm" noOfLines={2}>
                  <Highlight attribute="content" hit={hit} />
                </Text>
              </Stack>
            </LinkBox>
          ))}
        </Stack>
      )}
    </Box>
  );
};
