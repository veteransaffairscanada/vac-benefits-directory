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
    </div>
  );
};

NoResultsButtons.propTypes = {
  clearFilters: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default NoResultsButtons;
