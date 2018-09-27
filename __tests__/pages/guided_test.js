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
import questionsFixture from "../fixtures/questions";
import questionDisplayLogicFixture from "../fixtures/question_display_logic";

const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

jest.mock("react-ga");

describe("Guided", () => {
  let props;
  let _mountedGuided;
  let mockStore, reduxState;

  const mountedGuided = () => {
    if (!_mountedGuided) {
      _mountedGuided = shallow(<Guided {...props} {...reduxState} />);
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
      setPatronType: jest.fn(),
      setSelectedNeeds: jest.fn(),
      setServiceType: jest.fn(),
      setStatusAndVitals: jest.fn(),
      setServiceHealthIssue: jest.fn(),
      favouriteBenefits: []
    };
    _mountedGuided = undefined;
    mockStore = configureStore();
    reduxState = {
      benefits: benefitsFixture,
      examples: examplesFixture,
      eligibilityPaths: eligibilityPathsFixture,
      needs: needsFixture,
      selectedNeeds: {},
      serviceType: "CAF",
      patronType: "family",
      statusAndVitals: "",
      serviceHealthIssue: "",
      option: "",
      questions: questionsFixture,
      questionDisplayLogic: questionDisplayLogicFixture
    };
    props.store = mockStore(reduxState);
    props.reduxState = reduxState;
  });

  it("passes axe tests", async () => {
    let html = mountedGuided().html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("has a correct setURL function", () => {
    Router.replace = jest.fn();
    reduxState.selectedNeeds = { health: "health", financial: "financial" };
    let guidedInstance = mountedGuided().instance();
    const state = {
      section: "statusAndVitals"
    };
    const expectedURL =
      "/guided?section=statusAndVitals&selectedNeeds=health,financial&patronType=family&serviceType=CAF&lng=en";
    guidedInstance.setState(state);
    guidedInstance.setURL(state);
    expect(Router.replace).toBeCalledWith(expectedURL);
  });

  it("componentWillMount sets state correctly from empty url", () => {
    expect(mountedGuided().state().section).toEqual("patronType");
  });

  describe("setSection", () => {
    it("returns correct section when passed as argument", () => {
      [
        "patronType",
        "serviceType",
        "statusAndVitals",
        "serviceHealthIssue",
        "needs"
      ].forEach(section => {
        let guidedInstance = mountedGuided().instance();
        guidedInstance.setSection(section);
        expect(guidedInstance.state.section).toEqual(section);
      });
    });

    describe("patronType section", () => {
      it("sets stepNumber to 0", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("patronType");
        expect(component.props.stepNumber).toEqual(0);
      });

      it("sets nextSection to benefits-directory if patronType is organization", () => {
        reduxState.patronType = "organization";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("patronType");
        expect(component.props.nextSection).toEqual("benefits-directory");
      });

      it("sets nextSection to needs if patronType is empty", () => {
        reduxState.patronType = "";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("patronType");
        expect(component.props.nextSection).toEqual("needs");
      });

      it("sets nextSection to serviceType if patronType is not empty and not organization", () => {
        reduxState.patronType = "foo";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("patronType");
        expect(component.props.nextSection).toEqual("serviceType");
      });

      it("sets prevSection to index", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("patronType");
        expect(component.props.prevSection).toEqual("index");
      });

      it("sets subtitle to GE.patronType", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("patronType");
        expect(component.props.subtitle).toEqual(props.t("GE.patronType"));
      });

      it("sets the selectorType on GuidedExperienceProfile to patronType", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("patronType");
        const mountedComponent = mount(component);
        expect(
          mountedComponent.find("GuidedExperienceProfile").props()[
            "selectorType"
          ]
        ).toEqual("patronType");
      });
    });

    describe("serviceType section", () => {
      it("sets stepNumber to 1", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceType");
        expect(component.props.stepNumber).toEqual(1);
      });

      it("sets nextSection to needs if serviceType is empty", () => {
        reduxState.serviceType = "";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceType");
        expect(component.props.nextSection).toEqual("needs");
      });

      it("sets nextSection to serviceHealthIssue if patronType is service-person and serviceType is WSV (WWII or Korea)", () => {
        reduxState.patronType = "service-person";
        reduxState.serviceType = "WSV (WWII or Korea)";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceType");
        expect(component.props.nextSection).toEqual("serviceHealthIssue");
      });

      it("sets nextSection to needs if serviceType is empty", () => {
        reduxState.serviceType = "";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceType");
        expect(component.props.nextSection).toEqual("needs");
      });

      it("sets nextSection to statusAndVitals if serviceType is not empty", () => {
        reduxState.serviceType = "foo";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceType");
        expect(component.props.nextSection).toEqual("statusAndVitals");
      });

      it("sets prevSection to patronType", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceType");
        expect(component.props.prevSection).toEqual("patronType");
      });

      it("sets subtitle to GE.serviceType", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceType");
        expect(component.props.subtitle).toEqual(props.t("GE.serviceType"));
      });

      it("sets the selectorType on GuidedExperienceProfile to serviceType", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceType");
        const mountedComponent = mount(component);
        expect(
          mountedComponent.find("GuidedExperienceProfile").props()[
            "selectorType"
          ]
        ).toEqual("serviceType");
      });
    });

    describe("statusAndVitals section", () => {
      it("sets stepNumber to 2", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("statusAndVitals");
        expect(component.props.stepNumber).toEqual(2);
      });

      it("sets nextSection to needs if statusAndVitals is empty", () => {
        reduxState.statusAndVitals = "";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("statusAndVitals");
        expect(component.props.nextSection).toEqual("needs");
      });

      it("sets nextSection to serviceHealthIssue if statusAndVitals is not empty", () => {
        reduxState.statusAndVitals = "foo";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("statusAndVitals");
        expect(component.props.nextSection).toEqual("serviceHealthIssue");
      });

      it("sets prevSection to serviceType", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("statusAndVitals");
        expect(component.props.prevSection).toEqual("serviceType");
      });

      it("sets subtitle to GE.statusAndVitals", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("statusAndVitals");
        expect(component.props.subtitle).toEqual(props.t("GE.statusAndVitals"));
      });

      it("sets the selectorType on GuidedExperienceProfile to statusAndVitals", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("statusAndVitals");
        const mountedComponent = mount(component);
        expect(
          mountedComponent.find("GuidedExperienceProfile").props()[
            "selectorType"
          ]
        ).toEqual("statusAndVitals");
      });

      it("removes the deceased option if patronType is service-person", () => {
        reduxState.patronType = "service-person";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("statusAndVitals");
        const mountedComponent = mount(component);
        expect(
          mountedComponent.find("GuidedExperienceProfile").props()["options"]
        ).toEqual(["stillServing"]);
      });

      it("removes the stillServing option if serviceType is WSV (WWII or Korea)", () => {
        reduxState.serviceType = "WSV (WWII or Korea)";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("statusAndVitals");
        const mountedComponent = mount(component);
        expect(
          mountedComponent.find("GuidedExperienceProfile").props()["options"]
        ).toEqual(["deceased"]);
      });
    });

    describe("serviceHealthIssue section", () => {
      it("sets stepNumber to 3", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceHealthIssue");
        expect(component.props.stepNumber).toEqual(3);
      });

      it("sets nextSection to needs", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceHealthIssue");
        expect(component.props.nextSection).toEqual("needs");
      });

      it("sets prevSection to statusAndVitals if serviceType is empty", () => {
        reduxState.serviceType = "";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceHealthIssue");
        expect(component.props.prevSection).toEqual("statusAndVitals");
      });

      it("sets prevSection to serviceType if serviceType is WSV (WWII or Korea)", () => {
        reduxState.serviceType = "WSV (WWII or Korea)";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceHealthIssue");
        expect(component.props.prevSection).toEqual("serviceType");
      });

      it("sets subtitle to health issue question if statusAndVitals is not deceased", () => {
        reduxState.statusAndVitals = "";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceHealthIssue");
        expect(component.props.subtitle).toEqual("health issue question");
      });

      it("sets subtitle to health issue question deceased if statusAndVitals is deceased", () => {
        reduxState.statusAndVitals = "deceased";
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceHealthIssue");
        expect(component.props.subtitle).toEqual(
          "health issue question deceased"
        );
      });

      it("sets the selectorType on GuidedExperienceProfile to serviceHealthIssue", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("serviceHealthIssue");
        const mountedComponent = mount(component);
        expect(
          mountedComponent.find("GuidedExperienceProfile").props()[
            "selectorType"
          ]
        ).toEqual("serviceHealthIssue");
      });
    });

    describe("needs section", () => {
      it("sets stepNumber to 4", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("needs");
        expect(component.props.stepNumber).toEqual(4);
      });

      it("sets nextSection to benefits-directory", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("needs");
        expect(component.props.nextSection).toEqual("benefits-directory");
      });

      it("sets prevSection to previousSectionNeeds", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("needs");
        expect(component.props.prevSection).toEqual("statusAndVitals");
      });

      it("sets subtitle to B3.What do you need help with?", () => {
        const component = shallow(<Guided {...props} {...reduxState} />)
          .instance()
          .setSection("needs");
        expect(component.props.subtitle).toEqual(
          props.t("B3.What do you need help with?")
        );
      });
    });
  });

  describe("setSection", () => {
    it("sets the state in section", () => {
      let guidedInstance = mountedGuided().instance();
      guidedInstance.setSection("statusAndVitals");
      expect(mountedGuided().state("section")).toEqual("statusAndVitals");
      expect(props.setServiceHealthIssue).toBeCalledWith("");
    });

    it("clears redux data for future questions", () => {
      let guidedInstance = mountedGuided().instance();
      guidedInstance.setSection("patronType");
      expect(props.setServiceType).toBeCalledWith("");
      expect(props.setStatusAndVitals).toBeCalledWith("");
      expect(props.setSelectedNeeds).toBeCalledWith({});
    });
  });
});
