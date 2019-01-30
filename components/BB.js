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
import { getFilteredNextSteps } from "../selectors/benefits";
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

const outerDiv = css`
  padding-bottom: 16px !important;
`;
const topMatter = css`
  background-color: ${globalTheme.colour.white};
  width: 100%;
`;
const sidebarLinks = css`
  // for big screen...
  @media only screen and (min-width: ${globalTheme.min.xs}) {
    padding: 1em 24px !important;
    border-top: thin solid ${globalTheme.colour.paleGreyishBrown};
    border-bottom: thin solid ${globalTheme.colour.paleGreyishBrown};
  }
  margin-bottom: 24px;
`;
const sidebar = css`
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
const savedListLink = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
  }
`;
const editLink = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
  }
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

export class BB extends Component {
  state = {
    showDisabledCookieBanner: false
  };

  constructor(props) {
    super(props);
    this.nextStepsRef = React.createRef(); // create a ref object
  }

  componentDidMount() {
    this.props.setCookiesDisabled(areCookiesDisabled());
    this.setState({ showDisabledCookieBanner: areCookiesDisabled() });
  }

  componentDidUpdate() {
    if (this.state.showDisabledCookieBanner && !this.props.cookiesDisabled) {
      this.setState({ showDisabledCookieBanner: false });
    }
  }
  scrollToNextSteps() {
    window.location = "#next-steps";
    const maxMobile = parseFloat(globalTheme.max.xs);
    window.screen.width < maxMobile ? window.scrollBy(0, -90) : null;
  }

  render() {
    const {
      t,
      url,
      store,
      homeUrl,
      favouriteBenefits,
      filteredNextSteps
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
      <div id={this.props.id} className={outerDiv}>
        <div className={topMatter}>
          <BreadCrumbs
            t={t}
            breadcrumbs={[]}
            homeUrl={homeUrl}
            pageTitle={t("ge.Find benefits and services")}
          />
        </div>
        <Container>
          <Grid container spacing={32}>
            <Grid item lg={3} md={3} sm={4} xs={12} className={sidebar}>
              <div className={sidebar}>
                <Grid container spacing={16} className={sidebarLinks}>
                  <Grid item xs={4} sm={12}>
                    <HeaderLink
                      id="savedBenefits"
                      href={this.props.favouritesUrl}
                      className={savedListLink}
                    >
                      <SaveChecked />
                      <span className={longText}>{longFavouritesText}</span>
                      <span className={shortText}>{shortFavouritesText}</span>
                    </HeaderLink>
                  </Grid>
                  {filteredNextSteps.length > 0 ? (
                    <Grid item xs={4} sm={12}>
                      <HeaderButton
                        id="nextSteps"
                        onClick={() => this.scrollToNextSteps()}
                      >
                        <AssignmentTurnedIn />
                        {t("nextSteps.whats_next")}
                      </HeaderButton>
                    </Grid>
                  ) : null}
                  <Grid item xs={4} sm={12}>
                    <HeaderLink
                      id="editSelections"
                      href={this.props.summaryUrl}
                      className={editLink}
                    >
                      <EditIcon />
                      <span className={longText}>{longEditText}</span>
                      <span className={shortText}>{shortEditText}</span>
                    </HeaderLink>
                  </Grid>
                </Grid>
                <ShareBox
                  className={hideOnMobile}
                  t={t}
                  printUrl={this.props.printUrl}
                  url={url}
                  share={true}
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
            <Grid id="mainContent" item lg={9} md={9} sm={8} xs={12}>
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

              <BenefitsPane
                id="BenefitsPane"
                t={t}
                store={store}
                url={url}
                nextStepsRef={this.nextStepsRef}
              />
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCookiesDisabled: areDisabled => {
      dispatch({ type: "SET_COOKIES_DISABLED", data: areDisabled });
    }
  };
};

const mapStateToProps = (reduxState, props) => {
  return {
    cookiesDisabled: reduxState.cookiesDisabled,
    favouriteBenefits: reduxState.favouriteBenefits,
    favouritesUrl: getFavouritesUrl(reduxState, props),
    homeUrl: getHomeUrl(reduxState, props),
    summaryUrl: getSummaryUrl(reduxState, props),
    printUrl: getPrintUrl(reduxState, props, {}),
    filteredNextSteps: getFilteredNextSteps(reduxState, props)
  };
};

BB.propTypes = {
  url: PropTypes.object.isRequired,
  cookiesDisabled: PropTypes.bool.isRequired,
  setCookiesDisabled: PropTypes.func.isRequired,
  favouritesUrl: PropTypes.string,
  summaryUrl: PropTypes.string,
  id: PropTypes.string.isRequired,
  printUrl: PropTypes.string,
  homeUrl: PropTypes.string,
  t: PropTypes.func.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  store: PropTypes.object,
  filteredNextSteps: PropTypes.array
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BB);
