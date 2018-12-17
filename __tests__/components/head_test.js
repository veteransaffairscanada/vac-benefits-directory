import Head from "../../components/head";
import { mount } from "enzyme";

describe("Head", () => {
  // Setup

  let props;
  let _mountedHead;
  const mountedHead = () => {
    if (!_mountedHead) {
      _mountedHead = mount(<Head {...props} />);
    }
    return _mountedHead;
  };

  beforeEach(() => {
    window.GA_INITIALIZED = true;

    props = {
      t: key => key
    };
    _mountedHead = undefined;
  });

  // Tests

  // TODO test with a page maybe? https://github.com/zeit/next.js/issues/556
  /*
  it("has default title", () => {

    console.log(mountedHead().html())

    expect(
      mountedHead()
        .find("#title")
        .at(0)
        .text()
    ).toEqual("title");
  })

  it("has default description", () => {
    expect(mountedHead()
      .find('[name="description"]')
      .at(0)
      .text()
    ).toEqual("description");
  });

  describe("with title and description set", () => {
    beforeEach(() => {
      props.title = "test title"
      props.description = "test description"
    })

    it("has correct title and description", () => {
      expect(
        mountedHead()
          .find("#title")
          .at(0)
          .text()
      ).toEqual("test title");

      expect(mountedHead()
        .find('[name="description"]')
        .at(0)
        .text()
      ).toEqual("test description");
    })
  });
*/
  it("logPageView called", () => {
    let analytics = require("../../utils/analytics");
    analytics.logPageView = jest.fn();
    mountedHead();
    expect(analytics.logPageView).toBeCalled();
  });
});
