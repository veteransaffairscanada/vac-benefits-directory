const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const next = require("next");
const Cookies = require("universal-cookie");
const helmet = require("helmet");
const compression = require("compression");

const { parseUserAgent } = require("detect-browser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const i18nextMiddleware = require("i18next-express-middleware");
const Backend = require("i18next-node-fs-backend");
const { i18nInstance } = require("./i18n");

const deploy = require("./utils/deploy_notification");

const airTable = require("./utils/airtable_es2015");

const { getGithubData } = require("./utils/statistics");
const { checkURL } = require("./utils/url_check");

const Logger = require("./utils/logger").default;

const getAllData = async function() {
  const githubData = await getGithubData();
  const airtableData = await airTable.hydrateFromAirtable();
  return { githubData: githubData, airtableData: airtableData };
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
  const githubData = allData.githubData;

  setInterval(function() {
    Promise.resolve(airTable.hydrateFromAirtable()).then(newData => {
      copyValidTables(data, newData);
      Logger.info("Cache refreshed automatically @ " + data.timestamp, {
        source: "/server.js"
      });
    });
  }, 1000 * 60 * 60);

  // init i18next with serverside settings
  // using i18next-express-middleware
  i18nInstance
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init(
      {
        wait: true,
        fallbackLng: "en",
        preload: ["en", "fr"],
        ns: ["common"],
        backend: {
          loadPath: path.join(__dirname, "/locales/{{lng}}/{{ns}}.json"),
          addPath: path.join(__dirname, "/locales/{{lng}}/{{ns}}.missing.json")
        }
      },
      () => {
        // loaded translations we can bootstrap our routes
        app.prepare().then(() => {
          const server = express();
          server.use(compression());
          server.use(bodyParser.json());
          server.use(helmet());
          // enable middleware for i18next
          server.use(i18nextMiddleware.handle(i18nInstance));

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
            Promise.resolve(checkURL(benefitId, urlCache, data)).then(
              newUrls => {
                urlCache = newUrls;
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify(urlCache[benefitId]));
              }
            );
          });

          // use next.js
          server.get("*", (req, res) => {
            // Check if browse is less than IE 11
            const ua = req.headers["user-agent"];
            const browser = parseUserAgent(ua);

            req.data = data;
            if (req.url.includes("stats")) {
              req.githubData = githubData;
            } else {
              req.githubData = {};
            }

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
            } else {
              req.data.favouriteBenefits = new Cookies(req.headers.cookie).get(
                "favouriteBenefits"
              );
              let startTime = new Date();
              handle(req, res).then(() => {
                let duration = new Date() - startTime;
                let url = req.url;
                Logger.info(`Rendered ${url} in ${duration} ms`, {
                  source: "/server.js"
                });
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
      }
    );
});
