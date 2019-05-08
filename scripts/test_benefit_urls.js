const fs = require("fs");
const urlCheck = require("../utils/url_check");

const benefits = JSON.parse(fs.readFileSync("data/data.json")).benefits;

const checkBenefitUrls = b => {
  Promise.resolve(urlCheck.fetchUrl(b.benefitPageEn)).then(result => {
    if (!result) {
      // eslint-disable-next-line no-console
      console.log(
        `${b.vacNameEn}: Error connecting to benefitPageEn (${b.benefitPageEn})`
      );
    }
  });
  Promise.resolve(urlCheck.fetchUrl(b.benefitPageFr)).then(result => {
    if (!result) {
      // eslint-disable-next-line no-console
      console.log(
        `${b.vacNameEn}: Error connecting to benefitPageFr (${b.benefitPageFr})`
      );
    }
  });
};

benefits.map((b, index) => {
  setTimeout(() => checkBenefitUrls(b), index * 20);
});
