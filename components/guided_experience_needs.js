import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core/";
import NeedButton from "./need_button";
import { connect } from "react-redux";
import { logEvent } from "../utils/analytics";
import { css } from "emotion";

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
  padding-left: 0;
  padding-top: 35px;
  @media (max-width: 599px) {
    columns: 1;
    -webkit-columns: 1;
    -moz-columns: 1;
  }
`;

export class GuidedExperienceNeeds extends Component {
  handleClick = id => {
    logEvent("FilterClick", "need", id);
    let newSelectedNeeds = JSON.parse(JSON.stringify(this.props.selectedNeeds));
    if (newSelectedNeeds.hasOwnProperty(id)) {
      delete newSelectedNeeds[id];
    } else {
      newSelectedNeeds[id] = id;
    }
    this.props.setSelectedNeeds(newSelectedNeeds);
  };

  render() {
    const { t, store } = this.props; // eslint-disable-line no-unused-vars
    return (
      <div className={root}>
        <Grid container spacing={24}>
          <ul className={needsList}>
            {this.props.needs.map(need => (
              <li key={need.id} className={needCss}>
                <NeedButton
                  key={need.nameEn.replace(/ /g, "-") + "-checkbox"}
                  need={need}
                  t={t}
                  store={store}
                  scrollOnClick={false}
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
  t: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GuidedExperienceNeeds);
