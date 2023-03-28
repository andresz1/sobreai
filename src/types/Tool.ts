import { Category } from "./Category";

export interface Tool {
  name: string;
  description: string;
  thumbnail: string;
  url: string;
  slug: string;
  category: Omit<Category, "tools">;
}
