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
import { connect } from "react-redux";
import { getFavouritesUrl } from "../selectors/urls";
import { globalTheme } from "../theme";
import { css } from "react-emotion";


const root = css`
    background-color: white;
    margin: 58px 15px 58px 15px;
    padding: 69px 96px 100px 96px;
      @media only screen and (max-width: ${globalTheme.max.xs}) {
        padding: 35px 48px 50px 48px;
      }
`;

  const line = css`
    background: #dfdfdf;
    border: none;
    height: 1px;
    margin: 30px 0;
  `;

  const button = css`
    font-size: 24px !important;
    text-transform: none !important;
`;

  const columnLeft = css`
        @media only screen and (min-width: ${globalTheme.min.sm}) {
      padding-right: 50px !important;
    }
  `;

  const columnRight = css`
    @media only screen and (min-width: ${globalTheme.min.sm}) {
      padding-left: 50px !important;
    }
  `;

  const container = css`
    margin: 0 auto;
    max-width: ${globalTheme.maxWidth};
    padding-left: 16px;
    padding-right: 16px;
`;

const image = css`
    margin: 40px 40px 0 40px;
    width: 100%;
      @media only screen and (max-width: ${globalTheme.max.sm}) {
      display: none;
    }
`;

const prompt = css`
    color: #303232;
    font-size: 18px;
    line-height: 1.5;
    margin: 0 0 25px 0;
`;

const title = css`
    color: #434343;
    font-size: 36px;
    margin-bottom: 46px;
`;

export class App extends Component {
  constructor() {
    super();
  }

  render() {
    const { i18n, t } = this.props;
    let urlGE =
      "guided?section=patronTypeQuestion&lng=" + t("current-language-code");
    let urlBD = "benefits-directory?lng=" + t("current-language-code");
    return (
      <Layout i18n={i18n} t={t} hideNoscript={false} showRefreshCache={false}>
        <div className={container}>
          <Paper className={root}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <div id="heroTitle" className={title}>
                  {t("index.title")}
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                className={columnLeft}
              >
                <p className={prompt}>
                  {t("index.ge_prompt")}
                </p>
                <Button
                  id="heroGuidedLink"
                  variant="raised"
                  color="primary"
                  fullWidth
                  size="large"
                  className={button}
                  href={urlGE}
                >
                  {t("index.guided experience")}
                  &nbsp;&nbsp;
                  <ArrowForward style={{ fontSize: "24px" }} />
                </Button>
                <hr className={line} />
                <p className={prompt}>
                  {t("index.benefits_prompt")}
                </p>
                <Button
                  id="heroBenefitsLink"
                  variant="raised"
                  color="secondary"
                  fullWidth
                  size="large"
                  className={button}
                  href={urlBD}
                >
                  {t("index.all benefits")}
                  &nbsp;&nbsp;
                  <ArrowForward style={{ fontSize: "24px" }} />
                </Button>
                <hr className={line} />
                <p className={prompt}>
                  {t("index.favourites_prompt")}
                </p>
                <Button
                  id="FavouritesPage"
                  variant="raised"
                  fullWidth
                  color="secondary"
                  size="large"
                  className={button}
                  href={this.props.favouritesUrl}
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
                className={columnRight}
              >
                <p className={prompt}>
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
                  className={image}
                />
              </Grid>
            </Grid>
          </Paper>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = (reduxState, props) => {
  return {
    favouriteBenefits: reduxState.favouriteBenefits,
    favouritesUrl: getFavouritesUrl(reduxState, props),
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
  favouriteBenefits: PropTypes.array.isRequired,
  favouritesUrl: PropTypes.string,
  i18n: PropTypes.object.isRequired,
  selectedEligibility: PropTypes.object.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  store: PropTypes.object,
  t: PropTypes.func.isRequired
};

export default withI18next()(connect(mapStateToProps)(App));
