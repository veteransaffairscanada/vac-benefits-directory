import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import BenefitList from "./benefit_list";
import { connect } from "react-redux";
import { getPrintUrl, getHomeUrl } from "../selectors/urls";
import SaveChecked from "./icons/SaveUnchecked";
import Link from "next/link";
import { css } from "emotion";
import Container from "./container";
import Header from "./typography/header";
import HeaderButton from "./header_button";
import Body from "./typography/body";
import { DisabledCookiesBanner } from "./disabled_cookies_banner";
import { areCookiesDisabled, mutateUrl } from "../utils/common";
import AssignmentTurnedIn from "./icons/AssignmentTurnedIn";
import { globalTheme } from "../theme";
import BreadCrumbs from "./breadcrumbs";
import ShareBox from "./share_box";
import NextSteps from "./next_steps";
import ContactUs from "./contact_us";
import Cookies from "universal-cookie";
import Paper from "./paper";

const saveCSS = css`
  font-size: 70px !important;
`;
const emptyList = css`
  margin-top: 20px;
  text-align: center;
  word-spacing: normal;
}
`;
const outerDiv = css`
  padding-bottom: 16px !important;
`;

const topMargin = css`
  margin-top: 20px;
`;

const sidebarLinks = css`
  padding: 1em 24px !important;
  border-top: thin solid ${globalTheme.colour.paleGreyishBrown};
  border-bottom: thin solid ${globalTheme.colour.paleGreyishBrown};
  margin-bottom: 24px;
`;
const sidebar = css`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: ${globalTheme.colour.white};
`;
const hideOnMobile = css`
  // if screen size is max.xs or smaller
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    display: none !important;
  }
`;
const showOnMobile = css`
  // if screen size is min.xs or larger
  @media only screen and (min-width: ${globalTheme.min.xs}) {
    display: none !important;
  }
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
    this.nextStepsRef = React.createRef(); // create a ref object
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

  scrollToNextSteps() {
    window.location = "#next-steps";
    const maxMobile = parseFloat(globalTheme.max.xs);
    window.screen.width < maxMobile ? window.scrollBy(0, -90) : null;
  }

  render() {
    const { t, url, homeUrl } = this.props; // eslint-disable-line no-unused-vars

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
      <div className={outerDiv}>
        <Container id="favourites" mobileFullWidth={true}>
          <BreadCrumbs
            t={t}
            homeUrl={homeUrl}
            breadcrumbs={breadcrumbs}
            pageTitle={t("index.your_saved_benefits")}
          />
          <Paper padding="md">
            <Grid container spacing={32}>
              <Grid item lg={3} md={3} sm={4} xs={12} className={sidebar}>
                <div className={sidebar}>
                  <Grid container spacing={16} className={sidebarLinks}>
                    <Grid item xs={12}>
                      <HeaderButton
                        id="nextSteps"
                        onClick={() => this.scrollToNextSteps()}
                      >
                        <AssignmentTurnedIn />
                        {t("nextSteps.whats_next")}
                      </HeaderButton>
                    </Grid>
                  </Grid>
                  <ShareBox
                    className={hideOnMobile}
                    t={t}
                    printUrl={this.props.printUrl}
                    url={url}
                    share={false}
                  />
                </div>
              </Grid>
              <Grid item lg={3} md={3} sm={4} xs={12} className={showOnMobile}>
                <ShareBox
                  t={t}
                  printUrl={this.props.printUrl}
                  url={url}
                  share={true}
                />
              </Grid>
              <Grid item id="mainContent" lg={9} md={9} sm={8} xs={12}>
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
                      className={"BenefitsCounter"}
                      size="lg"
                      headingLevel="h1"
                    >
                      {t("favourites.saved_benefits", {
                        x: filteredBenefits.length
                      })}
                    </Header>
                    <Body className={topMargin}>
                      {t("B3.check eligibility")}
                    </Body>
                  </Grid>
                  <BenefitList
                    t={t}
                    currentLanguage={t("current-language-code")}
                    filteredBenefits={filteredBenefits}
                    showFavourites={true}
                    searchString=""
                    store={this.props.store}
                    favouriteBenefits={this.props.favouriteBenefits}
                  />
                </Grid>
                {filteredBenefits.length == 0 ? (
                  <Body className={emptyList}>
                    <SaveChecked className={saveCSS} />
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
                ) : (
                  ""
                )}
                <Grid item xs={12}>
                  <div ref={this.nextStepsRef}>
                    <Grid container spacing={24}>
                      <NextSteps t={t} store={this.props.store} />
                      <ContactUs
                        t={t}
                        url={this.props.url}
                        store={this.props.store}
                      />
                    </Grid>
                  </div>
                </Grid>
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
