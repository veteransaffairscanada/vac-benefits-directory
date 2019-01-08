import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { connect } from "react-redux";
import ExampleBullets from "./example_bullets";
var constants = require("../utils/hardcoded_strings");
import ChildBenefitList from "./child_benefit_list";
import LearnMoreButton from "./learn_more_button";

const topBorder = css`
  padding-top: 1em;
  padding-bottom: 18px;
`;

export class BenefitExpansion extends Component {
  state = {
    open: false
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

    let otherBenefits = t("benefits_b.eligible_open_veteran", {
      x: benefitName
    });

    return (
      <div className={this.props.className}>
        <ExampleBullets benefit={benefit} t={t} store={store} />
        <div className={topBorder}>
          <ChildBenefitList
            benefits={veteranBenefits}
            colonText={otherBenefits}
            t={t}
          />
          <ChildBenefitList
            benefits={familyBenefits}
            colonText={t("benefits_b.eligible_open_family")}
            t={t}
          />
          <LearnMoreButton benefit={benefit} t={t} />
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
