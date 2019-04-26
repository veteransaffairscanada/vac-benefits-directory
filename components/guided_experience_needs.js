import { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core/";
import NeedButton from "./need_button";
import { connect } from "react-redux";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const root = css`
  padding: 0 15px !important;
`;
const needCss = css`
  font-size: 24px;
  padding-top: 5px;
`;
const needsList = css`
  list-style: none;
  columns: 2;
  -webkit-columns: 2;
  -moz-columns: 2;
  max-width: 100%;
  width: 100%;
  padding-left: 0;
  padding-top: 24px;
  @media (max-width: 599px) {
    columns: 1;
    -webkit-columns: 1;
    -moz-columns: 1;
  }
`;

export class GuidedExperienceNeeds extends Component {
  render() {
    const { t, store, url } = this.props; // eslint-disable-line no-unused-vars
    return (
      <div css={root}>
        <Grid container spacing={24}>
          <ul css={needsList}>
            {this.props.needs.map(need => (
              <li key={need.id} css={needCss}>
                <NeedButton
                  key={need.nameEn.replace(/ /g, "-") + "-checkbox"}
                  need={need}
                  t={t}
                  store={store}
                  url={url}
                />
              </li>
            ))}
          </ul>
        </Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedNeeds: needsObject => {
      dispatch({ type: "SET_SELECTED_NEEDS", data: needsObject });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    needs: reduxState.needs,
    selectedNeeds: reduxState.selectedNeeds
  };
};

GuidedExperienceNeeds.propTypes = {
  needs: PropTypes.array.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  setSelectedNeeds: PropTypes.func.isRequired,
  store: PropTypes.object,
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuidedExperienceNeeds);
