import captureWebsite from "capture-website";
import fs from "fs";
import path from "path";

const execute = () => {
  const location = path.join(process.cwd(), "public/files/tools.json");
  const all = JSON.parse(fs.readFileSync(location, "utf-8"));
  const tools = Object.keys(all).map((slug) => ({
    ...all[slug],
    thumbnail: `/images/captures/${slug}.png`,
  }));

  return Promise.all([
    tools
      .filter((tool) => !fs.existsSync("public".concat(tool.thumbnail)))
      .map((tool) => {
        captureWebsite.file(tool.url, "public".concat(tool.thumbnail), {
          launchOptions: {
            delay: 1,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
          },
        });
      }),
  ]);
};

execute();
