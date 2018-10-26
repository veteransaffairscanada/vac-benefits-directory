import React, { Component } from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "./icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import EmbeddedBenefitCard from "./embedded_benefit_card";
import { cx, css } from "react-emotion";
import { connect } from "react-redux";
import { globalTheme } from "../theme";
var constants = require("../utils/hardcoded_strings");

const headerDesc = css`
  flex-grow: 1;
  color: ${globalTheme.colour.greyishBrown};
`;
const ExpansionPanelSummaryCss = css`
  padding-left: ${globalTheme.cardPadding} !important;
  padding-right: ${globalTheme.cardPadding} !important;
  padding-top: 20px !important;
  padding-bottom: 20px !important;
  border-radius: 0px;
  border-top: 1px solid ${globalTheme.colour.paleGrey} !important;
  position: relative !important;
  min-height: 0px !important;
  div {
    margin: 0px !important;
  }
  div[role="button"] {
    padding: 0px 20px 0px 20px !important;
  }
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    padding-left: ${globalTheme.cardPaddingMobile} !important;
    padding-right: ${globalTheme.cardPaddingMobile} !important;
  }
`;
const cardBottomTitle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const cardBottomFamilyTitle = css`
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ExpansionPanelCss = css`
  margin: 0px !important;
`;
const ExpansionPanelOpen = css`
  background-color: ${globalTheme.colour.cardGrey} !important;
`;
const ExpansionPanelClosed = css`
  :hover {
    background-color: ${globalTheme.colour.cardGrey} !important;
  }
`;
const collapse = css`
  background-color: ${globalTheme.colour.cardGrey} !important;
  padding-left: ${globalTheme.cardPadding} !important;
  padding-right: ${globalTheme.cardPadding} !important;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    padding-left: ${globalTheme.cardPaddingMobile} !important;
    padding-right: ${globalTheme.cardPaddingMobile} !important;
  }
`;
const children = css`
  width: 100%;
`;

export class CardFooter extends Component {
  state = {
    open: false
  };

  benefitTitle = benefit => {
    return this.props.t("current-language-code") === "en"
      ? benefit.vacNameEn
      : benefit.vacNameFr;
  };

  childBenefitNames = (benefit, childBenefits, open) => {
    const length = childBenefits.length;
    if (open) {
      return this.props.t("benefits_b.eligible_open_veteran", {
        x: this.benefitTitle(benefit)
      });
    } else {
      if (length === 1) {
        return (
          this.benefitTitle(benefit) +
          " " +
          this.props.t("benefits_b.eligible_for_single", {
            x: this.benefitTitle(childBenefits[0])
          })
        );
      } else {
        return (
          this.benefitTitle(benefit) +
          " " +
          this.props.t("benefits_b.eligible_for_multi", {
            x: length
          })
        );
      }
    }
  };

  toggleOpenState = () => {
    this.setState(previousState => {
      return { ...previousState, open: !previousState.open };
    });
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

    if (childBenefits.length > 0) {
      return (
        <ExpansionPanel
          expanded={this.state.open}
          className={
            this.state.open
              ? cx(ExpansionPanelCss, ExpansionPanelOpen)
              : cx(ExpansionPanelCss, ExpansionPanelClosed)
          }
        >
          <ExpansionPanelSummary
            className={ExpansionPanelSummaryCss}
            expandIcon={<ExpandMoreIcon />}
            onClick={() => this.toggleOpenState()}
          >
            <div className={cardBottomTitle}>
              <span className={headerDesc}>
                <span>
                  {this.childBenefitNames(
                    benefit,
                    childBenefits,
                    this.state.open
                  )}
                </span>
              </span>
            </div>
          </ExpansionPanelSummary>

          <ExpansionPanelDetails timeout="auto" className={collapse}>
            <div>
              {veteranBenefits.length > 0 ? (
                <div className={children}>
                  <div>
                    {veteranBenefits.map((cb, i) => (
                      <EmbeddedBenefitCard
                        id={"cb" + i}
                        benefit={cb}
                        t={this.props.t}
                        key={cb.id}
                        store={this.props.store}
                      />
                    ))}
                    <br />
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
                    {familyBenefits.map((cb, i) => (
                      <EmbeddedBenefitCard
                        id={"cb" + i}
                        className="BenefitCards"
                        benefit={cb}
                        t={t}
                        key={cb.id}
                        store={this.props.store}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      );
    } else {
      return null;
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
CardFooter.propTypes = {
  benefits: PropTypes.array.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  multipleChoiceOptions: PropTypes.array.isRequired,
  benefit: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(CardFooter);
