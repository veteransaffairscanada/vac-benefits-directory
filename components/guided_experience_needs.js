import React, { Component } from "react";
import PropTypes from "prop-types";
import { Checkbox, FormControlLabel, Grid } from "@material-ui/core/";
import { connect } from "react-redux";
import { logEvent } from "../utils/analytics";
import { css } from "react-emotion";

  const root = css`
    padding: 15px 15px 30px 15px !important;
`;
  const needCss = css`
    font-size: 24px;
`;
  const needsList = css`
    list-style: none;
    columns: 2;
    -webkit-columns: 2;
    -moz-columns: 2;
    max-width: 100%;
    padding-left: 0;
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
    const { t, classes } = this.props; // eslint-disable-line no-unused-vars
    return (
      <div className={root}>
        <Grid container spacing={24}>
          <ul className={needsList}>
            {this.props.needs.map(need => (
              <li key={need.id} className={needCss}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.props.selectedNeeds.hasOwnProperty(need.id)}
                      onChange={() => this.handleClick(need.id)}
                      value={need.id}
                      color="primary"
                      id={need.nameEn.replace(/ /g, "-") + "-checkbox"}
                    />
                  }
                  label={
                    t("current-language-code") === "en"
                      ? need.nameEn
                      : need.nameFr
                  }
                  htmlFor={need.nameEn.replace(/ /g, "-") + "-checkbox"}
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
  classes: PropTypes.object.isRequired,
  needs: PropTypes.array.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  setSelectedNeeds: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(GuidedExperienceNeeds);
