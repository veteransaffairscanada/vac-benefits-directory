import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import RadioSelector from "./radio_selector";

export class GuidedExperienceProfile extends Component {
  render() {
    const { t } = this.props;

    const filters = this.props.options.map(op => {
      return { id: op, name_en: op };
    });
    return (
      <div style={{ padding: 12 }}>
        <Grid container spacing={24}>
          <RadioSelector
            id="RadioSelector"
            t={t}
            legend={""}
            filters={filters}
            selectedEligibility={{}}
            selectedFilter={this.props.value}
            setUserProfile={id => this.props.onClick(id)}
          />
        </Grid>
      </div>
    );
  }
}

GuidedExperienceProfile.propTypes = {
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

export default GuidedExperienceProfile;
