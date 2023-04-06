import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalProps,
  Stack,
} from "@chakra-ui/react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch-hooks-web";

import { SearchHits } from "./SearchHits";
import { SearchInput } from "./SearchInput";

export type SearchModalProps = Omit<ModalProps, "children">;

const SearchModal = (props: SearchModalProps) => {
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  );

  return (
    <Modal
      size={{ base: "full", md: "xl" }}
      scrollBehavior="inside"
      isCentered
      {...props}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalBody pt={0} pb={8}>
          <InstantSearch
            searchClient={searchClient} // this is the Algolia client
            indexName="sobreia.com" // this is your index name
          >
            <Stack spacing={4}>
              <Box
                pt={4}
                position="sticky"
                top={0}
                width="full"
                zIndex="docked"
                background="white"
              >
                <SearchInput />
              </Box>

              <SearchHits />
            </Stack>
          </InstantSearch>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
