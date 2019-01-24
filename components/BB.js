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

const outerDiv = css`
  padding-bottom: 16px !important;
`;
const topMatter = css`
  background-color: ${globalTheme.colour.white};
  width: 100%;
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
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
  }
`;

const hideSmall = css`
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    display: none !important;
  }
`;
const hideBig = css`
  @media only screen and (min-width: ${globalTheme.min.sm}) {
    display: none !important;
  }
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
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
  }

  render() {
    const { t, url, store, homeUrl, favouriteBenefits } = this.props; // eslint-disable-line no-unused-vars
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
            <Grid item lg={3} md={3} sm={4} xs={12}>
              <div className={sidebar}>
                <Grid container spacing={16} className={sidebarLinks}>
                  <Grid item xs={4} sm={12}>
                    <HeaderLink
                      id="savedBenefits"
                      href={this.props.favouritesUrl}
                    >
                      <SaveChecked />
                      <span className={hideSmall}>{longFavouritesText}</span>
                      <span className={hideBig}>{shortFavouritesText}</span>
                    </HeaderLink>
                  </Grid>
                  <Grid item xs={4} sm={12}>
                    <HeaderButton
                      id="nextSteps"
                      onClick={() => this.scrollToNextSteps()}
                    >
                      <AssignmentTurnedIn />
                      {t("nextSteps.whats_next")}
                    </HeaderButton>
                  </Grid>
                  <Grid item xs={4} sm={12}>
                    <HeaderLink
                      id="editSelections"
                      href={this.props.summaryUrl}
                    >
                      <EditIcon />
                      <span className={hideSmall}>{longEditText}</span>
                      <span className={hideBig}>{shortEditText}</span>
                    </HeaderLink>
                  </Grid>
                </Grid>
                <ShareBox
                  t={t}
                  printUrl={this.props.printUrl}
                  url={url}
                  share={true}
                />
              </div>
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
    printUrl: getPrintUrl(reduxState, props, {})
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
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BB);
