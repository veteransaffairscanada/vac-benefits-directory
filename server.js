const express = require("express");
const bodyParser = require("body-parser");
const next = require("next");
const Cookies = require("universal-cookie");
const helmet = require("helmet");
const compression = require("compression");
const fs = require("fs");

const { parseUserAgent } = require("detect-browser");

const dev = process.env.NODE_ENV !== "production";
const staging = process.env.STAGING !== undefined;
const app = next({ dev });
const handle = app.getRequestHandler();

const deploy = require("./utils/deploy_notification");

const airTable = require("./utils/airtable_es2015");

const { checkURL } = require("./utils/url_check");

const Logger = require("./utils/logger").default;

const readJsonAsync = function(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, buffer) => {
      if (err) reject(err);
      else resolve(JSON.parse(buffer));
    });
  });
};

const getAllData = async function() {
  let airtableData;
  if (staging) {
    console.log("Staging environment, downloading from Airtable");
    airtableData = await airTable.hydrateFromAirtable();
  } else {
    console.log("Production environment, using static file");
    airtableData = await readJsonAsync("data/data.json");
  }
  return { airtableData: airtableData };
};

const copyValidTables = (oldData, newData) => {
  Object.keys(newData)
    .filter(tableName => newData[tableName].length > 0)
    .forEach(tableName => {
      oldData[tableName] = newData[tableName];
    });
  oldData.timestamp = newData.timestamp;
};

Promise.resolve(getAllData()).then(allData => {
  let data = allData.airtableData;

  if (staging) {
    setInterval(function() {
      Promise.resolve(airTable.hydrateFromAirtable()).then(newData => {
        copyValidTables(data, newData);
        Logger.info("Cache refreshed automatically @ " + data.timestamp, {
          source: "/server.js"
        });
      });
    }, 1000 * 60 * 60);
  }

  app.prepare().then(() => {
    const server = express();
    server.use(compression());
    server.use(bodyParser.json());
    server.use(helmet());

    // submitting Feedback
    server.post("/submitComment", (req, res) => {
      Logger.info("Submitting comments", { source: "/server.js" });
      airTable.writeFeedback(req.body);
      res.sendStatus(200);
    });

    // handle URL validation
    let urlCache = {};
    server.post("/checkURL", (req, res) => {
      const benefitId = encodeURIComponent(req.body.id);
      Logger.info(`Checking URL for: ${req.body.id}`, {
        source: "/server.js"
      });
      Promise.resolve(checkURL(benefitId, urlCache, data)).then(newUrls => {
        urlCache = newUrls;
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(urlCache[benefitId]));
      });
    });

    // use next.js
    server.get("*", (req, res) => {
      // Check if browse is less than IE 11
      const ua = req.headers["user-agent"];
      const browser = parseUserAgent(ua);
      const lang = req.query.lng
        ? req.query.lng
        : req.headers["accept-language"];

      req.data = data;
      req.language = lang.split(",")[0];

      if (
        browser &&
        browser.name === "ie" &&
        parseInt(browser.version) < 11 &&
        !req.url.includes("all-benefits")
      ) {
        res.sendFile("fallback-pages/browser-incompatible.html", {
          root: __dirname
        });
      } else if (req.url.includes("refresh")) {
        Logger.info("Refreshing Cache ...", { source: "/server.js" });
        let referrer = req.header("Referer") || "/";
        urlCache = {};
        Promise.resolve(airTable.hydrateFromAirtable()).then(newData => {
          copyValidTables(data, newData);
          res.redirect(referrer);
          Logger.info("Cache refreshed @ " + data.timestamp, {
            source: "/server.js"
          });
        });
      } else if (req.url.includes("data-validation") && !staging) {
        res
          .status(404)
          .send("The Data Validation page only exists on the staging app.");
      } else {
        const favouriteBenefits = new Cookies(req.headers.cookie).get(
          "favouriteBenefits"
        );
        if (favouriteBenefits) {
          const existingBenefitIds = data.benefits.map(x => x.id);
          // update cookies to prune any benefits that have been removed from Airtable
          const validFavouriteBenefits = favouriteBenefits.filter(
            x => existingBenefitIds.indexOf(x) > -1
          );
          req.data.favouriteBenefits = validFavouriteBenefits;
        }

        let startTime = new Date();
        handle(req, res).then(() => {
          let duration = new Date() - startTime;
          let url = req.url;
          Logger.info(
            {
              event: "Page render duration in ms",
              url: url,
              duration: duration
            },
            {
              contentType: "application/json",
              source: "/server.js"
            }
          );
        });
      }
    });

    const port = process.env.PORT || 3000;
    server.listen(port, err => {
      if (err) throw err;
      Logger.debug(`> Ready on http://localhost: ${port}`, {
        source: "/server.js"
      });
      deploy.notify();
    });
  });
});
