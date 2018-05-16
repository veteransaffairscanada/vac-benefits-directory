const express = require("express");
const path = require("path");
const next = require("next");

const { parseUserAgent } = require("detect-browser");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const i18nextMiddleware = require("i18next-express-middleware");
const Backend = require("i18next-node-fs-backend");
const { i18nInstance } = require("./i18n");

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
        preload: ["en", "de"], // preload all langages
        ns: ["common", "home", "page2"], // need to preload all the namespaces
        backend: {
          loadPath: path.join(__dirname, "/locales/{{lng}}/{{ns}}.json"),
          addPath: path.join(__dirname, "/locales/{{lng}}/{{ns}}.missing.json")
        }
      },
      () => {
        // loaded translations we can bootstrap our routes
        app.prepare().then(() => {
          const server = express();

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
              parseInt(browser.version) < 11
            ) {
              res.sendFile("fallback-pages/browser-incompatible.html", {
                root: __dirname
              });
            } else {
              handle(req, res);
            }
          });
          const port = process.env.PORT || 3000;
          server.listen(port, err => {
            if (err) throw err;
            console.log("> Ready on http://localhost:" + port);
          });
        });
      }
    );
});
