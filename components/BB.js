import React, { Component } from "react";
import ShareModal from "./share_modal";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Print from "./icons/Print";
import ShareIcon from "./icons/share_icon";
import AssignmentTurnedIn from "./icons/AssignmentTurnedIn";
import Bookmark from "./icons/Bookmark";
import ProfileNeedsSelectorMobile from "./profile_needs_selector_mobile";
import { connect } from "react-redux";
import { getFavouritesUrl, getPrintUrl, getHomeUrl } from "../selectors/urls";
import { css } from "react-emotion";
import Container from "../components/container";
import HeaderButton from "./header_button";
import HeaderLink from "./header_link";
import { globalTheme } from "../theme";
import { DisabledCookiesBanner } from "./disabled_cookies_banner";
import { areCookiesDisabled } from "../utils/common";
import BenefitsPane from "./benefits_pane";
import BreadCrumbs from "../components/breadcrumbs";

const outerDiv = css`
  padding-bottom: 16px !important;
`;
const topMatter = css`
  background-color: ${globalTheme.colour.white};
  width: 100%;
`;
const nonMobileStyle = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    text-align: right;
  }
`;
const favouritesLink = css`
  padding: 1em 24px !important;
  border-top: thin solid ${globalTheme.colour.paleGreyishBrown};
  border-bottom: thin solid ${globalTheme.colour.paleGreyishBrown};
  margin-bottom: 24px;
`;
const shareBox = css`
  background-color: ${globalTheme.colour.paleGreyishBrown};
  padding: 24px;
  margin-top: 2em;
  button {
    margin-bottom: 1em;
  }
`;

const shareBoxItem = css`
  text-decoration: underline !important;
  color: ${globalTheme.colour.darkGreyBlue};
`;

const topMargin = css``;

export class BB extends Component {
  state = {
    showDisabledCookieBanner: false,
    showModal: false
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

  render() {
    const { t, url, store, homeUrl } = this.props; // eslint-disable-line no-unused-vars
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
            <Grid item lg={4} md={4} sm={5} xs={12}>
              <Grid container spacing={16} className={favouritesLink}>
                <Grid item xs={12}>
                  <HeaderLink
                    id="savedBenefits"
                    href={this.props.favouritesUrl}
                  >
                    <Bookmark />
                    {t("B3.favouritesButtonText") +
                      " (" +
                      this.props.favouriteBenefits.length +
                      ")"}
                  </HeaderLink>
                </Grid>
                <Grid item xs={12}>
                  <HeaderButton
                    id="nextSteps"
                    onClick={() => {
                      window.scrollTo({
                        top: this.nextStepsRef.current.offsetTop,
                        behavior: "smooth"
                      });
                    }}
                  >
                    <AssignmentTurnedIn />
                    {t("nextSteps.whats_next")}
                  </HeaderButton>
                </Grid>
              </Grid>

              <ProfileNeedsSelectorMobile t={t} store={store} />
              <Container className={shareBox}>
                <Grid container spacing={8}>
                  <Grid item lg={12} md={12} sm={12} xs={6}>
                    <HeaderButton
                      className={shareBoxItem}
                      size="small"
                      onClick={() => this.setState({ showModal: true })}
                      id="shareButton"
                    >
                      <ShareIcon />
                      <span>{t("titles.share")}</span>
                    </HeaderButton>
                    <ShareModal
                      isOpen={this.state.showModal}
                      onRequestClose={() => this.setState({ showModal: false })}
                      closeModal={() => this.setState({ showModal: false })}
                      url={url}
                      t={t}
                    />
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={6}>
                    <HeaderLink
                      className={shareBoxItem}
                      size="small"
                      href={this.props.printUrl}
                      target="print_page"
                      id="printButton"
                    >
                      <Print />
                      <span className={nonMobileStyle}>{t("Print")}</span>
                    </HeaderLink>
                  </Grid>
                </Grid>
              </Container>
            </Grid>
            <Grid item lg={8} md={8} sm={7} xs={12}>
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
    printUrl: getPrintUrl(reduxState, props, {})
  };
};

BB.propTypes = {
  url: PropTypes.object.isRequired,
  cookiesDisabled: PropTypes.bool.isRequired,
  setCookiesDisabled: PropTypes.func.isRequired,
  favouritesUrl: PropTypes.string,
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
