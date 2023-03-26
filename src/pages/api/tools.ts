const { Octokit } = require("@octokit/rest");
import { connect } from "@/server/connect";

const router = connect();

router.post(async (req, res) => {
  const octokit = new Octokit({
    auth: process.env.GITHUB_AUTH_TOKEN,
  });
  const { url } = req.body;

  const { data } = await octokit.rest.issues.create({
    owner: process.env.NEXT_PUBLIC_GITHUB_OWNER,
    repo: process.env.NEXT_PUBLIC_GITHUB_REPO,
    title: "Add a new tool",
    body: `Add the tool hosted in ${url}`,
  });

  res.status(200).json({ data });
});

export default router.handler();
