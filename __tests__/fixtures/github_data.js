const githubData = {
  pullRequests: [
    {
      created_at: "2018-07-25T17:12:05Z",
      merged_at: "2018-07-26T19:12:05Z",
      merge_commit_sha: "1a",
      title: "PR 2"
    },
    {
      created_at: "2018-07-24T07:12:05Z",
      merged_at: "2018-07-24T19:12:05Z",
      merge_commit_sha: "3c",
      title: "PR 1"
    },
    {
      created_at: "2018-07-26T09:12:05Z",
      merged_at: "2018-07-26T19:12:05Z",
      merge_commit_sha: "2b",
      title: "PR 3"
    },
    {
      title: "PR 4 (Not merged)"
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
