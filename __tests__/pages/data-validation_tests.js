/* eslint-env jest */

import { shallow } from "enzyme";
import React from "react";

import { DataValidation } from "../../pages/data-validation";
import benefitsFixture from "../fixtures/benefits";

jest.mock("react-ga");

describe("DataValidation", () => {
  let props;
  let _mountedDataValidation;

  const mountedDataValidation = () => {
    if (!_mountedDataValidation) {
      _mountedDataValidation = shallow(<DataValidation {...props} />);
    }
    return _mountedDataValidation;
  };

  beforeEach(() => {
    props = {
      t: key => key,
      i18n: {},
      benefits: benefitsFixture,
      classes: {}
    };
    _mountedDataValidation = undefined;
  });

  it("mounts successfully", () => {
    expect(mountedDataValidation());
  });
});
