import fs from "fs";
import path from "path";

import { Category } from "@/types/Category";

export class CategoriesExtractor {
  fetchAll(): Array<Category> {
    const categories = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "public/files/categories.json"),
        "utf-8"
      )
    );

    return Object.keys(categories).map((slug) => {
      const category = categories[slug];

      return {
        ...category,
        slug,
      };
    });
  }

  fetchOne({ slug }: { slug: string }): Category | undefined {
    const categories = this.fetchAll();
    return categories.find((category) => category.slug === slug);
  }
}
