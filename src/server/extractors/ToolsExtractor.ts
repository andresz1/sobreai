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

    return Object.keys(tools)
      .filter((slug) => !category || tools[slug].category === category)
      .map((slug) => {
        const tool = tools[slug];
        const category = categories[tool.category];
        const thumbnail = `/images/captures/${slug}.png`;

        return {
          ...tool,
          slug,
          category: {
            ...category,
            slug: tool.category,
          },
          occupations: tool.occupations.map((slug) => ({
            ...occupations[slug],
            slug,
          })),
          thumbnail,
        };
      })
      .slice(0, limit);
  }

  fetchOne({ slug }: { slug: string }): Tool | undefined {
    const tools = this.fetchAll();

    return tools.find((tool) => tool.slug === slug);
  }
}
