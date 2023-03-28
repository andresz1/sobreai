import fs from "fs";
import path from "path";
import slugify from "slugify";

import { Category } from "@/types/Category";

export class CategoriesExtractor {
  async fetchAll(): Promise<Array<Category>> {
    const location = path.join(process.cwd(), "public/files/tools.json");
    const categories = JSON.parse(fs.readFileSync(location, "utf-8"));
    return categories.map((category) => ({
      ...category,
      slug: slugify(category.name, { lower: true }),
    }));
  }

  async fetchOne({ slug }: { slug: string }): Promise<Category | undefined> {
    const categories = await this.fetchAll();

    return categories.find((category) => category.slug === slug);
  }
}
