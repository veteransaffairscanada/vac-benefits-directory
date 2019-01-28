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
const mobileSidebar = css`
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
  }

  componentDidMount() {
    this.props.setCookiesDisabled(areCookiesDisabled());
    this.setState({ showDisabledCookieBanner: areCookiesDisabled() });
  }

  filterBenefits = (benefits, favouriteBenefits) => {
    if (benefits.length === 0) {
      return benefits;
    }
    return benefits.filter(b => favouriteBenefits.indexOf(b.id) > -1);
  };

  scrollToNextSteps() {
    window.location = "#next-steps";
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
        <BreadCrumbs
          t={t}
          homeUrl={homeUrl}
          breadcrumbs={breadcrumbs}
          pageTitle={t("index.your_saved_benefits")}
        />
        <Container id="favourites">
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
              <ShareBox
                className={mobileSidebar}
                t={t}
                printUrl={this.props.printUrl}
                url={url}
                share={false}
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
                  <Body className={topMargin}>{t("B3.check eligibility")}</Body>
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
  url: PropTypes.object.isRequired,
  homeUrl: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites);
