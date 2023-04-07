import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
  Text,
} from "@chakra-ui/react";
import algoliasearch from "algoliasearch/lite";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { FiX } from "react-icons/fi";
import { Highlight, InstantSearch } from "react-instantsearch-hooks-web";

import { SearchComboBox } from "./SearchComboBox";

export type SearchModalProps = Omit<ModalProps, "children">;

const SearchModal = ({ onClose, ...others }: SearchModalProps) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
  );

  const handleSelect = (url: string) => {
    router.push(url);
    onClose();
  };

  return (
    <Modal
      initialFocusRef={null}
      size={{ base: "full", md: "xl" }}
      scrollBehavior="inside"
      isCentered
      onClose={onClose}
      {...others}
    >
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>{t("search.title")}</ModalHeader>

        <ModalCloseButton />

        <InstantSearch searchClient={searchClient} indexName="sobreia.com">
          <SearchComboBox onClose={onClose} onSelect={handleSelect}>
            {({
              query,
              hits,
              onClear,
              highlightedIndex,
              getInputProps,
              getMenuProps,
              getItemProps,
            }) => (
              <>
                <Box px={6}>
                  <InputGroup size="lg" variant="flushed">
                    <Input
                      autoFocus
                      placeholder={t("search.input_placeholder")}
                      {...getInputProps()}
                    />

                    {query && (
                      <InputRightElement onClick={onClear}>
                        <IconButton
                          size="md"
                          variant="ghost"
                          aria-label={t("search.clear_button")}
                          icon={<FiX />}
                        />
                      </InputRightElement>
                    )}
                  </InputGroup>
                </Box>

                <Stack
                  as="ul"
                  spacing={4}
                  overflow="scroll"
                  h="full"
                  flex={1}
                  p={6}
                  listStyleType="none"
                  {...getMenuProps()}
                >
                  {query.length > 2 && (
                    <>
                      {hits.length === 0 && <Text>{t("search.empty")}</Text>}

                      {hits.map((hit, index) => (
                        <Box
                          key={hit.objectID}
                          as="li"
                          p={4}
                          borderRadius="md"
                          bgColor={
                            highlightedIndex === index ? "gray.200" : "gray.50"
                          }
                          cursor="pointer"
                          sx={{ mark: { background: "gray.300" } }}
                          {...getItemProps({ item: hit, index })}
                        >
                          <Stack spacing={0}>
                            <Text fontWeight="bold">
                              <Highlight attribute="title" hit={hit} />
                            </Text>

                            <Text fontSize="sm" noOfLines={2}>
                              <Highlight attribute="content" hit={hit} />
                            </Text>
                          </Stack>
                        </Box>
                      ))}
                    </>
                  )}
                </Stack>
              </>
            )}
          </SearchComboBox>
        </InstantSearch>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
