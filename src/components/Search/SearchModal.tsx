import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  Stack,
} from "@chakra-ui/react";
import algoliasearch from "algoliasearch/lite";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { InstantSearch } from "react-instantsearch-hooks-web";

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
          <SearchComboBox onSelect={handleSelect} />
        </InstantSearch>
      </ModalContent>
    </Modal>
  );
};

export default SearchModal;
