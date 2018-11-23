import React, { Component } from "react";
import ShareModal from "./share_modal";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Print from "./icons/Print";
import ShareIcon from "./icons/share_icon";
import Bookmark from "./icons/Bookmark";
import ProfileNeedsSelector from "./profile_needs_selector";
import ProfileNeedsSelectorMobile from "./profile_needs_selector_mobile";
import { connect } from "react-redux";
import { getFavouritesUrl, getPrintUrl } from "../selectors/urls";
import { css } from "react-emotion";
import Container from "../components/container";
import HeaderButton from "./header_button";
import { globalTheme } from "../theme";
import { DisabledCookiesBanner } from "./disabled_cookies_banner";
import { areCookiesDisabled } from "../utils/common";
import BenefitsPane from "./benefits_pane";

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
    const { t } = this.props; // eslint-disable-line no-unused-vars

    return (
      <div
        id={this.props.id}
        className={outerDiv}
        ref={el => (this.componentRef = el)}
      >
        <div className={topMatter}>
          <ShareModal
            isOpen={this.state.showModal}
            onRequestClose={() => this.setState({ showModal: false })}
            closeModal={() => this.setState({ showModal: false })}
          />
          <Container className={topPadding}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <HeaderButton
                  useLink
                  className={anchors}
                  id="savedBenefits"
                  href={this.props.favouritesUrl}
                >
                  <Bookmark />
                  {t("B3.favouritesButtonText") +
                    " (" +
                    this.props.favouriteBenefits.length +
                    ")"}
                </HeaderButton>
              </Grid>
              <Grid item xs={6} className={right}>
                <HeaderButton
                  useLink
                  href={this.props.printUrl}
                  target="print_page"
                  id="printButton"
                >
                  <Print />{" "}
                  <span className={nonMobileStyle}> {t("Print")} </span>
                </HeaderButton>
                <HeaderButton
                  onClick={() => this.setState({ showModal: true })}
                  id="shareButton"
                >
                  <ShareIcon className={menuChildRight} />
                  <span className={nonMobileStyle}> Share this Page </span>
                </HeaderButton>
              </Grid>
            </Grid>
          </Container>
        </div>
        <Container className={topPadding}>
          <Grid container spacing={32}>
            <Grid item lg={4} md={4} sm={5} xs={12}>
              <ProfileNeedsSelectorMobile t={t} store={this.props.store} />
              <ProfileNeedsSelector t={t} store={this.props.store} />
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
                store={this.props.store}
                url={this.props.url}
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
  t: PropTypes.func.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BB);
