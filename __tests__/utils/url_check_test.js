import { checkURL } from "../../utils/url_check";

describe("checkURL", () => {
  let payload;
  let urlCache;
  let data;

  beforeEach(() => {
    payload = { id: "foo" };
    urlCache = {};
    data = {
      benefits: [
        {
          id: "foo",
          benefitPageEn: "http://localhost",
          benefitPageFr: "http://localhost"
        }
      ]
    };
  });

  it("returns nothing if the id is not in the benefits", done => {
    Promise.resolve(checkURL({ id: "bar" }, urlCache, data)).then(result => {
      expect(result).toEqual(undefined);
      done();
    });
  });

  it("returns pass data for the en and fr URLS", done => {
    Promise.resolve(checkURL(payload, urlCache, data)).then(result => {
      expect(result.foo.passEn).toEqual(false);
      expect(result.foo.passFr).toEqual(false);
      done();
    });
  });

  it("returns pass data if there is a cached version and the timestamp is less than the expiry", done => {
    Promise.resolve(
      checkURL(
        payload,
        {
          foo: {
            passEn: true,
            passFr: true,
            timestamp: Date.now() + 1000 * 60 * 3
          }
        },
        data
      )
    ).then(result => {
      expect(result.foo.passEn).toEqual(true);
      expect(result.foo.passFr).toEqual(true);
      done();
    });
  });
});
