import fs from "fs";
import path from "path";
import slugify from "slugify";

import { Tool } from "@/types/Tool";

import { CategoriesExtractor } from "./CategoriesExtractor";

export class ToolsExtractor {
  categories: CategoriesExtractor;

  constructor({ categories }: { categories: CategoriesExtractor }) {
    this.categories = categories;
  }

  async fetchAll({
    slug,
    limit = Infinity,
  }: { slug?: string; limit?: number } = {}): Promise<Array<Tool>> {
    const categories = await this.categories.fetchAll();

    const tools = categories
      .filter((category) => category.slug !== slug)
      .reduce(
        (acc, { tools, ...category }) => [
          ...acc,
          ...tools.map((tool) => ({ ...tool, category })),
        ],
        []
      )
      .map((tool) => ({
        ...tool,
        slug: slugify(tool.name, { lower: true }),
        thumbnail: `/images/captures/${tool.name}.png`,
      }))
      .slice(0, limit);

    return tools;
  }

  async fetchOne({ slug }: { slug: string }): Promise<Tool | undefined> {
    const tools = await this.fetchAll();

    return tools.find((tool) => tool.slug === slug);
  }
}
