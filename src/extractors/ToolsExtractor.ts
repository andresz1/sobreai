import fs from "fs";
import path from "path";
import slugify from "slugify";

import { Tool } from "@/types/Tool";

export class ToolsExtractor {
  constructor() {}

  async fetchAll(): Promise<Array<Tool>> {
    const location = path.join(process.cwd(), "public/files/tools.json");
    const tools = JSON.parse(fs.readFileSync(location, "utf-8")).map(
      (tool) => ({
        ...tool,
        slug: slugify(tool.name),
        thumbnail: `/images/captures/${tool.name}.png`,
      })
    );

    return tools;
  }

  async fetchOne({ slug }: { slug: string }): Promise<Tool | undefined> {
    const tools = await this.fetchAll();

    return tools.find((tool) => tool.slug === slug);
  }
}
