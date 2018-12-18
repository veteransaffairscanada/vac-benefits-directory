import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { connect } from "react-redux";
import { globalTheme } from "../theme";
import HeaderLink from "./header_link";
import Button from "./button";
import { logEvent } from "../utils/analytics";
import ExampleBullets from "./example_bullets";
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
  font-size: 1em;
  font-weight: normal;
  margin-bottom: 10px;
  text-align: left;
`;

const fullWidth = css`
  width: 100%;
`;
const topBorder = css`
  padding-top: 1em;
`;
const listStyle = css`
  padding-left: 20px;
`;

export class BenefitExpansion extends Component {
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

  getLearnMoreButton = () => {
    const { t, benefit } = this.props;
    const url =
      t("current-language-code") === "en"
        ? benefit.benefitPageEn
        : benefit.benefitPageFr;
    const vacName =
      t("current-language-code") === "en"
        ? benefit.vacNameEn
        : benefit.vacNameFr;

    return (
      <Button
        className={fullWidth}
        arrow={true}
        onClick={() => {
          this.logExit(url);
          const win = window.open(url, "_blank");
          win.focus();
        }}
      >
        {t("benefits_b.learn_more", { x: vacName })}
      </Button>
    );
  };

  getBenefitList = (benefits, colon_text) => {
    if (benefits.length === 0) {
      return null;
    }
    const language = this.props.t("current-language-code");
    return (
      <div>
        <div className={cardBottomFamilyTitle}>
          <span className={headerDesc}>{colon_text}</span>
        </div>
        <div className={children}>
          <div>
            <ul className={listStyle}>
              {benefits.map(cb => (
                <li key={cb.id}>
                  <HeaderLink
                    target="_blank"
                    rel="noopener noreferrer"
                    className={heading}
                    size="small"
                    href={
                      language === "en" ? cb.benefitPageEn : cb.benefitPageFr
                    }
                    onClick={() => {
                      this.logExit(
                        language === "en" ? cb.benefitPageEn : cb.benefitPageFr
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
    );
  };

  render() {
    const { t, benefit, benefits, store } = this.props;
    const language = t("current-language-code");
    const benefitName =
      language === "en" ? benefit.vacNameEn : benefit.vacNameFr;
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
    const learnMore = this.getLearnMoreButton();

    let otherBenefits = t("benefits_b.eligible_open_veteran", {
      x: benefitName
    });

    return (
      <div className={this.props.className}>
        <ExampleBullets benefit={benefit} t={t} store={store} />
        <div className={topBorder}>
          {this.getBenefitList(veteranBenefits, otherBenefits)}
          {this.getBenefitList(
            familyBenefits,
            t("benefits_b.eligible_open_family")
          )}
          {learnMore}
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    benefits: reduxState.benefits,
    eligibilityPaths: reduxState.eligibilityPaths,
    multipleChoiceOptions: reduxState.multipleChoiceOptions
  };
};
BenefitExpansion.propTypes = {
  benefits: PropTypes.array.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  multipleChoiceOptions: PropTypes.array.isRequired,
  benefit: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  store: PropTypes.object
};

export default connect(mapStateToProps)(BenefitExpansion);
