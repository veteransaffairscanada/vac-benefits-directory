import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { connect } from "react-redux";
import ExampleBullets from "./example_bullets";
import ChildBenefitList from "./child_benefit_list";
import LearnMoreButton from "./learn_more_button";
import {
  getFilteredBenefitsFunction,
  getProfileFilters
} from "../selectors/benefits";

const topBorder = css`
  padding-top: 1em;
  padding-bottom: 18px;
`;

export class BenefitExpansion extends Component {
  getAlsoEligibleBenefits = (benefits, patronType = "") => {
    const reduxState = this.props.reduxState;
    const profileFilters = JSON.parse(
      JSON.stringify(getProfileFilters(reduxState, this.props))
    );

    if (patronType === "family") {
      // the following code exists because we don't ask veterans/servingMembers the statusAndVitals question
      switch (profileFilters["patronType"]) {
        case "veteran":
          profileFilters["statusAndVitals"] = "releasedAlive";
          break;
        case "servingMember":
          profileFilters["statusAndVitals"] = "stillServing";
          break;
        default:
          break;
      }
    }
    const selectedNeeds = {}; // we don't want to filter by need here
    if (patronType !== "") {
      profileFilters["patronType"] = patronType;
    }

    return getFilteredBenefitsFunction(
      profileFilters,
      selectedNeeds,
      benefits,
      reduxState.needs,
      reduxState.eligibilityPaths,
      reduxState.multipleChoiceOptions
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

    const veteranBenefits = this.getAlsoEligibleBenefits(
      childBenefits,
      "veteran"
    );
    const servingMemberBenefits = this.getAlsoEligibleBenefits(
      childBenefits,
      "servingMember"
    );
    const vetServBenefits = [
      ...new Set(veteranBenefits.concat(servingMemberBenefits))
    ];
    const familyBenefits = this.getAlsoEligibleBenefits(
      childBenefits,
      "family"
    );

    let otherBenefits = t("benefits_b.eligible_open_veteran", {
      x: benefitName
    });

    return (
      <div className={this.props.className}>
        <ExampleBullets benefit={benefit} t={t} store={store} />
        <div className={topBorder}>
          <ChildBenefitList
            benefits={vetServBenefits}
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
    multipleChoiceOptions: reduxState.multipleChoiceOptions,
    reduxState: reduxState
  };
};
BenefitExpansion.propTypes = {
  benefits: PropTypes.array.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  multipleChoiceOptions: PropTypes.array.isRequired,
  benefit: PropTypes.object.isRequired,
  reduxState: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  store: PropTypes.object
};

export default connect(mapStateToProps)(BenefitExpansion);
