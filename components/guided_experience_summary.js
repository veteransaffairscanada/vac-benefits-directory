import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { globalTheme } from "../theme";
import { connect } from "react-redux";

import ComponentX from "./component_x";

const outerDiv = css`
  padding: 12px;
`;

const breadcrumbList = css`
  border-bottom: 1px solid ${globalTheme.colour.warmGrey};
  padding-left: 0;
  width: 100%;
`;

export class GuidedExperienceSummary extends Component {
  render() {
    const { reduxState, url, t } = this.props;
    return (
      <div className={outerDiv}>
        <ul className={breadcrumbList}>
          <ComponentX reduxState={reduxState} t={t} url={url} />
        </ul>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

GuidedExperienceSummary.propTypes = {
  reduxState: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(GuidedExperienceSummary);
