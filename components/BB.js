import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import AssignmentTurnedIn from "./icons/AssignmentTurnedIn";
import SaveChecked from "./icons/SaveChecked";
import SelectionsEditor from "./selections_editor";
import { connect } from "react-redux";
import { getFavouritesUrl, getPrintUrl, getHomeUrl } from "../selectors/urls";
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

const outerDiv = css`
  padding-bottom: 16px !important;
`;
const topMatter = css`
  background-color: ${globalTheme.colour.white};
  width: 100%;
`;
const favouritesLink = css`
  padding: 1em 24px !important;
  border-top: thin solid ${globalTheme.colour.paleGreyishBrown};
  border-bottom: thin solid ${globalTheme.colour.paleGreyishBrown};
  margin-bottom: 24px;
`;
const dot = css`
  height: 23px;
  width: 24px;
  padding-top: 1px;
  background-color: ${globalTheme.colour.red2};
  border-radius: 50%;
  display: inline-block;
  text-align: center;
  color: white;
  font-size: 16px;
  margin-top: 2px;
  float: right;
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
            <Grid item lg={3} md={3} sm={4} xs={12}>
              <Grid container spacing={16} className={favouritesLink}>
                <Grid item xs={12}>
                  <HeaderLink
                    id="savedBenefits"
                    href={this.props.favouritesUrl}
                  >
                    <SaveChecked />
                    {t("B3.favouritesButtonText")}
                  </HeaderLink>
                  <span className={dot} id="favouritesDot">
                    {this.props.favouriteBenefits.length}
                  </span>
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
              <SelectionsEditor t={t} store={store} />
              <ShareBox
                t={t}
                printUrl={this.props.printUrl}
                url={url}
                share={true}
              />
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
