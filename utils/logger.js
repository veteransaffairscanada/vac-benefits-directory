export default class Logger {
  static debug(msg, options = {}) {
    let payload = this.generatePaylod("debug", msg, options);
    console.log(JSON.stringify(payload));
    return payload;
  }

  static error(msg, options = {}) {
    let payload = this.generatePaylod("error", msg, options);
    console.error(JSON.stringify(payload));
    return payload;
  }

  static info(msg, options = {}) {
    let payload = this.generatePaylod("info", msg, options);
    console.log(JSON.stringify(payload));
    return payload;
  }

  static warn(msg, options = {}) {
    let payload = this.generatePaylod("warn", msg, options);
    console.log(JSON.stringify(payload));
    return payload;
  }

  static generatePaylod(level, msg, options) {
    const envDetails = process.env.CIRCLE_SHA1
      ? process.env.CIRCLE_SHA1.substring(0, 7)
      : process.env.NODE_ENV;
    const standardPayload = {
      cloudEventsVersion: "0.1",
      contentType: "text/plain",
      body: msg,
      eventID: `${envDetails}-${Date.now()}`,
      eventTime: new Date().toISOString(),
      eventType: `com.github.cds-snc.vac-benefits-directory.${level}`,
      eventTypeVersion: "1.0",
      source: "/"
    };
    return Object.assign(standardPayload, options);
  }
}
