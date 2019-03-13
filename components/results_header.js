import React from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Header from "./typography/header";

const headerPadding = css`
  padding: 0 12px;
  margin-top: 30px;
  margin-bottom: 7px;
`;

const ResultsHeader = props => {
  if (props.searchString.trim() !== "" && props.benefitCount > 0) {
    return (
      <Header className={headerPadding} size="sm_md" headingLevel="h3">
        {props.headerText}
      </Header>
    );
  } else {
    return null;
  }
};

ResultsHeader.propTypes = {
  headerText: PropTypes.string.isRequired,
  searchString: PropTypes.string.isRequired,
  benefitCount: PropTypes.number.isRequired
};

export default ResultsHeader;
