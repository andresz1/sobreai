import { CategoriesExtractor } from "./CategoriesExtractor";
import { OccupationsExtractor } from "./OccupationsExtractor";
import { ToolsExtractor } from "./ToolsExtractor";

export const createExtractors = () => {
  const categories = new CategoriesExtractor();
  const tools = new ToolsExtractor();
  const occupations = new OccupationsExtractor();

  return {
    categories,
    tools,
    occupations,
  };
};
