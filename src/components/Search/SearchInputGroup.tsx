import {
  IconButton,
  Input,
  InputGroup,
  InputGroupProps,
  InputRightElement,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { ChangeEventHandler, cloneElement, ReactElement } from "react";
import { FiX } from "react-icons/fi";
import { useSearchBox } from "react-instantsearch-hooks-web";

export interface SearchInputGroupProps extends InputGroupProps {
  input?: ReactElement;
}

export const SearchInputGroup = ({ input = <Input />, ...others }) => {
  const { t } = useTranslation("common");
  const { query, clear, refine } = useSearchBox();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    refine(event.currentTarget.value);
  };

  const handleClearClick = () => {
    clear();
  };

  return (
    <InputGroup size="lg" variant="flushed" {...others}>
      {cloneElement(input, {
        placeholder: t("search.input_placeholder"),
        value: query,
        onChange: handleChange,
        autoFocus: true,
      })}
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
  );
};
