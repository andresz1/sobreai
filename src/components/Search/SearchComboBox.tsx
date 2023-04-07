import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useCombobox } from "downshift";
import { useTranslation } from "next-i18next";
import { ChangeEventHandler } from "react";
import { FiX } from "react-icons/fi";
import {
  Highlight,
  useHits,
  useSearchBox,
} from "react-instantsearch-hooks-web";

export interface SearchComboBoxProps {
  onSelect?: (value: string) => void;
}

export const SearchComboBox = ({ onSelect }: SearchComboBoxProps) => {
  const { t } = useTranslation("common");
  const { hits } = useHits();
  const { query, clear, refine } = useSearchBox();
  const { getMenuProps, getInputProps, highlightedIndex, getItemProps } =
    useCombobox({
      inputValue: query,
      items: hits,
      onSelectedItemChange: ({ selectedItem }) => {
        if (onSelect) {
          onSelect(selectedItem.url as string);
        }
      },
    });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    refine(event.currentTarget.value);
  };

  const handleClearClick = () => {
    clear();
  };

  return (
    <>
      <InputGroup size="lg" px={6} variant="flushed">
        <Input
          placeholder="Search for articles!"
          size="lg"
          {...getInputProps({ value: query, onChange: handleChange })}
        />
        {query && (
          <InputRightElement onClick={handleClearClick}>
            <IconButton
              size="sm"
              variant="ghost"
              aria-label={t("search.clear_button")}
              icon={<FiX />}
            />
          </InputRightElement>
        )}
      </InputGroup>

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
        {hits.length === 0 && <Text>{t("search.empty")}</Text>}

        {hits.map((hit, index) => (
          <Box
            key={hit.objectID}
            as="li"
            p={4}
            borderRadius="md"
            bgColor={highlightedIndex === index ? "gray.200" : "gray.50"}
            sx={{ mark: { background: "gray.300" } }}
            {...getItemProps({ item: hit, index })}
          >
            <Stack spacing={0}>
              <Highlight attribute="title" hit={hit} />

              <Text fontSize="sm" noOfLines={2}>
                <Highlight attribute="content" hit={hit} />
              </Text>
            </Stack>
          </Box>
        ))}
      </Stack>
    </>
  );
};
