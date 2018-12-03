import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { connect } from "react-redux";
import { globalTheme } from "../theme";
import HeaderLink from "./header_link";
import Button from "./button";
import { logEvent } from "../utils/analytics";
var constants = require("../utils/hardcoded_strings");

const headerDesc = css`
  flex-grow: 1;
  color: ${globalTheme.colour.greyishBrown};
`;
const cardBottomFamilyTitle = css`
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const children = css`
  width: 100%;
`;
const heading = css`
  margin-bottom: 10px;
  text-align: left;
`;

const fullWidth = css`
  width: 100%;
`;
const topBorder = css`
  border-top: thin dashed ${globalTheme.colour.lineGrey};
  padding-top: 1em;
`;

export class RelatedBenefits extends Component {
  state = {
    open: false
  };
  logExit = url => {
    logEvent("Exit", url);
  };

  benefitTitle = benefit => {
    return this.props.t("current-language-code") === "en"
      ? benefit.vacNameEn
      : benefit.vacNameFr;
  };

  getMatchingBenefits = (benefits, ids) => {
    const matchingBenefits = benefits.filter(ab => ids.has(ab.id));
    return matchingBenefits;
  };

  getBenefitIds = (
    eligibilityPaths,
    servicePersonOptionIds,
    familyOptionIds
  ) => {
    let veteranBenefitIds = [];
    let familyBenefitIds = [];

    eligibilityPaths.forEach(ep => {
      servicePersonOptionIds.forEach(id => {
        if (ep.requirements && ep.requirements.indexOf(id) !== -1) {
          veteranBenefitIds = veteranBenefitIds.concat(ep.benefits);
        }
      });
      familyOptionIds.forEach(id => {
        if (ep.requirements && ep.requirements.indexOf(id) !== -1) {
          familyBenefitIds = familyBenefitIds.concat(ep.benefits);
        }
      });
    });
    return {
      veteran: new Set(veteranBenefitIds),
      family: new Set(familyBenefitIds)
    };
  };

  render() {
    const { t, benefit, benefits } = this.props;
    const language = t("current-language-code");
    const childBenefits = benefit.childBenefits
      ? benefits.filter(ab => benefit.childBenefits.indexOf(ab.id) > -1)
      : [];

    const servicePersonOptionIds = this.props.multipleChoiceOptions
      .filter(
        mco => constants.servicePersonOptions.indexOf(mco.variable_name) !== -1
      )
      .map(mco => mco.id);

    const familyOptionIds = this.props.multipleChoiceOptions
      .filter(mco => constants.familyOptions.indexOf(mco.variable_name) !== -1)
      .map(mco => mco.id);

    const benefitIds = this.getBenefitIds(
      this.props.eligibilityPaths,
      servicePersonOptionIds,
      familyOptionIds
    );
    const veteranBenefits = this.getMatchingBenefits(
      childBenefits,
      benefitIds.veteran
    );
    const familyBenefits = this.getMatchingBenefits(
      childBenefits,
      benefitIds.family
    );

    const learnMore = (
      <Button
        className={fullWidth}
        arrow={true}
        onClick={() => {
          this.logExit(
            t("current-language-code") === "en"
              ? benefit.benefitPageEn
              : benefit.benefitPageFr
          );
          const url =
            t("current-language-code") === "en"
              ? benefit.benefitPageEn
              : benefit.benefitPageFr;
          const win = window.open(url, "_blank");
          win.focus();
        }}
      >
        {t("Find out more")}
      </Button>
    );
    let otherBenefits = "";
    if (childBenefits.length > 0) {
      if (veteranBenefits.length > 0) {
        if (childBenefits.length == 1) {
          otherBenefits =
            this.benefitTitle(benefit) +
            " " +
            t("benefits_b.eligible_for_single", {
              x: this.benefitTitle(childBenefits[0])
            }) +
            ":";
        } else {
          otherBenefits =
            this.benefitTitle(benefit) +
            " " +
            t("benefits_b.eligible_for_multi", {
              x: childBenefits.length
            }) +
            ":";
        }
      }
      return (
        <div className={topBorder}>
          {veteranBenefits.length > 0 ? (
            <div>
              <div className={cardBottomFamilyTitle}>
                <span className={headerDesc}>{otherBenefits}</span>
              </div>
              <div className={children}>
                <div>
                  <ul>
                    {veteranBenefits.map((cb, i) => (
                      <li key={cb.id}>
                        <HeaderLink
                          id={"embedded-" + cb.id + i}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={heading}
                          size="small"
                          href={
                            language === "en"
                              ? cb.benefitPageEn
                              : cb.benefitPageFr
                          }
                          onClick={() => {
                            this.logExit(
                              language === "en"
                                ? cb.benefitPageEn
                                : cb.benefitPageFr
                            );
                            return true;
                          }}
                        >
                          {language === "en" ? cb.vacNameEn : cb.vacNameFr}
                        </HeaderLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}

          {familyBenefits.length > 0 ? (
            <div>
              <div className={cardBottomFamilyTitle}>
                <span className={headerDesc}>
                  {t("benefits_b.eligible_open_family")}
                </span>
              </div>
              <div className={children}>
                <ul>
                  {familyBenefits.map((cb, i) => (
                    <li key={cb.id}>
                      <HeaderLink
                        id={"embedded-" + cb.id + i}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={heading}
                        size="small"
                        href={
                          language === "en"
                            ? cb.benefitPageEn
                            : cb.benefitPageFr
                        }
                        onClick={() => {
                          this.logExit(
                            language === "en"
                              ? cb.benefitPageEn
                              : cb.benefitPageFr
                          );
                          return true;
                        }}
                      >
                        {language === "en" ? cb.vacNameEn : cb.vacNameFr}
                      </HeaderLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
          {learnMore}
        </div>
      );
    } else {
      return <div>{learnMore}</div>;
    }
  }
}
const mapStateToProps = reduxState => {
  return {
    benefits: reduxState.benefits,
    eligibilityPaths: reduxState.eligibilityPaths,
    multipleChoiceOptions: reduxState.multipleChoiceOptions
  };
};
RelatedBenefits.propTypes = {
  benefits: PropTypes.array.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  multipleChoiceOptions: PropTypes.array.isRequired,
  benefit: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(RelatedBenefits);
