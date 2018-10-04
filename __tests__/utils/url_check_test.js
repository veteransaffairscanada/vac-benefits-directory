import { checkURL } from "../../utils/url_check";

describe("checkURL", () => {
  let id, urlCache, data;

  beforeEach(() => {
    id = "foo";
    urlCache = {};
    data = {
      benefits: [
        {
          id: "foo",
          benefitPageEn: "http://xyz",
          benefitPageFr: "http://xyz"
        }
      ]
    };
  });

  it("returns nothing if the id is not in the benefits", done => {
    Promise.resolve(checkURL("bar", urlCache, data)).then(result => {
      expect(result).toEqual(undefined);
      done();
    });
  });

  it("returns pass data for the en and fr URLS", done => {
    Promise.resolve(checkURL(id, urlCache, data)).then(result => {
      expect(result.foo.passEn).toEqual(false);
      expect(result.foo.passFr).toEqual(false);
      done();
    });
  });

  it("returns pass data if there is a cached version and the timestamp is less than the expiry", done => {
    Promise.resolve(
      checkURL(
        id,
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
