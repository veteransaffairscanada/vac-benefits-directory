import fs from "fs";

describe("Area offices data", () => {
  let data;
  beforeEach(() => {
    data = JSON.parse(fs.readFileSync("data/data.json")).areaOffices;
  });

  it("is not empty", () => {
    expect(data).not.toHaveLength(0);
  });
});
