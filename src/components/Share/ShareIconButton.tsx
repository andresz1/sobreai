import { IconButton, IconButtonProps } from "@chakra-ui/button";
import { Icon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import { HiOutlineShare } from "react-icons/hi";

import ShareModal from "./ShareModal";

export interface ShareIconButtonProps extends IconButtonProps {
  title: string;
  text: string;
  url?: string;
}

export const ShareIconButton = ({
  title,
  text,
  url: urlProp,
  ...others
}: ShareIconButtonProps) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const url = urlProp || `/${router.asPath}`;

  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleClick = async () => {
    if (!navigator.share) {
      handleToggle();
      return;
    }

    try {
      await navigator.share({
        title,
        text,
        url,
      });
      // eslint-disable-next-line no-empty
    } catch (error) {}
  };

  return (
    <>
      <IconButton variant="ghost" onClick={handleClick} {...others}>
        <Icon as={HiOutlineShare} />
      </IconButton>

      <ShareModal
        isOpen={isOpen}
        onClose={handleToggle}
        text={text}
        url={url}
      />
    </>
  );
};
