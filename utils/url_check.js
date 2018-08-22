require("isomorphic-fetch");

exports.checkURL = undefined;

var checkURL = (exports.checkURL = async function checkURL(
  payload,
  urlCache,
  data
) {
  // Find the benefit that needs its URLs checked
  let benefit = data.benefits.find(b => b.id === payload.id);
  if (typeof benefit !== "undefined") {
    // Check if benefit ID is in cache and has not yet expired
    if (urlCache[benefit.id] && urlCache[benefit.id].timestamp > Date.now()) {
      return urlCache;
    } else {
      // Check En and Fr URLS
      var enResult = await fetchUrl(benefit.benefitPageEn);
      var frResult = await fetchUrl(benefit.benefitPageFr);
      urlCache[benefit.id] = {
        passEn: enResult,
        passFr: frResult,
        timestamp: Date.now() + 1000 * 60 * 3 // Cache 3 minutes to prevent DOS
      };

      return urlCache;
    }
  }
});

var fetchUrl = async function fetchURL(url) {
  return await fetch(url).then(
    resp => {
      return resp.url !== url ? false : true;
    },
    () => {
      return false;
    }
  );
};
