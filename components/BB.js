import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import AssignmentTurnedIn from "./icons/AssignmentTurnedIn";
import SaveChecked from "./icons/SaveChecked";
import { connect } from "react-redux";
import {
  getFavouritesUrl,
  getPrintUrl,
  getHomeUrl,
  getSummaryUrl
} from "../selectors/urls";
import { css } from "emotion";
import Container from "../components/container";
import HeaderButton from "./header_button";
import HeaderLink from "./header_link";
import { globalTheme } from "../theme";
import { DisabledCookiesBanner } from "./disabled_cookies_banner";
import { areCookiesDisabled } from "../utils/common";
import BenefitsPane from "./benefits_pane";
import BreadCrumbs from "../components/breadcrumbs";
import ShareBox from "../components/share_box";
import EditIcon from "./icons/Edit";
import Cookies from "universal-cookie";
import Paper from "./paper";
import Header from "./typography/header";
import ContactUs from "./contact_us";
import NextSteps from "./next_steps";

const divider = css`
  border-top: 2px solid ${globalTheme.colour.warmGrey};
  width: 100%;
`;
const outerDiv = css`
  padding-bottom: 16px !important;
`;
const topMatter = css`
  background-color: ${globalTheme.colour.white};
  width: 100%;
`;
const sticky = css`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: ${globalTheme.colour.white};
  z-index: 10;
`;

// if screen size is max.xs or smaller, hide long text
const longText = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    display: none !important;
  }
`;
// if screen size is min.xs or larger, hide short text
const shortText = css`
  @media only screen and (min-width: ${globalTheme.min.xs}) {
    display: none !important;
  }
`;
const alignRight = css`
  text-align: right;
`;

export class BB extends Component {
  state = {
    showDisabledCookieBanner: false
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

  componentDidUpdate() {
    if (this.state.showDisabledCookieBanner && !this.props.cookiesDisabled) {
      this.setState({ showDisabledCookieBanner: false });
    }
  }
  scrollToId(id) {
    window.location = id;
    window.scrollBy(0, -90); // not ideal
  }

  render() {
    const {
      t,
      url,
      store,
      homeUrl,
      summaryUrl,
      favouriteBenefits
    } = this.props; // eslint-disable-line no-unused-vars
    const longFavouritesText = t("favourites.saved_benefits", {
      x: favouriteBenefits.length
    });
    const shortFavouritesText = t("favourites.saved_benefits_mobile", {
      x: favouriteBenefits.length
    });
    const longEditText = t("directory.edit_selections");
    const shortEditText = t("directory.edit_selections_mobile");

    return (
      <Container mobileFullWidth={true}>
        <div className={topMatter}>
          <BreadCrumbs
            t={t}
            breadcrumbs={[]}
            homeUrl={homeUrl}
            pageTitle={t("ge.Find benefits and services")}
          />
        </div>
        <Paper id={this.props.id} className={outerDiv} padding="md">
          <Grid container spacing={32}>
            <Grid item xs={12}>
              <Header headingLevel="h1" size="lg">
                {t("ge.Find benefits and services")}
              </Header>
            </Grid>
            <Grid item xs={12} className={sticky}>
              <Grid container spacing={8}>
                <Grid item xs={6}>
                  <ShareBox
                    t={t}
                    printUrl={this.props.printUrl}
                    url={url}
                    share={true}
                  />
                </Grid>
                <Grid item xs={6} className={alignRight}>
                  <HeaderLink id="editSelections" href={summaryUrl}>
                    <EditIcon />
                    <span className={longText}>{longEditText}</span>
                    <span className={shortText}>{shortEditText}</span>
                  </HeaderLink>
                  <HeaderLink
                    id="savedBenefits"
                    href={this.props.favouritesUrl}
                  >
                    <SaveChecked />
                    <span className={longText}>{longFavouritesText}</span>
                    <span className={shortText}>{shortFavouritesText}</span>
                  </HeaderLink>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div>
                <HeaderButton
                  id="benefits-and-services-button"
                  onClick={() => this.scrollToId("#benefits-and-services")}
                >
                  {"Benefits and services"}
                </HeaderButton>
              </div>
              <div>
                <HeaderButton
                  id="next-steps-button"
                  onClick={() => this.scrollToId("#next-steps")}
                >
                  {t("nextSteps.whats_next")}
                </HeaderButton>
              </div>
              <div>
                <HeaderButton
                  id="contact-button"
                  onClick={() => this.scrollToId("#contact")}
                >
                  {t("nextSteps.contact_us")}
                </HeaderButton>
              </div>
            </Grid>
            <Grid item md={3} sm={4} xs={12}>
              <div id="benefits-and-services">
                <Header headingLevel="h2" size="md_lg">
                  Benefits and services
                </Header>
              </div>
            </Grid>
            <Grid id="mainContent" item md={9} sm={8} xs={12}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  {this.state.showDisabledCookieBanner ? (
                    <DisabledCookiesBanner
                      t={t}
                      onClose={() =>
                        this.setState({ showDisabledCookieBanner: false })
                      }
                    />
                  ) : null}
                </Grid>
              </Grid>
              <BenefitsPane id="BenefitsPane" t={t} store={store} url={url} />
            </Grid>
            <Grid item xs={12}>
              <div className={divider} />
            </Grid>
            <Grid item md={3} sm={4} xs={12}>
              <div id="next-steps">
                <Header headingLevel="h2" size="md_lg">
                  {t("nextSteps.whats_next")}
                </Header>
              </div>
            </Grid>
            <Grid item md={9} sm={8} xs={12}>
              <NextSteps t={t} store={store} />
            </Grid>
            <Grid item xs={12}>
              <div className={divider} />
            </Grid>
            <Grid item md={3} sm={4} xs={12}>
              <div id="contact">
                <Header headingLevel="h2" size="md_lg">
                  {t("nextSteps.contact_us")}
                </Header>
              </div>
            </Grid>
            <Grid item md={9} sm={8} xs={12}>
              <ContactUs t={t} url={url} store={store} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
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
    favouriteBenefits: reduxState.favouriteBenefits,
    favouritesUrl: getFavouritesUrl(reduxState, props),
    homeUrl: getHomeUrl(reduxState, props),
    summaryUrl: getSummaryUrl(reduxState, props),
    printUrl: getPrintUrl(reduxState, props, {})
  };
};

BB.propTypes = {
  url: PropTypes.object.isRequired,
  cookiesDisabled: PropTypes.bool.isRequired,
  setCookiesDisabled: PropTypes.func.isRequired,
  favouritesUrl: PropTypes.string,
  saveFavourites: PropTypes.func.isRequired,
  summaryUrl: PropTypes.string,
  id: PropTypes.string.isRequired,
  printUrl: PropTypes.string,
  homeUrl: PropTypes.string,
  t: PropTypes.func.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BB);
