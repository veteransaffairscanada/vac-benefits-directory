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
import Container from "../components/container";
import Body from "../components/body";

const root = css`
  background-color: white;
  margin: 58px 15px 58px 15px;
  padding: 69px 96px 100px 96px;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    padding: 35px 48px 50px 48px;
  }
`;
const arrowCSS = css`
  font-size: 24px;
`;
const bookmarkCSS = css`
  font-size: 24px;
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

const image = css`
  margin: 40px 40px 0 40px;
  width: 100%;
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    display: none;
  }
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
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={false}
        showRefreshCache={false}
        title={t("titles.index")}
      >
        <Container>
          <Paper className={root}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <h1 id="heroTitle" className={title}>
                  {t("index.title")}
                </h1>
              </Grid>
              <Grid item xs={12} md={6} className={columnLeft}>
                <Body>{t("index.ge_prompt")}</Body>
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
                  <ArrowForward className={arrowCSS} />
                </Button>
                <hr className={line} />
                <Body>{t("index.benefits_prompt")}</Body>
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
                  <ArrowForward className={arrowCSS} />
                </Button>
                <hr className={line} />
                <Body>{t("index.favourites_prompt")}</Body>
                <Button
                  id="FavouritesPage"
                  variant="raised"
                  fullWidth
                  color="secondary"
                  size="large"
                  className={button}
                  href={this.props.favouritesUrl}
                >
                  <Bookmark className={bookmarkCSS} />
                  &nbsp;
                  {t("index.your_saved_benefits") +
                    " (" +
                    this.props.favouriteBenefits.length +
                    ")"}
                </Button>
              </Grid>
              <Grid item xs={12} md={6} className={columnRight}>
                <Body>{t("index.search_prompt")}</Body>
                <SearchComponent
                  id="searchComponent"
                  i18n={this.props.i18n}
                  store={this.props.store}
                  t={this.props.t}
                />
                <img
                  src="../static/icon-hand-scrolling-list.svg"
                  alt={t("index.alt_text_1")}
                  className={image}
                />
              </Grid>
            </Grid>
          </Paper>
        </Container>
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
