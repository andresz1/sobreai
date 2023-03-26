import { Fetcher } from "@/fetchers/Fetcher";
import { Tool } from "@/types/Tool";

export class ToolsService {
  fetcher: Fetcher;

  constructor({ fetcher }: { fetcher: Fetcher }) {
    this.fetcher = fetcher;
  }

  create({ url }: Pick<Tool, "url">) {
    return this.fetcher.post("/tools", {
      url,
    });
  }
}
