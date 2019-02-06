import fs from "fs";

describe("Benefits data", () => {
  let data;
  beforeEach(() => {
    data = JSON.parse(fs.readFileSync("data/data.json")).benefits;
  });

  it("is not empty", () => {
    expect(data).not.toHaveLength(0);
  });
});
