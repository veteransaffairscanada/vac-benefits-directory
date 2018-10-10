/* eslint no-console: 0 */
import Logger from "../../utils/logger";

describe("generatePayload", () => {
  it("creates a payload based on standard options", () => {
    let result = Logger.generatePayload("foo", "bar", {});
    expect(result.cloudEventsVersion).toEqual("0.1");
    expect(result.contentType).toEqual("text/plain");
    expect(result.body).toEqual("bar");
    expect(result.eventID.indexOf("-")).not.toEqual(-1);
    expect(result.eventTime.indexOf("T")).not.toEqual(-1);
    expect(result.eventType).toEqual(
      "com.github.cds-snc.vac-benefits-directory.foo"
    );
    expect(result.eventTypeVersion).toEqual("1.0");
    expect(result.source).toEqual("/");
  });

  it("allows you to override payload options", () => {
    let result = Logger.generatePayload("foo", "bar", { source: "/biz" });
    expect(result.source).toEqual("/biz");
  });
});

describe("debug", () => {
  it("creates a debug level event and sends it to console log", () => {
    console.log = jest.fn();
    let result = Logger.debug("This is a debug message");
    expect(console.log).toBeCalled();
    expect(result.eventType).toEqual(
      "com.github.cds-snc.vac-benefits-directory.debug"
    );
  });

  it("allows you to override the default options", () => {
    console.log = jest.fn();
    let result = Logger.debug("This is a debug message", { source: "/foo" });
    expect(console.log).toBeCalled();
    expect(result.source).toEqual("/foo");
  });
});

describe("error", () => {
  it("creates a error level event and sends it to console log", () => {
    console.error = jest.fn();
    let result = Logger.error("This is an error message");
    expect(console.error).toBeCalled();
    expect(result.eventType).toEqual(
      "com.github.cds-snc.vac-benefits-directory.error"
    );
  });

  it("allows you to override the default options", () => {
    console.error = jest.fn();
    let result = Logger.error("This is an error message", { source: "/foo" });
    expect(console.error).toBeCalled();
    expect(result.source).toEqual("/foo");
  });
});

describe("info", () => {
  it("creates a info level event and sends it to console log", () => {
    console.log = jest.fn();
    let result = Logger.info("This is a info message");
    expect(console.log).toBeCalled();
    expect(result.eventType).toEqual(
      "com.github.cds-snc.vac-benefits-directory.info"
    );
  });

  it("allows you to override the default options", () => {
    console.log = jest.fn();
    let result = Logger.info("This is a info message", { source: "/foo" });
    expect(console.log).toBeCalled();
    expect(result.source).toEqual("/foo");
  });
});

describe("warn", () => {
  it("creates a warn level event and sends it to console log", () => {
    console.log = jest.fn();
    let result = Logger.warn("This is a warn message");
    expect(console.log).toBeCalled();
    expect(result.eventType).toEqual(
      "com.github.cds-snc.vac-benefits-directory.warn"
    );
  });

  it("allows you to override the default options", () => {
    console.log = jest.fn();
    let result = Logger.warn("This is a warn message", { source: "/foo" });
    expect(console.log).toBeCalled();
    expect(result.source).toEqual("/foo");
  });
});
