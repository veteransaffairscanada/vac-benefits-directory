const octokit = require("@octokit/rest")();

exports.getGithubData = undefined;
const access_token = process.env.GITHUB_PUBLIC_ACCESS_TOKEN;

var getGithubData = (exports.getGithubData = async function getGithubData() {
  if (access_token == null) {
    return { pullRequests: [] };
  }

  octokit.authenticate({
    type: "token",
    token: access_token
  });

  async function paginate(method, params) {
    let response = await method(params);
    let { data } = response;
    while (octokit.hasNextPage(response)) {
      response = await octokit.getNextPage(response);
      data = data.concat(response.data);
    }
    return data;
  }

  let data = {};

  const prResp = await paginate(octokit.pullRequests.getAll, {
    owner: "cds-snc",
    repo: "vac-benefits-directory",
    state: "all",
    per_page: 100
  });

  const releasesResp = await paginate(octokit.repos.getTags, {
    owner: "cds-snc",
    repo: "vac-benefits-directory",
    per_page: 100
  });

  data.pullRequests = prResp;
  data.releases = releasesResp;

  return data;
});
