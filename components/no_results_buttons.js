import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import Button from "./button";
import { globalTheme } from "../theme";
import Body from "./typography/body";

const buttonBar = css`
  margin-top: 40px;
  text-align: center;
`;
const button = css`
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    margin: 20px;
  }
`;
const orText = css`
  display: inline-block;
  padding: 0 20px;
  margin-bottom: 0;
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    display: none;
  }
`;

const NoResultsButtons = props => {
  return (
    <div className={buttonBar}>
      <Button
        className={button}
        id="reset_filters_button"
        onClick={() => props.clearFilters()}
      >
        {props.t("BenefitsPane.reset_filters")}
      </Button>

      <Body className={orText}>{props.t("BenefitsPane.or")}</Body>

      <Button className={button} id="contact_us_button" secondary>
        {props.t("BenefitsPane.contact_us")}
      </Button>
    </div>
  );
};

NoResultsButtons.propTypes = {
  clearFilters: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default NoResultsButtons;
