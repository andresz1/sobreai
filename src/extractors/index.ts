import { CategoriesExtractor } from "./CategoriesExtractor";
import { ToolsExtractor } from "./ToolsExtractor";

export const createExtractors = () => {
  const categories = new CategoriesExtractor();
  const tools = new ToolsExtractor({ categories });

  return {
    categories,
    tools,
  };
};
