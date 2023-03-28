import { Tool } from "./Tool";

export interface Category {
  name: string;
  description: string;
  slug: string;
  tools: Array<Tool>;
}
