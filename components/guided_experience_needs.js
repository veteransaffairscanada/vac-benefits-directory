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
          <Grid item xs={12}>
            <Typography className={classes.title}>
              {t("B3.What do you need help with?")}
            </Typography>
          </Grid>

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

        <Grid
          container
          justify="center"
          spacing={24}
          style={{ marginTop: "3em" }}
        >
          <Grid item sm={4} xs={12}>
            <SelectButton
              text={t("next")}
              onClick={() => this.props.setSection("BB")}
              isDown={false}
            />
          </Grid>
        </Grid>

        <Grid
          container
          justify="center"
          spacing={24}
          style={{ marginTop: "1em" }}
        >
          <Grid item sm={4} xs={12}>
            <p style={{ textAlign: "center", fontSize: "1em" }}>
              <a
                className="AllBenefits"
                href={"all-benefits?lng=" + t("current-language-code")}
                target="_blank"
              >
                {t("Show All Benefits")}
              </a>
            </p>
          </Grid>
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
  setSection: PropTypes.func,
  t: PropTypes.func
};

export default withStyles(styles)(GuidedExperienceNeeds);
