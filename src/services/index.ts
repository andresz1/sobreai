import { FetcherFactory } from "@/fetchers/Fetcher";

import { ToolsService } from "./ToolsService";

export class ServicesFactory {
  static create() {
    const fetcher = FetcherFactory.create();

    return {
      tools: new ToolsService({ fetcher }),
    };
  }
}
