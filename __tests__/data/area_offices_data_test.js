import fs from "fs";

describe("Area offices data", () => {
  let data;
  beforeEach(() => {
    data = JSON.parse(fs.readFileSync("data/data.json")).areaOffices;
  });

  it("is not empty", () => {
    expect(data).not.toHaveLength(0);
  });

  it("has required fields in all rows", () => {
    data.forEach(a => {
      expect(
        !!a.address_en &&
          !!a.address_fr &&
          !!a.lat &&
          !!a.lng &&
          !!a.name_en &&
          !!a.name_fr
      ).toBeTruthy();
    });
  });
});
