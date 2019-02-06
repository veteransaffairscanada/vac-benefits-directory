import fs from "fs";

describe("Needs data", () => {
  let data;
  beforeEach(() => {
    data = JSON.parse(fs.readFileSync("data/data.json")).needs;
  });

  it("is not empty", () => {
    expect(data).not.toHaveLength(0);
  });
});
