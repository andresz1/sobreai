import { CloseIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { ChangeEventHandler } from "react";
import { useSearchBox } from "react-instantsearch-hooks-web";

export const SearchInput = () => {
  const { query, clear, refine } = useSearchBox();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    refine(event.currentTarget.value);
  };

  const handleClearClick = () => {
    clear();
  };

  return (
    <InputGroup variant="flushed">
      <Input
        placeholder="Search for articles!"
        size="lg"
        value={query}
        onChange={handleChange}
        autoFocus
      />
      {query && (
        <InputRightElement onClick={handleClearClick}>
          <IconButton
            variant="unstyled"
            aria-label=""
            icon={<CloseIcon color="black" />}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
};
