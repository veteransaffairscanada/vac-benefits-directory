import React, { Component } from "react";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import EmbeddedBenefitCard from "./embedded_benefit_card";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { cx, css } from "react-emotion";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";

const headerDesc = css`
  flex-grow: 1;
  color: #434343;
`;
const ExpansionPanelSummaryCss = css`
  padding-left: 9px !important;
  border-radius: 0px;
  border-top: 1px solid #f5f5f5 !important;
  position: relative !important;
`;
const cardBottomTitle = css`
  padding-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const cardBottomFamilyTitle = css`
  margin-left: 9px;
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ExpansionPanelCss = css`
  margin-bottom: 0px !important;
  margin-top: 0px !important;
`;
const ExpansionPanelOpen = css`
  background-color: #f5f5f5 !important;
`;
const ExpansionPanelClosed = css`
  background-color: #f1f7fc !important;
`;
const collapse = css`
  padding-top: 25px !important;
  padding-left: 15px !important;
  background-color: #f5f5f5 !important;
`;
const children = css`
  width: 100%;
`;
const returnIcon = css`
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  float: left;
  filter: FlipH;
  -ms-filter: fliph;
  padding-left: 10px;
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

  render() {
    const { t, benefit, benefits } = this.props;

    let veteranBenefitIds = [];
    let familyBenefitIds = [];

    this.props.eligibilityPaths.forEach(ep => {
      if (ep.patronType === "service-person") {
        veteranBenefitIds = veteranBenefitIds.concat(ep.benefits);
      }
      if (ep.patronType === "family") {
        familyBenefitIds = familyBenefitIds.concat(ep.benefits);
      }
    });
    const childBenefits = benefit.childBenefits
      ? benefits.filter(ab => benefit.childBenefits.indexOf(ab.id) > -1)
      : [];
    const veteranBenefits = childBenefits.filter(
      ab => veteranBenefitIds.indexOf(ab.id) > -1
    );
    const familyBenefits = childBenefits.filter(
      ab => familyBenefitIds.indexOf(ab.id) > -1
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
              <KeyboardReturnIcon className={returnIcon} />
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
            <Grid item xs={12}>
              {veteranBenefits.length > 0 ? (
                <div className={children}>
                  <div>
                    {veteranBenefits.map((cb, i) => (
                      <EmbeddedBenefitCard
                        id={"cb" + i}
                        benefit={cb}
                        t={this.props.t}
                        key={cb.id}
                        showFavourite={this.props.showFavourite}
                        store={this.props.store}
                      />
                    ))}
                    <br />
                    <br />
                  </div>
                </div>
              ) : null}

              {familyBenefits.length > 0 ? (
                <div>
                  <div className={cardBottomFamilyTitle}>
                    <KeyboardReturnIcon className={returnIcon} />
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
                        showFavourite={this.props.showFavourite}
                        store={this.props.store}
                      />
                    ))}
                  </div>
                </div>
              ) : null}
            </Grid>
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
    eligibilityPaths: reduxState.eligibilityPaths,
    benefits: reduxState.benefits
  };
};
CardFooter.propTypes = {
  showFavourite: PropTypes.bool.isRequired,
  benefit: PropTypes.object.isRequired,
  benefits: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(CardFooter);
