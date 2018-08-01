const githubData = {
  pullRequests: [
    {
      merged_at: "2018-07-26T19:12:05Z",
      merge_commit_sha: "1a",
      title: "PR 2"
    },
    {
      merged_at: "2018-07-24T19:12:05Z",
      merge_commit_sha: "2b",
      title: "PR 1"
    },
    {
      title: "PR 3 (Not merged)"
    }
  ],
  releases: [
    {
      commit: { sha: "1a" },
      name: "release1"
    }
  ]
};

export default githubData;
