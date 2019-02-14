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
      expect(a.address_en).toBeTruthy();
      expect(a.address_fr).toBeTruthy();
      expect(a.lat).toBeTruthy();
      expect(a.lng).toBeTruthy();
      expect(a.name_en).toBeTruthy();
      expect(a.name_fr).toBeTruthy();
    });
  });
});
