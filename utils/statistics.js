const octokit = require("@octokit/rest")();

exports.getGithubData = undefined;
const access_token = process.env.GITHUB_PUBLIC_ACCESS_TOKEN;

var getGithubData = (exports.getGithubData = async function getGithubData() {
  octokit.authenticate({
    type: "token",
    token: access_token
  });
  const resp = await octokit.pullRequests.getAll({
    owner: "cds-snc",
    repo: "vac-benefits-directory",
    state: "all",
    per_page: 100
  });
  return resp.data;
});
