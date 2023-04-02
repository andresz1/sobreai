import { Button, ButtonProps } from "@chakra-ui/react";
import { FiGithub } from "react-icons/fi";

export interface RepositoryButton extends ButtonProps {}

export const RepositoryButton = (props: RepositoryButton) => {
  const owner = process.env.NEXT_PUBLIC_GITHUB_OWNER;
  const repo = process.env.NEXT_PUBLIC_GITHUB_REPO;
  const href = `https://github.com/${owner}/${repo}`;

  return (
    <Button
      as="a"
      href={href}
      leftIcon={<FiGithub />}
      rel="noopener noreferrer nofollow"
      target="_blank"
      {...props}
    />
  );
};
