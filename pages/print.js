import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { withI18next } from "../lib/withI18next";
import NeedButton from "../components/need_button";
import { WordMark } from "@cdssnc/gcui";
import FIP from "../components/fip";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { css, cx } from "react-emotion";

const root = css`
  font-family: Merriweather, serif;
  padding: 12px;
`;
const table = css`
  width: 100%;
`;
const box = css`
  border-style: solid;
  border-width: 2px;
  padding: 1.5em;
`;
const gridstyle = css`
  margin-top: 12px !important;
`;
const bigTitle = css`
  font-size: 32px;
  font-weight: bold;
`;
const margins = css`
  margin-top: 20px;
  margin-bottom: 15px;
`;
const address = css`
  margin-top: 0.5em;
`;
const title = css`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 10px;
`;
const bold = css`
  font-weight: bold;
`;
const rules = css`
  width: 100%;
  line-height: 1.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  height: 3em;
  background-image: linear-gradient(black 1px, transparent 0);
  background-position: 0px 1.2em;
  background-size: 100% 1.5em;
  -webkit-print-color-adjust: exact;
`;
const benefitRow = css`
  "@media print": {
    page-break-inside: avoid !important;
  }
`;
const benefitCell = css`
  padding-bottom: 10px;
  padding-left: 0px;
`;
const svgContainer = css`
  width: 450px;
  height: 38px;
`;
const hr = css`
  color: black;
  background-color: black;
  border: 0;
  height: 2px;
  -webkit-print-color-adjust: exact;
`;
const wordmark = css`
  text-align: right;
  width: 100%;
  margin-top: 20px;
`;

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: ["Merriweather", "serif"],
    fontSize: "24px",
    lineHeight: "1em"
  }
});

export class Print extends Component {
  componentDidMount() {
    window.print();
  }

  countString = (filteredBenefits, benefits, t, printingFromFavourites) => {
    switch (true) {
      case printingFromFavourites:
        return t("favourites.saved_benefits", { x: filteredBenefits.length });
      case filteredBenefits.length === benefits.length:
        return t("B3.All benefits to consider");
      case filteredBenefits.length === 0:
        return t("B3.No benefits");
      case filteredBenefits.length === 1:
        return t("B3.One benefit");
      default:
        return t("B3.x benefits to consider", { x: filteredBenefits.length });
    }
  };

  sortBenefits = (benefits, language, sortBy) => {
    benefits.forEach(b => {
      if (b.sortingPriority === undefined) {
        b.sortingPriority = "low";
      }
      b.sortingNumber = { high: 1, medium: 2, low: 3 }[b.sortingPriority];
    });

    let sorting_fn = (a, b) => {
      if (sortBy === "alphabetical" || a.sortingNumber === b.sortingNumber) {
        // sort alphabetically
        let vacName = language === "en" ? "vacNameEn" : "vacNameFr";
        let nameA = a[vacName].toUpperCase();
        let nameB = b[vacName].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
      // ascending numeric sort
      return a.sortingNumber - b.sortingNumber;
    };
    return benefits.sort(sorting_fn);
  };

  render() {
    const {
      i18n,
      t,
      benefits,
      needs,
      multipleChoiceOptions,
      store
    } = this.props; // eslint-disable-line no-unused-vars
    const query = this.props.url.query;
    const printingFromFavourites = query.fromFavourites !== undefined;
    const filteredBenefitsIDs =
      Object.keys(query).indexOf("benefits") > -1
        ? query.benefits.split(",")
        : [];
    const filteredBenefits = benefits.filter(
      x => filteredBenefitsIDs.indexOf(x.id) > -1
    );
    const sortedFilteredBenefits = this.sortBenefits(
      filteredBenefits,
      this.props.t("current-language-code"),
      query["sortBy"]
    );

    const profile_text = this.props.profileQuestions
      .map(q => q.variable_name)
      .map(k => {
        if (!query[k]) {
          return null;
        }
        let option = multipleChoiceOptions.filter(
          x => x["variable_name"] == query[k]
        )[0];
        if (t("current-language-code") === "en") {
          return option.ge_breadcrumb_english
            ? option.ge_breadcrumb_english
            : option.display_text_english;
        } else {
          return option.ge_breadcrumb_french
            ? option.ge_breadcrumb_french
            : option.display_text_french;
        }
      })
      .filter(x => (x && x.length > 0 ? true : false))
      .join(", ");

    let closestAreaOffice = {};
    let selectedAreaOffice = {};

    if (query.closestAOID !== undefined)
      closestAreaOffice = this.props.areaOffices.filter(
        ao => ao.id === query.closestAOID
      )[0];

    if (query.selectedAOID !== undefined)
      selectedAreaOffice = this.props.areaOffices.filter(
        ao => ao.id === query.selectedAOID
      )[0];

    const printAreaOffice =
      JSON.stringify(selectedAreaOffice) === JSON.stringify({})
        ? closestAreaOffice
        : selectedAreaOffice;

    return (
      <MuiThemeProvider theme={theme}>
        <div className={root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <div className={svgContainer}>
                <FIP fillColor="black" t={this.props.t} />
              </div>
            </Grid>

            {printingFromFavourites ? (
              ""
            ) : (
              <Grid item xs={12}>
                <div className={box}>
                  <div className={bold}>{t("print.who_is_receiving")}</div>
                  <div className={"profile_section " + rules}>
                    {profile_text}
                  </div>

                  <div className="needs_section">
                    <Grid container spacing={0}>
                      {needs.map((need, i) => (
                        <Grid item xs={4} key={i}>
                          <NeedButton
                            need={need}
                            t={t}
                            store={store}
                            scrollOnClick={false}
                            disabled="disabled"
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </div>
                </div>
              </Grid>
            )}
          </Grid>

          <div className={cx(bigTitle, margins)}>
            {this.countString(
              sortedFilteredBenefits,
              benefits,
              t,
              printingFromFavourites
            )}
          </div>
          <table className={table}>
            <tbody>
              {sortedFilteredBenefits.map((b, i) => {
                return (
                  <tr key={i} className={benefitRow}>
                    <td className={benefitCell}>
                      <div className="benefitsListItem">
                        <div>
                          <b>
                            {t("current-language-code") == "en"
                              ? b.vacNameEn
                              : b.vacNameFr}
                          </b>
                        </div>
                        <div>
                          {t("current-language-code") == "en"
                            ? b.oneLineDescriptionEn
                            : b.oneLineDescriptionFr}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Grid container spacing={24} className={gridstyle}>
            <Grid item xs={12}>
              <hr className={hr} />
            </Grid>
            <Grid item xs={12}>
              <div className={bigTitle}>{t("print.have_any_questions")}</div>
            </Grid>
            <Grid item xs={6}>
              <div className={title}>{t("favourites.contact_us")}</div>
              <div className={bold}>{t("contact.phone")}</div>
              <div>{t("favourites.call_time")}</div>
              <br />
              <div className={bold}>{t("contact.email")}</div>
              <div>{t("favourites.email_disclaimer")}</div>
              <br />
              <div className={title}>{t("print.apply_online")}</div>
              <div className={bold}>{t("contact.my_vac_link")}</div>
              <div>{t("print.sign_up_for_my_vac")}</div>
            </Grid>
            <Grid item xs={6} id="closest_office_info">
              <div className={title}>{t("print.closest_office")}</div>

              <div className={bold}>{t("print.map_link")}</div>
              <div>{t("print.visit_office_prompt")}</div>

              <div className={address}>
                {t("current-language-code") == "en"
                  ? printAreaOffice.name_en
                  : printAreaOffice.name_fr}
                <br />
                {t("current-language-code") == "en"
                  ? printAreaOffice.address_en
                  : printAreaOffice.address_fr}
              </div>
            </Grid>
          </Grid>
          <div className={wordmark}>
            <WordMark width="6em" flag="#000" />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    multipleChoiceOptions: reduxState.multipleChoiceOptions,
    profileQuestions: reduxState.questions.filter(
      q => q.variable_name !== "needs"
    ),
    benefits: reduxState.benefits,
    eligibilityPaths: reduxState.eligibilityPaths,
    needs: reduxState.needs,
    areaOffices: reduxState.areaOffices
  };
};

Print.propTypes = {
  multipleChoiceOptions: PropTypes.array.isRequired,
  profileQuestions: PropTypes.array.isRequired,
  benefits: PropTypes.array.isRequired,
  needs: PropTypes.array.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  areaOffices: PropTypes.array.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withI18next()(Print));
