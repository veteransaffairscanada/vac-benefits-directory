"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function() {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function(Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Logger = (function() {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, null, [
    {
      key: "debug",
      value: function debug(msg) {
        var options =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};

        var payload = this.generatePaylod("debug", msg, options);
        console.log(JSON.stringify(payload));
        return payload;
      }
    },
    {
      key: "error",
      value: function error(msg) {
        var options =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};

        var payload = this.generatePaylod("error", msg, options);
        console.error(JSON.stringify(payload));
        return payload;
      }
    },
    {
      key: "info",
      value: function info(msg) {
        var options =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};

        var payload = this.generatePaylod("info", msg, options);
        console.log(JSON.stringify(payload));
        return payload;
      }
    },
    {
      key: "warn",
      value: function warn(msg) {
        var options =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};

        var payload = this.generatePaylod("warn", msg, options);
        console.log(JSON.stringify(payload));
        return payload;
      }
    },
    {
      key: "generatePaylod",
      value: function generatePaylod(level, msg, options) {
        var envDetails = process.env.CIRCLE_SHA1
          ? process.env.CIRCLE_SHA1.substring(0, 7)
          : process.env.NODE_ENV;
        var standardPayload = {
          cloudEventsVersion: "0.1",
          contentType: "text/plain",
          body: msg,
          eventID: envDetails + "-" + Date.now(),
          eventTime: new Date().toISOString(),
          eventType: "com.github.cds-snc.vac-benefits-directory." + level,
          eventTypeVersion: "1.0",
          source: "/"
        };
        return Object.assign(standardPayload, options);
      }
    }
  ]);

  return Logger;
})();

exports.default = Logger;
