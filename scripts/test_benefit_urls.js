const fs = require("fs");
const urlCheck = require("../utils/url_check");

const benefits = JSON.parse(fs.readFileSync("data/data.json")).benefits;

benefits.map(b => {
  Promise.resolve(urlCheck.fetchUrl(b.benefitPageEn)).then(result => {
    if (!result) {
      console.log(
        `${b.vacNameEn}: Error connecting to benefitPageEn (${b.benefitPageEn})`
      );
    }
  });
  Promise.resolve(urlCheck.fetchUrl(b.benefitPageFr)).then(result => {
    if (!result) {
      console.log(
        `${b.vacNameEn}: Error connecting to benefitPageFr (${b.benefitPageFr})`
      );
    }
  });
});
