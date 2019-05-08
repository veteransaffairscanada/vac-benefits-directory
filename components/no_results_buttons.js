import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Button from "./button";

const buttonBar = css`
  margin-top: 40px;
  text-align: center;
`;

const NoResultsButtons = props => {
  return (
    <div css={buttonBar}>
      <Button id="reset_filters_button" onClick={() => props.clearFilters()}>
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
