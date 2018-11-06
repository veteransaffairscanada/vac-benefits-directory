import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import BenefitList from "./benefit_list";
import { connect } from "react-redux";
import { getPrintUrl } from "../selectors/urls";
import Bookmark from "./icons/BookmarkBorder";
import Print from "./icons/Print";
import Link from "next/link";
import { css } from "react-emotion";
import Container from "./container";
import Header1 from "./typography/header1";
import Header2 from "./typography/header2";
import HeaderButton from "./header_button";
import Body from "./typography/body";
import Paper from "./paper";
import { DisabledCookiesBanner } from "./disabled_cookies_banner";
import { areCookiesDisabled, getLink } from "../utils/common";
import { globalTheme } from "../theme";

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
const topPadding = css`
  padding-top: 30px;
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
    showDisabledCookieBanner: false
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
    const { t } = this.props; // eslint-disable-line no-unused-vars

    const filteredBenefits = this.filterBenefits(
      this.props.benefits,
      this.props.favouriteBenefits
    );

    return (
      <div className={outerDiv}>
        <div className={whiteBanner}>
          <Container className={topPadding}>
            <Grid container spacing={24}>
              <Grid item xs={6}>
                <HeaderButton
                  id="backButton"
                  useLink
                  href={getLink(this.props.url, "/benefits-directory")}
                  arrow="back"
                >
                  {t("favourites.back_link")}
                </HeaderButton>
              </Grid>
              <Grid item xs={6} className={right}>
                <HeaderButton
                  href={this.props.printUrl}
                  target="print_page"
                  id="printButton"
                >
                  <Print /> {t("Print")}
                </HeaderButton>
              </Grid>
            </Grid>
          </Container>
        </div>

        <Container id="favourites">
          <Grid container spacing={24}>
            <Grid item xs={12} className={topMatter}>
              <h1>
                <Header1 className={"BenefitsCounter"}>
                  {t("favourites.saved_benefits", {
                    x: filteredBenefits.length
                  })}
                </Header1>
              </h1>
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
                  sortByValue={this.props.sortBy}
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
                <h2>
                  <Header2>{t("favourites.contact_us")}</Header2>
                </h2>
                <p>
                  <HeaderButton
                    id="nearbyOffice"
                    arrow="forward"
                    useLink
                    href={getLink(this.props.url, "/map", "favourites")}
                  >
                    {t("favourites.visit_prompt")}
                  </HeaderButton>
                </p>

                <Body>{t("favourites.print_instructions")}</Body>

                <hr />

                <p>
                  <HeaderButton
                    id="contactPhone"
                    href={"tel:" + t("contact.phone")}
                  >
                    {t("contact.phone")}
                  </HeaderButton>
                </p>

                <Body>{t("favourites.call_time")}</Body>

                <hr />

                <p>
                  <HeaderButton
                    id="contactEmail"
                    href={"mailto:" + t("contact.email")}
                  >
                    {t("contact.email")}
                  </HeaderButton>
                </p>

                <Body>{t("favourites.email_disclaimer")}</Body>

                <hr />

                <Header2 className={contactUsTitle}>
                  {t("favourites.apply_prompt")}
                </Header2>

                <Body className={noBottomMargin}>
                  <p>
                    <HeaderButton
                      id="myVACButton"
                      arrow="forward"
                      useLink
                      href={t("contact.my_vac_link")}
                    >
                      {t("favourites.login_link")}
                    </HeaderButton>
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
    sortBy: reduxState.sortBy
  };
};

Favourites.propTypes = {
  cookiesDisabled: PropTypes.bool.isRequired,
  setCookiesDisabled: PropTypes.func.isRequired,
  benefits: PropTypes.array.isRequired,
  printUrl: PropTypes.string,
  t: PropTypes.func.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired,
  url: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites);
