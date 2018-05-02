/* eslint-env jest */

/*

- shows right count of benefits

- shows correctly selected benefits

- correct SelectedOptionsCards for benefitTypes and patronTypes

- has all benefits link


 */

import { mount } from "enzyme";
import React from "react";

import A3 from "../../components/A3";
import { benefitsFixture } from "../fixtures/benefits";
import benefitTypesFixture from "../fixtures/benefit_types";
import patronTypesFixture from "../fixtures/patron_types";
import { corporaEnFixture, corporaFrFixture } from "../fixtures/corpora";

jest.mock("react-ga");

describe("A3", () => {
  let props;
  let _mountedA3;

  const mountedA3 = () => {
    if (!_mountedA3) {
      _mountedA3 = mount(<A3 {...props} />);
    }
    return _mountedA3;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      benefitTypes: benefitTypesFixture,
      patronTypes: patronTypesFixture,
      benefits: benefitsFixture,
      corporaEn: corporaEnFixture,
      corporaFr: corporaFrFixture,
      selectedBenefitTypes: [],
      selectedPatronTypes: [],
      switchSection: jest.fn()
    };
    _mountedA3 = undefined;
  });

  it("has a correct countBenefitsString function", () => {
    let A3Instance = mountedA3().instance();
    expect(A3Instance.countBenefitsString([], props.t)).toEqual(
      "A3.At this time there are no benefits that match your selections"
    );
    expect(
      A3Instance.countBenefitsString([benefitsFixture[0]], props.t)
    ).toEqual("A3.Here is a benefit that may apply to you:");
    expect(A3Instance.countBenefitsString(benefitsFixture, props.t)).toEqual(
      "A3.Here are NNN benefits that may apply to you:"
    );
  });

  it("has a correct filterBenefits function", () => {
    const benefitTypeIDs = benefitTypesFixture.map(bt => bt.id);
    const patronTypeIDs = patronTypesFixture.map(pt => pt.id);
    let A3Instance = mountedA3().instance();
    expect(
      A3Instance.filterBenefits(benefitsFixture, benefitTypeIDs, patronTypeIDs)
    ).toEqual(benefitsFixture);
    expect(
      A3Instance.filterBenefits(benefitsFixture, [], patronTypeIDs)
    ).toEqual([]);
    expect(
      A3Instance.filterBenefits(benefitsFixture, benefitTypeIDs, [])
    ).toEqual([]);
    expect(
      A3Instance.filterBenefits(
        benefitsFixture,
        benefitTypeIDs.slice(0, 1),
        patronTypeIDs
      )
    ).toEqual(benefitsFixture.slice(0, 1));
    expect(
      A3Instance.filterBenefits(
        benefitsFixture,
        benefitTypeIDs,
        patronTypeIDs.slice(1, 2)
      )
    ).toEqual(benefitsFixture.slice(1, 2));
  });

  it("has a correct enrichBenefit function", () => {
    let expectedBenefit = Object.assign({}, benefitsFixture[0]);
    expectedBenefit.linkEn = corporaEnFixture[0].full_description_link;
    expectedBenefit.linkFr = corporaFrFixture[0].full_description_link;
    const A3Instance = mountedA3().instance();
    expect(
      A3Instance.enrichBenefit(
        benefitsFixture[0],
        corporaEnFixture,
        corporaFrFixture
      )
    ).toEqual(expectedBenefit);
  });

  it("sets state correctly on mount if preselected benefit types", () => {
    props.selectedBenefitTypes = [benefitTypesFixture[0].id];
    let expectedSelectedBenefitTypes = {};
    expectedSelectedBenefitTypes[benefitTypesFixture[0].id] = true;
    expect(mountedA3().state().selectedBenefitTypes).toEqual(
      expectedSelectedBenefitTypes
    );
  });

  it("toggleButton adds id to state if not already there", () => {
    mountedA3()
      .instance()
      .toggleButton(benefitTypesFixture[0].id);
    let expectedSelectedBenefitTypes = {};
    expectedSelectedBenefitTypes[benefitTypesFixture[0].id] = true;
    expect(mountedA3().state().selectedBenefitTypes).toEqual(
      expectedSelectedBenefitTypes
    );
  });

  it("toggleButton removes id from state if already there", () => {
    let initialSelectedBenefitTypes = {};
    initialSelectedBenefitTypes[benefitTypesFixture[0].id] = true;
    let A3Instance = mountedA3().instance();
    A3Instance.setState({
      selectedBenefitTypes: initialSelectedBenefitTypes
    });
    A3Instance.toggleButton(benefitTypesFixture[0].id);
    expect(A3Instance.state.selectedBenefitTypes).toEqual({});
  });

  it("has benefit type buttons", () => {
    const expectedButtonText = benefitTypesFixture
      .map(b => b.name_fr)
      .concat(["A3.Next"]);
    expect(
      mountedA3()
        .find("SelectButton")
        .map(b => b.text())
    ).toEqual(expectedButtonText);
    expect(
      mountedA3()
        .find("SelectButton")
        .first()
        .prop("onClick")
    ).toEqual(mountedA3().instance().toggleButton);
  });

  it("has benefit type with isDown all false if no benefit types are preselected", () => {
    expect(
      mountedA3()
        .find("SelectButton")
        .map(b => b.prop("isDown"))
    ).toEqual([false, false, false]);
  });

  it("has benefit type with isDown true if a benefit types is preselected", () => {
    props.selectedBenefitTypes = [benefitTypesFixture[1].id];
    expect(
      mountedA3()
        .find("SelectButton")
        .map(b => b.prop("isDown"))
    ).toEqual([false, true, false]);
  });

  it("has a Next button", () => {
    expect(
      mountedA3()
        .find("SelectButton")
        .get(2).props.text
    ).toEqual("A3.Next");
  });

  it("has an All Benefits Link", () => {
    expect(
      mountedA3()
        .find(".AllBenefits")
        .text()
    ).toEqual("Show All Benefits");
  });
});

describe("Page A3", () => {
  it("Benefit count string no benefits", () => {
    const app = mount(
      <App
        i18n={i18nFixture}
        t={tMocked}
        storeHydrated={true}
        benefitTypes={[]}
        patronTypes={[]}
        benefits={[]}
        corporaEn={[]}
        corporaFr={[]}
        selectedBenefitTypes={selectedBenefitTypesFixture}
        selectedPatronTypes={selectedPatronTypesFixture}
      />
    );
    expect(app.find("h1#benefitCountString").text()).toEqual(
      "A3.At this time there are no benefits that match your selections"
    );
  });

  it("Benefit count string 1 benefit", () => {
    const app = mount(
      <App
        i18n={i18nFixture}
        t={tMocked}
        storeHydrated={true}
        benefitTypes={benefitTypesFixture}
        patronTypes={patronTypesFixture}
        benefits={[benefitsFixture[0]]}
        corporaEn={[corporaEnFixture[0]]}
        corporaFr={[corporaFrFixture[0]]}
        selectedBenefitTypes={selectedBenefitTypesFixture}
        selectedPatronTypes={selectedPatronTypesFixture}
      />
    );
    expect(app.find("h1#benefitCountString").text()).toEqual(
      "A3.Here is a benefit that may apply to you:"
    );
  });

  it("Benefit count string 2 benefits", () => {
    const app = mount(
      <App
        i18n={i18nFixture}
        t={tMocked}
        storeHydrated={true}
        benefitTypes={benefitTypesFixture}
        patronTypes={patronTypesFixture}
        benefits={benefitsFixture}
        corporaEn={corporaEnFixture}
        corporaFr={corporaFrFixture}
        selectedBenefitTypes={selectedBenefitTypesFixture}
        selectedPatronTypes={selectedPatronTypesFixture}
      />
    );
    expect(app.find("h1#benefitCountString").text()).toEqual(
      "A3.Here are NNN benefits that may apply to you:"
    );
  });

  it("Selected Options", () => {
    const app = mount(
      <App
        i18n={i18nFixture}
        t={tMocked}
        storeHydrated={true}
        benefitTypes={benefitTypesFixture}
        patronTypes={patronTypesFixture}
        benefits={[]}
        corporaEn={[]}
        corporaFr={[]}
        selectedBenefitTypes={selectedBenefitTypesFixture}
        selectedPatronTypes={selectedPatronTypesFixture}
      />
    );
    const expectedText =
      benefitTypesFixture
        .map(bt => {
          return bt.name_fr;
        })
        .join("") + "Change";
    expect(app.find("SelectedOptionsCard#vacServicesCard").text()).toEqual(
      expectedText
    );
  });

  it("Selected user types", () => {
    const app = mount(
      <App
        i18n={i18nFixture}
        t={tMocked}
        storeHydrated={true}
        benefitTypes={benefitTypesFixture}
        patronTypes={patronTypesFixture}
        benefits={[]}
        corporaEn={[]}
        corporaFr={[]}
        selectedBenefitTypes={selectedBenefitTypesFixture}
        selectedPatronTypes={selectedPatronTypesFixture}
      />
    );
    const expectedText =
      patronTypesFixture
        .map(pt => {
          return pt.name_fr;
        })
        .join("") + "Change";
    expect(app.find("SelectedOptionsCard#userStatusesCard").text()).toEqual(
      expectedText
    );
  });

  it("Show All Benefits Link", () => {
    const app = mount(
      <App
        i18n={i18nFixture}
        t={tMocked}
        storeHydrated={true}
        benefitTypes={benefitTypesFixture}
        patronTypes={patronTypesFixture}
        benefits={[]}
        corporaEn={[]}
        corporaFr={[]}
        selectedBenefitTypes={selectedBenefitTypesFixture}
        selectedPatronTypes={selectedPatronTypesFixture}
      />
    );
    expect(app.find(".AllBenefits").text()).toEqual("Show All Benefits");
  });
});
