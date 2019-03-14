import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import BenefitList from "./benefit_list";
import { connect } from "react-redux";
import { getPrintUrl, getHomeUrl } from "../selectors/urls";
import Link from "next/link";
import { css } from "emotion";
import Container from "./container";
import Header from "./typography/header";
import Body from "./typography/body";
import { DisabledCookiesBanner } from "./disabled_cookies_banner";
import { areCookiesDisabled, mutateUrl } from "../utils/common";
import { globalTheme } from "../theme";
import BreadCrumbs from "./breadcrumbs";
import NextSteps from "./next_steps";
import Cookies from "universal-cookie";
import Paper from "./paper";
import StickyHeader from "./sticky_header";
import QuickLinks from "./quick_links";
import AlphaBanner from "./alpha_banner";

const divider = css`
  border-top: 2px solid ${globalTheme.colour.duckEggBlue};
  width: 100%;
`;
const innerDiv = css`
  padding-top: 24px;
`;
const headerPadding = css`
  margin-top: 7px;
  margin-bottom: 25px;
`;
export class Favourites extends Component {
  state = {
    enIdx: null,
    frIdx: null,
    showDisabledCookieBanner: false,
    showModal: false
  };

  constructor(props) {
    super(props);
    this.cookies = new Cookies();
  }

  componentDidMount() {
    this.props.setCookiesDisabled(areCookiesDisabled());
    this.setState({ showDisabledCookieBanner: areCookiesDisabled() });

    // Update cookies if favourite benefits have been pruned on the server
    let favouritesFromCookies = this.cookies.get("favouriteBenefits"),
      favouriteBenefits = this.props.favouriteBenefits;

    if (favouritesFromCookies && favouritesFromCookies.length > 0) {
      const invalidBenefits = favouritesFromCookies.filter(
        b => favouriteBenefits.indexOf(b) === -1
      );
      if (invalidBenefits.length > 0) {
        this.cookies.set("favouriteBenefits", favouriteBenefits, { path: "/" });
        this.props.saveFavourites(favouriteBenefits);
      }
    }
  }

  filterBenefits = (benefits, favouriteBenefits) => {
    if (benefits.length === 0) {
      return benefits;
    }
    return benefits.filter(b => favouriteBenefits.indexOf(b.id) > -1);
  };

  render() {
    const { t, url, printUrl, homeUrl, store } = this.props; // eslint-disable-line no-unused-vars

    const filteredBenefits = this.filterBenefits(
      this.props.benefits,
      this.props.favouriteBenefits
    );

    const breadcrumbs = [
      {
        url: mutateUrl(url, "/benefits-directory"),
        name: t("ge.Find benefits and services")
      }
    ];

    return (
      <div>
        <Container id="favourites">
          <BreadCrumbs
            t={t}
            homeUrl={homeUrl}
            breadcrumbs={breadcrumbs}
            pageTitle={t("index.your_saved_benefits")}
          />
          <Paper padding="md" className={innerDiv}>
            <AlphaBanner t={t} url={url} />
            <Grid container spacing={32}>
              <Grid item xs={12}>
                <Header
                  className={"BenefitsCounter"}
                  size="xl"
                  headingLevel="h1"
                >
                  {t("titles.saved_list")}
                </Header>
              </Grid>
              <StickyHeader
                t={t}
                printUrl={printUrl}
                url={url}
                store={store}
                showShareLink={false}
              />
              <Grid item xs={12}>
                <QuickLinks t={t} onFavourites={true} />
              </Grid>
              <Grid item md={4} xs={12}>
                <div id="saved-list">
                  <Header headingLevel="h2" size="md_lg">
                    {t("titles.saved_list")}
                  </Header>
                </div>
              </Grid>
              <Grid id="mainContent" item md={8} xs={12}>
                <Grid container spacing={24}>
                  {this.state.showDisabledCookieBanner ? (
                    <Grid item xs={12}>
                      <DisabledCookiesBanner
                        t={t}
                        onClose={() =>
                          this.setState({ showDisabledCookieBanner: false })
                        }
                      />
                    </Grid>
                  ) : null}
                  <Grid item xs={12}>
                    <Header
                      className={headerPadding}
                      size="md"
                      headingLevel="h3"
                    >
                      {filteredBenefits.length === 1
                        ? t("titles.1_saved_benefit")
                        : t("titles.x_saved_benefits", {
                            x: filteredBenefits.length
                          })}
                    </Header>
                  </Grid>

                  <BenefitList
                    t={t}
                    currentLanguage={t("current-language-code")}
                    filteredBenefits={filteredBenefits}
                    savedList={false}
                    searchString=""
                    store={store}
                    favouriteBenefits={this.props.favouriteBenefits}
                  />
                </Grid>
                {filteredBenefits.length == 0 ? (
                  <Body>
                    <br />
                    {t("favourites.help_msg_line1")}
                    <br />
                    <Link href={mutateUrl(url, "/benefits-directory")}>
                      <a>{t("favourites.help_url_text")}</a>
                    </Link>
                    {" " + t("favourites.help_msg_line_connect") + " "}
                    <strong>{t("favourites.help_msg_emphasis") + " "}</strong>
                    {t("favourites.help_msg_last")}
                  </Body>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <div className={divider} />
              </Grid>
              <Grid item md={4} xs={12}>
                <div id="next-steps">
                  <Header headingLevel="h2" size="md_lg">
                    {t("nextSteps.whats_next")}
                  </Header>
                </div>
              </Grid>
              <Grid item md={8} xs={12}>
                <NextSteps t={t} store={store} />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCookiesDisabled: areDisabled => {
      dispatch({ type: "SET_COOKIES_DISABLED", data: areDisabled });
    },
    saveFavourites: favouriteBenefits => {
      dispatch({
        type: "LOAD_DATA",
        data: { favouriteBenefits: favouriteBenefits }
      });
    }
  };
};

const mapStateToProps = (reduxState, props) => {
  return {
    cookiesDisabled: reduxState.cookiesDisabled,
    benefits: reduxState.benefits,
    printUrl: getPrintUrl(reduxState, props, { fromFavourites: true }),
    homeUrl: getHomeUrl(reduxState, props)
  };
};

Favourites.propTypes = {
  cookiesDisabled: PropTypes.bool.isRequired,
  setCookiesDisabled: PropTypes.func.isRequired,
  benefits: PropTypes.array.isRequired,
  printUrl: PropTypes.string,
  t: PropTypes.func.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  saveFavourites: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  homeUrl: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites);
