import { Button } from "@chakra-ui/button";
import { useClipboard } from "@chakra-ui/hooks";
import { Icon } from "@chakra-ui/icon";
import {
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { useTranslation } from "next-i18next";
import { HiOutlineDuplicate } from "react-icons/hi";

export type ShareInputGroupProps = InputGroupProps & { value: string };

const ShareInputGroup = ({ value, ...others }: ShareInputGroupProps) => {
  const { t } = useTranslation("common");
  const { hasCopied, onCopy } = useClipboard(value);
  const width = 20;

  return (
    <InputGroup {...others}>
      <InputLeftElement>
        <Icon as={HiOutlineDuplicate} />
      </InputLeftElement>

      <Input pr={width} value={value} isReadOnly />

      <InputRightElement width={width}>
        <Button size="sm" onClick={onCopy}>
          {hasCopied ? t("share.button_copied") : t("share.button_copy")}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default ShareInputGroup;
