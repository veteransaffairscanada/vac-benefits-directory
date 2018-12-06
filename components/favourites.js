import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import BenefitList from "./benefit_list";
import { connect } from "react-redux";
import { getPrintUrl, getHomeUrl } from "../selectors/urls";
import Bookmark from "./icons/BookmarkBorder";
import Print from "./icons/Print";
import Link from "next/link";
import { css } from "react-emotion";
import Container from "./container";
import Header from "./typography/header";
import HeaderLink from "./header_link";
import AnchorLink from "./typography/anchor_link";
import Body from "./typography/body";
import Paper from "./paper";
import { DisabledCookiesBanner } from "./disabled_cookies_banner";
import { areCookiesDisabled, getLink, mutateUrl } from "../utils/common";
import { globalTheme } from "../theme";
import BreadCrumbs from "./breadcrumbs";

const contactUs = css`
  @media only screen and (min-width: ${globalTheme.min.sm}) {
    margin-left: 11px !important;
  }
`;
const bookmarkCSS = css`
  font-size: 70px !important;
`;
const contactUsTitle = css`
  margin: 20px 0;
`;
const right = css`
  text-align: right;
`;
const emptyList = css`
  margin-top: 20px;
  text-align: center;
  word-spacing: normal;
}
`;
const topMatter = css`
  margin-bottom: 25px !important;
`;
const noBottomMargin = css`
  margin-bottom: 0px;
`;
const outerDiv = css`
  padding-bottom: 16px !important;
`;
const whiteBanner = css`
  background-color: #fff;
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 30px;
`;
export class Favourites extends Component {
  state = {
    enIdx: null,
    frIdx: null,
    showDisabledCookieBanner: false,
    showModal: false
  };

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
        <div className={whiteBanner}>
          <Container>
            <Grid container spacing={24}>
              <Grid item xs={12} className={right}>
                <HeaderLink
                  href={this.props.printUrl}
                  target="print_page"
                  id="printButton"
                >
                  <Print /> {t("Print")}
                </HeaderLink>
              </Grid>
            </Grid>
          </Container>
        </div>

        <Container id="favourites">
          <Grid container spacing={24}>
            <Grid item xs={12} className={topMatter}>
              <Header className={"BenefitsCounter"} size="xl" headingLevel="h1">
                {t("favourites.saved_benefits", {
                  x: filteredBenefits.length
                })}
              </Header>
            </Grid>
            <Grid item md={8} xs={12}>
              {this.state.showDisabledCookieBanner ? (
                <DisabledCookiesBanner
                  t={t}
                  onClose={() =>
                    this.setState({ showDisabledCookieBanner: false })
                  }
                />
              ) : null}

              <Grid container spacing={24}>
                <BenefitList
                  t={t}
                  filteredBenefits={filteredBenefits}
                  showFavourites={true}
                  searchString=""
                  store={this.props.store}
                  favouriteBenefits={this.props.favouriteBenefits}
                />
              </Grid>
              {filteredBenefits.length == 0 ? (
                <Body className={emptyList}>
                  <Bookmark className={bookmarkCSS} />
                  <br />
                  {t("favourites.help_msg_line1")}
                  <br />
                  <Link href={t("favourites.help_url")}>
                    <a>{t("favourites.help_url_text")}</a>
                  </Link>
                  {" " + t("favourites.help_msg_line_connect") + " "}
                  <strong>{t("favourites.help_msg_emphasis") + " "}</strong>
                  {t("favourites.help_msg_last")}
                </Body>
              ) : (
                ""
              )}
            </Grid>
            <Grid item md={4} xs={12}>
              <Paper padding="sm" className={contactUs}>
                <Header headingLevel="h2" size="lg">
                  {t("favourites.contact_us")}
                </Header>
                <p>
                  <HeaderLink
                    id="nearbyOffice"
                    arrow="forward"
                    href={getLink(this.props.url, "/map", "favourites")}
                  >
                    {t("favourites.visit_prompt")}
                  </HeaderLink>
                </p>

                <Body>{t("favourites.print_instructions")}</Body>

                <hr />

                <p>
                  <AnchorLink
                    fontSize={21}
                    fontWeight="bold"
                    href={"tel:+" + t("contact.phone")}
                  >
                    {t("contact.phone")}
                  </AnchorLink>
                </p>

                <Body>{t("favourites.call_time")}</Body>

                <hr />

                <p>
                  <AnchorLink
                    id="contactEmail"
                    fontSize={21}
                    fontWeight="bold"
                    href={"mailto:" + t("contact.email")}
                  >
                    {t("contact.email")}
                  </AnchorLink>
                </p>

                <Body>{t("favourites.email_disclaimer")}</Body>

                <hr />

                <Header className={contactUsTitle} size="lg" headingLevel="h2">
                  {t("favourites.apply_prompt")}
                </Header>

                <Body className={noBottomMargin}>
                  <p>
                    <HeaderLink
                      id="myVACButton"
                      arrow="forward"
                      href={t("contact.my_vac_link")}
                    >
                      {t("favourites.login_link")}
                    </HeaderLink>
                  </p>
                  {t("favourites.login_prompt")}
                </Body>
              </Paper>
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
