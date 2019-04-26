import { Component } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../theme";
import { showQuestion } from "../utils/common";
import { connect } from "react-redux";
import SummaryRow from "./summary_row";

const breadcrumbList = css`
  border-bottom: 1px solid ${globalTheme.colour.warmGrey};
  padding-left: 0;
  width: 100%;
`;

export class GuidedExperienceSummary extends Component {
  render() {
    const { url, t, reduxState, store } = this.props;
    return (
      <div>
        <ul css={breadcrumbList}>
          {reduxState.questions
            .map(x => x.variable_name)
            .filter((x, i) => showQuestion(x, i, reduxState))
            .map((k, i) => {
              return (
                <SummaryRow
                  questionName={k}
                  key={i}
                  url={url}
                  t={t}
                  store={store}
                />
              );
            })}
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
