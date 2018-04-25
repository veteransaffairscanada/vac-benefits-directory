/* eslint-env jest */

import { mount } from "enzyme";
import React from "react";

import { App } from "../../pages/A";
import A1 from "../../components/A1";
import A2 from "../../components/A2";

jest.mock("react-ga");

describe("Page A", () => {
  it("Layout", () => {
    const app = mount(
      <App
        i18n={{ language: "en-US" }}
        t={key => key}
        storeHydrated={true}
        benefitTypes={[]}
        patronTypes={[]}
        benefits={[]}
        corporaEn={[]}
        corporaFr={[]}
      />
    );
    expect(app.find("Layout").length).toEqual(1);
  });

  it("Initially contains A1", () => {
    const app = mount(
      <App
        i18n={{ language: "en-US" }}
        t={key => key}
        storeHydrated={true}
        benefitTypes={[]}
        patronTypes={[]}
        benefits={[]}
        corporaEn={[]}
        corporaFr={[]}
      />
    );
    expect(app.find(A1).length).toEqual(1);
  });

  it("Switch A1 -> A2", () => {
    const app = mount(
      <App
        i18n={{ language: "en-US" }}
        t={key => key}
        storeHydrated={true}
        benefitTypes={[]}
        patronTypes={[]}
        benefits={[]}
        corporaEn={[]}
        corporaFr={[]}
      />
    );
    app.setState({ section: "A2" });
    expect(app.find(A2).length).toEqual(1);
  });
});
