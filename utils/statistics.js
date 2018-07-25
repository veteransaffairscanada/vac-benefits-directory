const fetch = require("isomorphic-fetch");

exports.getGithubData = undefined;

// tried this but didn't work
// const octokit = require('@octokit/rest')({
//   debug: true,
// })
// octokit.authenticate({
//   type: "token",
//   token: access_token
// });
//   const resp = await octokit.pullRequests.getAll({ owner: "cds-snc", repo: "vac-benefits-directory", state: "all" });

const access_token = process.env.GITHUB_PUBLIC_ACCESS_TOKEN;

var getGithubData = (exports.getGithubData = async function getGithubData() {
  let offset = undefined;
  let jsonRecords = [];

  do {
    let url =
      "https://api.github.com/repos/cds-snc/vac-benefits-directory/pulls?per_page=20&access_token=" +
      access_token +
      "&state=closed";
    if (offset) {
      url = url + "&page=" + offset;
    }
    const resp = await fetch(url, {});
    const json = await resp.json();
    jsonRecords = jsonRecords.concat(json);
    // offset = json.offset;
  } while (offset);

  return jsonRecords.map(pr => {
    let day = new Date(pr.merged_at);
    day.setHours(0, 0, 0);
    return {
      created_at: pr.created_at,
      closed_at: pr.closed_at,
      merged_at: pr.merged_at,
      merged_day: day,
      title: pr.title,
      user: pr.user.login
    };
  });
});
