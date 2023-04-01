import { Select, SelectProps } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ChangeEventHandler } from "react";

import { Category } from "@/types/Category";

export interface CategorySectionProps extends SelectProps {
  categories: Array<Category>;
}

export const CategorySelect = ({
  categories,
  ...others
}: CategorySectionProps) => {
  const router = useRouter();

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const slug = event.target.value;
    router.push(`/herramientas/${slug}`);
  };

  return (
    <Select maxW="fit-content" onChange={handleChange} {...others}>
      {categories.map((category) => (
        <option key={category.slug} value={category.slug}>
          {category.name}
        </option>
      ))}
    </Select>
  );
};
