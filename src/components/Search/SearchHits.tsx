import {
  Box,
  BoxProps,
  LinkBox,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Highlight, useHits } from "react-instantsearch-hooks-web";

export interface SearchHits extends BoxProps {}

export const SearchHits = (props: SearchHits) => {
  const { hits, results } = useHits();

  if (results.query.length < 3) {
    return null;
  }

  return (
    <Box {...props}>
      {hits.length === 0 && <Text>No hay resultados</Text>}

      {hits.length > 0 && (
        <Stack spacing={4}>
          {hits.map((hit, index) => (
            <LinkBox
              key={hit.objectID}
              as="article"
              borderRadius="md"
              bgColor="gray.50"
              p={4}
              _hover={{ bgColor: "gray.200" }}
              sx={{ mark: { background: "gray.200" } }}
            >
              <Stack spacing={0}>
                <NextLink href={hit.url} passHref legacyBehavior>
                  <LinkOverlay fontWeight="bold">
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
