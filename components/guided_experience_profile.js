import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "material-ui";
import SelectButton from "../components/select_button";
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
        <Grid
          container
          justify="center"
          spacing={24}
          style={{ marginTop: "3em" }}
        >
          <Grid item sm={4} xs={12}>
            <SelectButton
              text={t("next")}
              onClick={() => this.props.setSection(this.props.nextSection)}
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

GuidedExperienceProfile.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array,
  onClick: PropTypes.func,
  // isDown: PropTypes.func,
  classes: PropTypes.object,
  nextSection: PropTypes.string,
  t: PropTypes.func,
  setSection: PropTypes.func,
  value: PropTypes.string
};

export default withStyles(styles)(GuidedExperienceProfile);
