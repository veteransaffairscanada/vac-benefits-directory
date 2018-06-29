import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import RadioSelector from "./radio_selector";

export class GuidedExperienceProfile extends Component {
  render() {
    const { t } = this.props;
    return (
      <div style={{ padding: 12 }}>
        <Grid container spacing={24}>
          <RadioSelector
            id={"RadioSelector" + this.props.selectorType}
            t={t}
            legend={""}
            selectorType={this.props.selectorType}
            store={this.props.store}
          />
        </Grid>
      </div>
    );
  }
}

GuidedExperienceProfile.propTypes = {
  t: PropTypes.func.isRequired,
  selectorType: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default GuidedExperienceProfile;
