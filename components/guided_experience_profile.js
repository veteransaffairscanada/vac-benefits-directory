import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "material-ui";
import SelectButton from "../components/select_button";
import { withStyles } from "material-ui/styles/index";
import Typography from "material-ui/Typography";

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

    return (
      <div style={{ padding: 12 }}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography className={this.props.classes.title}>
              {this.props.title}
            </Typography>
          </Grid>

          {this.props.options.map(option => (
            <Grid key={"pt" + option} item sm={4} xs={12}>
              <SelectButton
                id={option}
                text={t(option)}
                onClick={() => this.props.onClick(option)}
                isDown={this.props.isDown(option)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

GuidedExperienceProfile.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  onClick: PropTypes.func,
  isDown: PropTypes.func,
  classes: PropTypes.object,
  nextSection: PropTypes.string,
  prevSection: PropTypes.string,
  t: PropTypes.func,
  setSection: PropTypes.func,
  stepNumber: PropTypes.number
};

export default withStyles(styles)(GuidedExperienceProfile);
