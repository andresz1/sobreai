import fs from "fs";
import path from "path";

import { Tool } from "@/types/Tool";

export class ToolsExtractor {
  fetchAll({
    category,
    limit = Infinity,
  }: { category?: string; limit?: number } = {}): Array<Tool> {
    const categories = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "public/files/categories.json"),
        "utf-8"
      )
    );
    const occupations = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "public/files/categories.json"),
        "utf-8"
      )
    );
    const tools = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "public/files/tools.json"),
        "utf-8"
      )
    );
    const princings = JSON.parse(
      fs.readFileSync(
        path.join(process.cwd(), "public/files/princings.json"),
        "utf-8"
      )
    );

    return Object.keys(tools)
      .filter((slug) => !category || tools[slug].category === category)
      .map((slug) => {
        const tool = tools[slug];
        const category = categories[tool.category];
        const pricing = tool.pricing && princings[tool.pricing];
        const thumbnail = `/images/captures/${slug}.png`;

        return {
          ...tool,
          slug,
          category: {
            ...category,
            slug: tool.category,
          },
          ...(pricing && { pricing: { ...pricing, slug: tool.pricing } }),
          occupations: tool.occupations.map((slug) => ({
            ...occupations[slug],
            slug,
          })),
          thumbnail,
        };
      })
      .reverse()
      .slice(0, limit);
  }

  fetchOne({ slug }: { slug: string }): Tool | undefined {
    const tools = this.fetchAll();

    return tools.find((tool) => tool.slug === slug);
  }

  fetchRelated({ slug, limit }: { slug: string; limit: number }) {
    const tool = this.fetchOne({ slug });

    if (!tool) {
      return [];
    }

    const tools = this.fetchAll({ category: tool.category.slug });
    const current = tools.findIndex((tool) => tool.slug === slug);

    const indices = Array.from(
      { length: limit },
      (_, index) => (current + index + 1) % tools.length
    )
      .filter((index) => index !== current)
      .map((index) => tools[index]);

    return [...new Set(indices)];
  }
}
