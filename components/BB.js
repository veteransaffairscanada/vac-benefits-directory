import React, { Component } from "react";
import ShareModal from "./share_modal";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Print from "./icons/Print";
import ShareIcon from "./icons/share_icon";
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
const topPadding = css`
  padding-top: 30px;
`;
const topMatter = css`
  background-color: ${globalTheme.colour.white};
  width: 100%;
  padding-bottom: 20px;
`;
const anchors = css`
  margin-right: 20px;
`;
const nonMobileStyle = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    display: none;
  }
`;
const right = css`
  text-align: right;
`;
const menuChildRight = css`
  margin-left: 2em;
`;

export class BB extends Component {
  state = {
    showDisabledCookieBanner: false,
    showModal: false
  };

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
      <div
        id={this.props.id}
        className={outerDiv}
        ref={el => (this.componentRef = el)}
      >
        <div className={topMatter}>
          <BreadCrumbs
            t={t}
            breadcrumbs={[]}
            homeUrl={homeUrl}
            pageTitle={t("ge.Find benefits and services")}
          />
          <Container>
            <Grid container spacing={24}>
              <Grid item xs={4}>
                <HeaderLink
                  className={anchors}
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
              <Grid item xs={8} className={right}>
                <HeaderLink
                  href={this.props.printUrl}
                  target="print_page"
                  id="printButton"
                >
                  <Print />{" "}
                  <span className={nonMobileStyle}> {t("Print")} </span>
                </HeaderLink>
                <HeaderButton
                  className={menuChildRight}
                  onClick={() => this.setState({ showModal: true })}
                  id="shareButton"
                >
                  <ShareIcon />
                  <span className={nonMobileStyle}>{t("titles.share")}</span>
                </HeaderButton>
                <ShareModal
                  isOpen={this.state.showModal}
                  onRequestClose={() => this.setState({ showModal: false })}
                  closeModal={() => this.setState({ showModal: false })}
                  url={url}
                  t={t}
                />
              </Grid>
            </Grid>
          </Container>
        </div>
        <Container className={topPadding}>
          <Grid container spacing={32}>
            <Grid item lg={3} md={3} sm={4} xs={12}>
              <ProfileNeedsSelectorMobile t={t} store={store} />
            </Grid>
            <Grid item lg={9} md={9} sm={8} xs={12}>
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
