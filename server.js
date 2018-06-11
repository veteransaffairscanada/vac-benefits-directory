const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const next = require("next");

const { parseUserAgent } = require("detect-browser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const i18nextMiddleware = require("i18next-express-middleware");
const Backend = require("i18next-node-fs-backend");
const { i18nInstance } = require("./i18n");

const deploy = require("./utils/deploy_notification");

const airTable = require("./utils/airtable_es2015");

Promise.resolve(airTable.hydrateFromAirtable()).then(data => {
  // init i18next with serverside settings
  // using i18next-express-middleware
  i18nInstance
    .use(Backend)
    .use(i18nextMiddleware.LanguageDetector)
    .init(
      {
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
          server.use(bodyParser.json());
          // enable middleware for i18next
          server.use(i18nextMiddleware.handle(i18nInstance));

          // serve locales for client
          server.use(
            "/locales",
            express.static(path.join(__dirname, "/locales"))
          );

          // missing keys
          server.post(
            "/locales/add/:lng/:ns",
            i18nextMiddleware.missingKeyHandler(i18nInstance)
          );

          // submitting Feedback
          server.post("/submitComment", (req, res) => {
            console.log("Submitting comments");
            airTable.writeFeedback(req.body);
            res.sendStatus(200);
          });

          // use next.js
          server.get("*", (req, res) => {
            // Check if browse is less than IE 11
            const ua = req.headers["user-agent"];
            const browser = parseUserAgent(ua);

            setTimeout(function() {
              Promise.resolve(airTable.hydrateFromAirtable()).then(newData => {
                data = newData;
              });
            }, 1000 * 60 * 60);

            req.data = data;
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
              console.log("Refreshing Cache ...");
              let referrer = req.header("Referer") || "/";
              Promise.resolve(airTable.hydrateFromAirtable()).then(newData => {
                data = newData;
                res.redirect(referrer);
                console.log("Cache refreshed @ " + data.timestamp);
              });
            } else {
              handle(req, res);
            }
          });

          const port = process.env.PORT || 3000;
          server.listen(port, err => {
            if (err) throw err;
            console.log("> Ready on http://localhost:" + port);
            deploy.notify();
          });
        });
      }
    );
});

// this code should run when the data-validation page is loaded and send that page the results
// note that we can't check the urls in the browser because of CO
//
// var checkLinks = async function checklinks(benefits) {
//   var brokenLinks = [];
//   var responseEn, responseFr;
//   for (let benefit of benefits) {
//     responseEn = await fetch(benefit.benefitPageEn);
//     responseFr = await fetch(benefit.benefitPageFr);
//     if (responseEn.status !== 200) {
//       brokenLinks.push(benefit.benefitPageEn);
//     }
//     if (responseFr.status !== 200) {
//       brokenLinks.push(benefit.benefitPageFr);
//     }
//     console.log("type", typeof responseEn.body);
//     if (responseEn.body.indexOf(benefit.benefitPageEn) === -1) {
//       console.log(benefit.benefitPageEn, responseEn, "BAD URL");
//     }
//   }
//   return brokenLinks;
// };
