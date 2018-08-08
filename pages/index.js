import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Bookmark from "@material-ui/icons/Bookmark";
import SearchComponent from "../components/search";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import { Grid } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles/index";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    backgroundColor: "white",
    margin: "58px 15px 58px 15px",
    padding: "69px 96px 100px 96px",
    [theme.breakpoints.down("xs")]: {
      padding: "35px 48px 50px 48px"
    }
  },
  box: {
    padding: "10px"
  },
  break: {
    background: "#dfdfdf",
    border: "none",
    height: "1px",
    margin: "30px 0"
  },
  button: {
    fontSize: "24px",
    textDecoration: "none",
    textTransform: "none"
  },
  columnLeft: {
    [theme.breakpoints.up("md")]: {
      paddingRight: "50px !important"
    }
  },
  columnRight: {
    [theme.breakpoints.up("md")]: {
      paddingLeft: "50px !important"
    }
  },
  container: {
    margin: "0 auto",
    maxWidth: "1200px",
    paddingLeft: "16px",
    paddingRight: "16px"
  },
  image: {
    margin: "40px 40px 0 40px",
    width: "100%"
  },
  prompt: {
    color: "#303232",
    fontSize: "18px",
    lineHeight: "1.5",
    margin: "0 0 25px 0"
  },
  title: {
    color: "#434343",
    fontSize: "36px",
    marginBottom: "46px"
  }
});

export class App extends Component {
  constructor() {
    super();
  }

  getFavouritesURL = () => {
    let href = "/favourites?";
    if (Object.keys(this.props.selectedNeeds).length > 0) {
      href += "&selectedNeeds=" + Object.keys(this.props.selectedNeeds).join();
    }
    ["patronType", "serviceType", "statusAndVitals"].forEach(selection => {
      if (this.props[selection] !== "") {
        href += `&${selection}=${this.props.selectedEligibility[selection]}`;
      }
    });
    href += "&lng=" + this.props.t("current-language-code");
    return href;
  };

  render() {
    const { i18n, t } = this.props;
    let urlGE = "A?section=A1&lng=" + t("current-language-code");
    let urlBD = "benefits-directory?lng=" + t("current-language-code");
    return (
      <Layout i18n={i18n} t={t} hideNoscript={false} showRefreshCache={false}>
        <div className={this.props.classes.container}>
          <Paper className={this.props.classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <div id="heroTitle" className={this.props.classes.title}>
                  {t("index.title")}
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                className={this.props.classes.columnLeft}
              >
                <p className={this.props.classes.prompt}>
                  {t("index.ge_prompt")}
                </p>
                <Button
                  id="heroGuidedLink"
                  variant="raised"
                  color="primary"
                  fullWidth
                  size="large"
                  className={this.props.classes.button}
                  href={urlGE}
                >
                  {t("index.guided experience")}
                  &nbsp;&nbsp;
                  <ArrowForward style={{ fontSize: "24px" }} />
                </Button>
                <hr className={this.props.classes.break} />
                <p className={this.props.classes.prompt}>
                  {t("index.benefits_prompt")}
                </p>
                <Button
                  id="heroBenefitsLink"
                  variant="raised"
                  color="secondary"
                  fullWidth
                  size="large"
                  className={this.props.classes.button}
                  href={urlBD}
                >
                  {t("index.all benefits")}
                  &nbsp;&nbsp;
                  <ArrowForward style={{ fontSize: "24px" }} />
                </Button>
                <hr className={this.props.classes.break} />
                <p className={this.props.classes.prompt}>
                  {t("index.favourites_prompt")}
                </p>
                <Button
                  id="Favourites Page"
                  variant="raised"
                  fullWidth
                  color="secondary"
                  size="large"
                  className={this.props.classes.button}
                  href={this.getFavouritesURL()}
                >
                  <Bookmark style={{ fontSize: "24px" }} />
                  &nbsp;
                  {t("index.your_saved_benefits") +
                    " (" +
                    this.props.favouriteBenefits.length +
                    ")"}
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                className={this.props.classes.columnRight}
              >
                <p className={this.props.classes.prompt}>
                  {t("index.search_prompt")}
                </p>
                <SearchComponent
                  id="searchComponent"
                  i18n={this.props.i18n}
                  store={this.props.store}
                  t={this.props.t}
                />
                <img
                  src="../static/icon-hand-scrolling-list.svg"
                  alt="icon-hand-scrolling-list"
                  className={this.props.classes.image}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    favouriteBenefits: reduxState.favouriteBenefits,
    selectedEligibility: {
      patronType: reduxState.patronType,
      serviceType: reduxState.serviceType,
      statusAndVitals: reduxState.statusAndVitals,
      serviceHealthIssue: reduxState.serviceHealthIssue
    },
    selectedNeeds: reduxState.selectedNeeds
  };
};

App.propTypes = {
  classes: PropTypes.object,
  favouriteBenefits: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  selectedEligibility: PropTypes.object.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  store: PropTypes.object,
  t: PropTypes.func.isRequired
};

export default withI18next()(connect(mapStateToProps)(withStyles(styles)(App)));
