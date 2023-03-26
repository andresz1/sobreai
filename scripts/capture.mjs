import captureWebsite from "capture-website";
import fs from "fs";
import path from "path";

const execute = () => {
  const location = path.join(process.cwd(), "public/files/tools.json");
  const tools = JSON.parse(fs.readFileSync(location, "utf-8")).map((tool) => ({
    ...tool,
    thumbnail: `/images/captures/${tool.name}.png`,
  }));

  return Promise.all([
    tools
      .filter((tool) => !fs.existsSync("public".concat(tool.thumbnail)))
      .map((tool) => {
        captureWebsite.file(tool.url, "public".concat(tool.thumbnail), {
          launchOptions: {
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          },
        });
      }),
  ]);
};

execute();
