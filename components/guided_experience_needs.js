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

export class GuidedExperienceNeeds extends Component {
  handleClick = id => {
    let newSelectedNeeds = this.props.selectedNeeds;
    if (newSelectedNeeds.hasOwnProperty(id)) {
      delete newSelectedNeeds[id];
    } else {
      newSelectedNeeds[id] = id;
    }
    this.props.setSelectedNeeds(Object.keys(newSelectedNeeds));
  };

  render() {
    const { t, classes } = this.props; // eslint-disable-line no-unused-vars

    return (
      <div style={{ padding: 12 }}>
        <Grid container spacing={24}>
          {this.props.needs.map(need => (
            <Grid key={need.id} item sm={4} xs={12}>
              <SelectButton
                id={need.id}
                text={
                  t("current-language-code") === "en"
                    ? need.nameEn
                    : need.nameFr
                }
                onClick={() => this.handleClick(need.id)}
                isDown={this.props.selectedNeeds.hasOwnProperty(need.id)}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    );
  }
}

GuidedExperienceNeeds.propTypes = {
  classes: PropTypes.object,
  needs: PropTypes.array,
  selectedNeeds: PropTypes.object,
  setSelectedNeeds: PropTypes.func,
  t: PropTypes.func
};

export default withStyles(styles)(GuidedExperienceNeeds);
