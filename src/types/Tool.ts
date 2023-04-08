import { Category } from "./Category";
import { Pricing } from "./Princing";

export interface Tool {
  name: string;
  description: string;
  thumbnail: string;
  url: string;
  slug: string;
  waiting: true;
  category: Omit<Category, "tools">;
  pricing?: Pricing;
}
