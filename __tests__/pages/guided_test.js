/* eslint-env jest */

import { mount, shallow } from "enzyme";
import Router from "next/router";

import React from "react";
import { Guided } from "../../pages/guided";
import benefitsFixture from "../fixtures/benefits";
import translate from "../fixtures/translate";
import elegibilityPathsFixture from "../fixtures/eligibilityPaths";
import needsFixture from "../fixtures/needs";
import configureStore from "redux-mock-store";
import examplesFixture from "../fixtures/examples";
import eligibilityPathsFixture from "../fixtures/eligibilityPaths";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Guided", () => {
  let props;
  let _mountedGuided;
  let mockStore, reduxData;

  const mountedGuided = () => {
    if (!_mountedGuided) {
      _mountedGuided = shallow(<Guided {...props} {...reduxData} />);
    }
    return _mountedGuided;
  };

  beforeEach(() => {
    props = {
      translations: [],
      url: {
        query: {}
      },
      i18n: {
        addResourceBundle: jest.fn()
      },
      t: translate,
      storeHydrated: true,
      dispatch: jest.fn(),
      benefits: benefitsFixture,
      eligibilityPaths: elegibilityPathsFixture,
      needs: needsFixture,
      examples: [],
      saveQuestionResponse: jest.fn(),
      setSelectedNeeds: jest.fn(),
      favouriteBenefits: []
    };
    _mountedGuided = undefined;
    mockStore = configureStore();
    reduxData = {
      benefits: benefitsFixture,
      examples: examplesFixture,
      eligibilityPaths: eligibilityPathsFixture,
      needs: needsFixture,
      selectedNeeds: {},
      serviceType: "CAF",
      patronType: "family",
      statusAndVitals: "",
      serviceHealthIssue: "",
      option: ""
    };
    props.store = mockStore(reduxData);
  });

  it("passes axe tests", async () => {
    let html = mountedGuided().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a correct setURL function", () => {
    Router.replace = jest.fn();
    reduxData.selectedNeeds = { health: "health", financial: "financial" };
    let guidedInstance = mountedGuided().instance();
    const state = {
      section: "S"
    };
    const expectedURL =
      "/guided?section=S&selectedNeeds=health,financial&patronType=family&serviceType=CAF&lng=en";
    guidedInstance.setState(state);
    guidedInstance.setURL(state);
    expect(Router.replace).toBeCalledWith(expectedURL);
  });

  it("componentWillMount sets state correctly from empty url", () => {
    expect(mountedGuided().state().section).toEqual("patronTypeQuestion");
  });

  describe("sectionToDisplay", () => {
    it("returns correct section when passed as argument", () => {
      [
        "patronTypeQuestion",
        "serviceTypeQuestion",
        "statusAndVitalsQuestion",
        "serviceHealthIssueQuestion",
        "needsQuestion"
      ].forEach(section => {
        let guidedInstance = mountedGuided().instance();
        expect(guidedInstance.sectionToDisplay(section).props.id).toEqual(
          section
        );
      });
    });

    it("sets previousSectionNeedsQuestion to patronTypeQuestion if patronType is blank", () => {
      reduxData.patronType = "";
      const component = shallow(<Guided {...props} {...reduxData} />)
        .instance()
        .sectionToDisplay("needsQuestion");
      expect(component.props.prevSection).toEqual("patronTypeQuestion");
    });

    it("sets previousSectionNeedsQuestion to serviceTypeQuestion if serviceType is blank", () => {
      reduxData.serviceType = "";
      const component = shallow(<Guided {...props} {...reduxData} />)
        .instance()
        .sectionToDisplay("needsQuestion");
      expect(component.props.prevSection).toEqual("serviceTypeQuestion");
    });

    describe("patronTypeQuestion section", () => {
      it("sets stepNumber to 0", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("patronTypeQuestion");
        expect(component.props.stepNumber).toEqual(0);
      });

      it("sets nextSection to benefits-directory if patronType is organization", () => {
        reduxData.patronType = "organization";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("patronTypeQuestion");
        expect(component.props.nextSection).toEqual("benefits-directory");
      });

      it("sets nextSection to needsQuestion if patronType is empty", () => {
        reduxData.patronType = "";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("patronTypeQuestion");
        expect(component.props.nextSection).toEqual("needsQuestion");
      });

      it("sets nextSection to serviceTypeQuestion if patronType is not empty and not organization", () => {
        reduxData.patronType = "foo";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("patronTypeQuestion");
        expect(component.props.nextSection).toEqual("serviceTypeQuestion");
      });

      it("sets prevSection to index", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("patronTypeQuestion");
        expect(component.props.prevSection).toEqual("index");
      });

      it("sets subtitle to GE.patronType", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("patronTypeQuestion");
        expect(component.props.subtitle).toEqual(props.t("GE.patronType"));
      });

      it("sets the selectorType on GuidedExperienceProfile to patronType", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("patronTypeQuestion");
        const mountedComponent = mount(component);
        expect(
          mountedComponent.find("GuidedExperienceProfile").props()[
            "selectorType"
          ]
        ).toEqual("patronType");
      });
    });

    describe("serviceTypeQuestion section", () => {
      it("sets stepNumber to 1", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceTypeQuestion");
        expect(component.props.stepNumber).toEqual(1);
      });

      it("sets nextSection to needsQuestion if serviceType is empty", () => {
        reduxData.serviceType = "";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceTypeQuestion");
        expect(component.props.nextSection).toEqual("needsQuestion");
      });

      it("sets nextSection to serviceHealthIssueQuestion if patronType is service-person and serviceType is WSV (WWII or Korea)", () => {
        reduxData.patronType = "service-person";
        reduxData.serviceType = "WSV (WWII or Korea)";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceTypeQuestion");
        expect(component.props.nextSection).toEqual(
          "serviceHealthIssueQuestion"
        );
      });

      it("sets nextSection to needsQuestion if serviceType is empty", () => {
        reduxData.serviceType = "";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceTypeQuestion");
        expect(component.props.nextSection).toEqual("needsQuestion");
      });

      it("sets nextSection to statusAndVitalsQuestion if serviceType is not empty", () => {
        reduxData.serviceType = "foo";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceTypeQuestion");
        expect(component.props.nextSection).toEqual("statusAndVitalsQuestion");
      });

      it("sets prevSection to patronTypeQuestion", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceTypeQuestion");
        expect(component.props.prevSection).toEqual("patronTypeQuestion");
      });

      it("sets subtitle to GE.serviceType", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceTypeQuestion");
        expect(component.props.subtitle).toEqual(props.t("GE.serviceType"));
      });

      it("sets the selectorType on GuidedExperienceProfile to serviceType", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceTypeQuestion");
        const mountedComponent = mount(component);
        expect(
          mountedComponent.find("GuidedExperienceProfile").props()[
            "selectorType"
          ]
        ).toEqual("serviceType");
      });
    });

    describe("statusAndVitalsQuestion section", () => {
      it("sets stepNumber to 2", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("statusAndVitalsQuestion");
        expect(component.props.stepNumber).toEqual(2);
      });

      it("sets nextSection to needsQuestion if statusAndVitals is empty", () => {
        reduxData.statusAndVitals = "";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("statusAndVitalsQuestion");
        expect(component.props.nextSection).toEqual("needsQuestion");
      });

      it("sets nextSection to serviceHealthIssueQuestion if statusAndVitals is not empty", () => {
        reduxData.statusAndVitals = "foo";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("statusAndVitalsQuestion");
        expect(component.props.nextSection).toEqual(
          "serviceHealthIssueQuestion"
        );
      });

      it("sets prevSection to serviceTypeQuestion", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("statusAndVitalsQuestion");
        expect(component.props.prevSection).toEqual("serviceTypeQuestion");
      });

      it("sets subtitle to GE.statusAndVitals", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("statusAndVitalsQuestion");
        expect(component.props.subtitle).toEqual(props.t("GE.statusAndVitals"));
      });

      it("sets the selectorType on GuidedExperienceProfile to statusAndVitals", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("statusAndVitalsQuestion");
        const mountedComponent = mount(component);
        expect(
          mountedComponent.find("GuidedExperienceProfile").props()[
            "selectorType"
          ]
        ).toEqual("statusAndVitals");
      });

      it("removes the deceased option if patronType is service-person", () => {
        reduxData.patronType = "service-person";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("statusAndVitalsQuestion");
        const mountedComponent = mount(component);
        expect(
          mountedComponent.find("GuidedExperienceProfile").props()["options"]
        ).toEqual(["stillServing"]);
      });

      it("removes the stillServing option if serviceType is WSV (WWII or Korea)", () => {
        reduxData.serviceType = "WSV (WWII or Korea)";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("statusAndVitalsQuestion");
        const mountedComponent = mount(component);
        expect(
          mountedComponent.find("GuidedExperienceProfile").props()["options"]
        ).toEqual(["deceased"]);
      });
    });

    describe("serviceHealthIssueQuestion section", () => {
      it("sets stepNumber to 3", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceHealthIssueQuestion");
        expect(component.props.stepNumber).toEqual(3);
      });

      it("sets nextSection to needsQuestion", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceHealthIssueQuestion");
        expect(component.props.nextSection).toEqual("needsQuestion");
      });

      it("sets prevSection to statusAndVitalsQuestion if serviceType is empty", () => {
        reduxData.serviceType = "";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceHealthIssueQuestion");
        expect(component.props.prevSection).toEqual("statusAndVitalsQuestion");
      });

      it("sets prevSection to serviceTypeQuestion if serviceType is WSV (WWII or Korea)", () => {
        reduxData.serviceType = "WSV (WWII or Korea)";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceHealthIssueQuestion");
        expect(component.props.prevSection).toEqual("serviceTypeQuestion");
      });

      it("sets subtitle to health issue question if statusAndVitals is not deceased", () => {
        reduxData.statusAndVitals = "";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceHealthIssueQuestion");
        expect(component.props.subtitle).toEqual("health issue question");
      });

      it("sets subtitle to health issue question deceased if statusAndVitals is deceased", () => {
        reduxData.statusAndVitals = "deceased";
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceHealthIssueQuestion");
        expect(component.props.subtitle).toEqual(
          "health issue question deceased"
        );
      });

      it("sets the selectorType on GuidedExperienceProfile to serviceHealthIssue", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("serviceHealthIssueQuestion");
        const mountedComponent = mount(component);
        expect(
          mountedComponent.find("GuidedExperienceProfile").props()[
            "selectorType"
          ]
        ).toEqual("serviceHealthIssue");
      });
    });

    describe("needsQuestion section", () => {
      it("sets stepNumber to 4", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("needsQuestion");
        expect(component.props.stepNumber).toEqual(4);
      });

      it("sets nextSection to benefits-directory", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("needsQuestion");
        expect(component.props.nextSection).toEqual("benefits-directory");
      });

      it("sets prevSection to previousSectionNeedsQuestion", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("needsQuestion");
        expect(component.props.prevSection).toEqual("statusAndVitalsQuestion");
      });

      it("sets subtitle to B3.What do you need help with?", () => {
        const component = shallow(<Guided {...props} {...reduxData} />)
          .instance()
          .sectionToDisplay("needsQuestion");
        expect(component.props.subtitle).toEqual(
          props.t("B3.What do you need help with?")
        );
      });
    });
  });

  describe("setSection", () => {
    it("sets the state in section", () => {
      let guidedInstance = mountedGuided().instance();
      guidedInstance.setSection("AA");
      expect(mountedGuided().state("section")).toEqual("AA");
      expect(props.saveQuestionResponse).toBeCalledWith("patronType", "");
    });

    it("clears redux data for future questions", () => {
      let guidedInstance = mountedGuided().instance();
      guidedInstance.setSection("patronTypeQuestion");
      expect(props.saveQuestionResponse).toBeCalledWith("serviceType", "");
      expect(props.saveQuestionResponse).toBeCalledWith("statusAndVitals", "");
      expect(props.setSelectedNeeds).toBeCalledWith({});
    });
  });
});
