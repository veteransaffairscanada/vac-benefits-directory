import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
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
  font-family: ${globalTheme.fontFamilySansSerif};
  font-weight: bold;
  color: ${globalTheme.colour.greyishBrown};
  margin-bottom: 0;
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    display: none;
  }
`;

const NoResultsButtons = props => {
  return (
    <div css={buttonBar}>
      <Button
        css={button}
        id="reset_filters_button"
        onClick={() => props.clearFilters()}
      >
        {props.t("BenefitsPane.reset_filters")}
      </Button>

      <Body styles={orText}>{props.t("BenefitsPane.or")}</Body>

      <Button css={button} id="contact_us_button" secondary>
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
