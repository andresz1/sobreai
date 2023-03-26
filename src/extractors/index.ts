import { ToolsExtractor } from "./ToolsExtractor";

export const createExtractors = () => {
  return {
    tools: new ToolsExtractor(),
  };
};
