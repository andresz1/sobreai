import captureWebsite from "capture-website";
import fs from "fs";
import path from "path";

const execute = async () => {
  const location = path.join(process.cwd(), "public/files/tools.json");
  const tools = JSON.parse(fs.readFileSync(location, "utf-8")).map((tool) => ({
    ...tool,
    thumbnail: `/images/${tool.name}.png`,
  }));

  await Promise.all([
    tools
      .filter((tool) => !fs.existsSync("public".concat(tool.thumbnail)))
      .map((tool) => {
        captureWebsite.file(tool.url, "public".concat(tool.thumbnail));
      }),
  ]);
};

execute();
