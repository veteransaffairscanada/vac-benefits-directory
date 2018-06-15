import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "material-ui";
import { withStyles } from "material-ui/styles/index";
import Typography from "material-ui/Typography";
import RadioSelector from "./radio_selector";

const styles = () => ({
  subTitle: {
    fontSize: "20px",
    fontWeight: "100",
    paddingBottom: "25px"
  },
  title: {
    fontSize: "36px",
    padding: "15px 0"
  }
});

export class GuidedExperienceProfile extends Component {
  render() {
    const { t } = this.props;

    const filters = this.props.options.map(op => {
      return { id: op, name_en: op };
    });
    return (
      <div style={{ padding: 12 }}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography className={this.props.classes.title}>
              {this.props.title}
            </Typography>
          </Grid>

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
  title: PropTypes.string,
  options: PropTypes.array,
  onClick: PropTypes.func,
  classes: PropTypes.object,
  value: PropTypes.string,
  t: PropTypes.func
};

export default withStyles(styles)(GuidedExperienceProfile);
