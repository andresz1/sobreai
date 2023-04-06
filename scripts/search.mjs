import algoliasearch from "algoliasearch";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

const getTools = () =>
  JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "public/files/tools.json"),
      "utf-8"
    )
  );

const getCategories = () =>
  JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "public/files/categories.json"),
      "utf-8"
    )
  );

const getPostsSearchObjects = () => {
  const tools = getTools();
  const categories = getCategories();

  return Object.keys(tools).map((slug) => {
    const tool = tools[slug];

    return {
      objectID: slug,
      title: tool.name,
      content: tool.description,
      url: `/herramienta/${slug}`,
      category: categories[tool.category].name,
    };
  });
};

const getCategoriesSearchObjects = () => {
  const categories = getCategories();

  return Object.keys(categories).map((slug) => {
    const category = categories[slug];

    return {
      objectID: slug,
      title: category.name,
      content: category.description,
      url: `/herramientas/${slug}`,
    };
  });
};

const execute = async () => {
  dotenv.config({ path: `.env.local` });

  const client = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.ALGOLIA_SEARCH_ADMIN_KEY
  );

  const posts = getPostsSearchObjects();
  const categories = getCategoriesSearchObjects();

  const index = client.initIndex("sobreia.com");

  await Promise.all([index.saveObjects(posts), index.saveObjects(categories)]);
};

execute();
