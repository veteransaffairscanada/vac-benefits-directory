import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { KeyboardBackspace } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Highlighter from "react-highlight-words";
import FavouriteButton from "./favourite_button";
import Paper from "@material-ui/core/Paper";
import { logEvent } from "../utils/analytics";
import { connect } from "react-redux";
import NeedTag from "./need_tag";
import EmbeddedBenefitCard from "./embedded_benefit_card";
import { cx, css } from "react-emotion";

const cardTop = css`
  background-color: #f1f7fc;
  border-radius: 0px;
  border-bottom: 1px solid #8b8b8b;
  padding: 15px 15px 15px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const button = css`
  background-color: #3e57e2 !important;
  color: white !important;
  text-align: right !important;
  text-transform: none !important;
  // float: right !important;
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
const cardBody = css`
  padding: 25px !important;
  padding-top: 15px !important;
`;
const cardDescriptionText = css`
  font-size: 18px;
  padding: 10px 0px;
  padding-bottom: 15px;
`;
const collapse = css`
  padding-top: 25px !important;
  padding-left: 15px !important;
  background-color: #f5f5f5 !important;
`;
const root = css`
  width: 100%;
`;
const children = css`
  width: 100%;
`;

const benefitName = css`
  font-size: 24px;
  font-weight: 600;
  padding: 10px 0;
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
const rightArrowIcon = css`
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  float: left;
  filter: FlipH;
  -ms-filter: fliph;
  padding-right: 10px;
`;
const parentIcon = css`
  margin-right: 15px;
  font-size: 40px !important;
  transform: scale(0.9);
  color: #434343;
`;
const headerDesc = css`
  flex-grow: 1;
  color: #434343;
`;
const headerUrl = css`
  color: #006cc9;
`;
const alignRight = css`
  text-align: right;
`;
export class BenefitCard extends Component {
  state = {
    open: false
  };
  children = [];
  logExit = url => {
    logEvent("Exit", url);
  };

  toggleOpenState = () => {
    this.setState(previousState => {
      return { ...previousState, open: !previousState.open };
    });
  };

  componentDidMount() {
    this.forceUpdate();
  }

  benefitTitle = benefit => {
    return this.props.t("current-language-code") === "en"
      ? benefit.vacNameEn
      : benefit.vacNameFr;
  };

  benefitUrl = benefit => {
    return this.props.t("current-language-code") === "en"
      ? benefit.benefitPageEn
      : benefit.benefitPageFr;
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

  get_benefit_a_elements = parentBenefits => {
    let a_elements = parentBenefits.map((b, i) => (
      <a
        key={"a" + i}
        className={headerUrl}
        href={this.benefitUrl(b)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {this.benefitTitle(b)}
      </a>
    ));

    let a_elements_with_ors = [];
    a_elements.forEach((value, index) => {
      if (a_elements.length - 1 !== index) {
        a_elements_with_ors = a_elements_with_ors.concat([
          value,
          <span key={"b" + index}> {" " + this.props.t("index.or")} </span>
        ]);
      } else {
        a_elements_with_ors = a_elements_with_ors.concat([
          value,
          <span key={"c" + index}> </span>
        ]);
      }
    });
    return a_elements_with_ors;
  };

  render() {
    const benefit = this.props.benefit;
    const { t } = this.props;

    const parentBenefits = this.props.allBenefits.filter(
      b => b.childBenefits && b.childBenefits.includes(benefit.id)
    );

    const childBenefits = benefit.childBenefits
      ? this.props.allBenefits.filter(
          ab => benefit.childBenefits.indexOf(ab.id) > -1
        )
      : [];

    const veteranBenefits = childBenefits.filter(
      ab => this.props.veteranBenefitIds.indexOf(ab.id) > -1
    );
    const familyBenefits = childBenefits.filter(
      ab => this.props.familyBenefitIds.indexOf(ab.id) > -1
    );

    const needsMet = benefit.needs
      ? this.props.needs.filter(
          need =>
            benefit.needs.indexOf(need.id) > -1 &&
            this.props.selectedNeeds[need.id]
        )
      : [];

    return (
      <Grid item xs={12}>
        <div className={root}>
          {parentBenefits.length > 0 &&
          benefit.availableIndependently === "Requires Gateway Benefit" ? (
            <Paper className={cardTop}>
              <ErrorOutlineIcon className={parentIcon} />
              <span className={headerDesc}>
                <span>{t("benefits_b.card_header_1") + " "}</span>
                {this.get_benefit_a_elements(parentBenefits)}{" "}
                <span>
                  {this.props.t("benefits_b.card_header_2") +
                    " " +
                    this.benefitTitle(this.props.benefit) +
                    "."}
                </span>
              </span>
            </Paper>
          ) : null}

          <Paper className={cardBody}>
            <div component="p" className={benefitName}>
              <Highlighter
                searchWords={this.props.searchString.split(",")}
                autoEscape={true}
                textToHighlight={
                  this.props.t("current-language-code") === "en"
                    ? benefit.vacNameEn
                    : benefit.vacNameFr
                }
              />
            </div>

            <h2 className={"cardDescription " + cardDescriptionText}>
              <Highlighter
                searchWords={this.props.searchString.split(",")}
                autoEscape={true}
                textToHighlight={
                  this.props.t("current-language-code") === "en"
                    ? benefit.oneLineDescriptionEn
                    : benefit.oneLineDescriptionFr
                }
              />
            </h2>
            <div>
              {needsMet.map(need => (
                <NeedTag
                  key={benefit.id + need.id}
                  t={this.props.t}
                  need={need}
                />
              ))}
            </div>

            <Grid container>
              {this.props.showFavourite ? (
                <Grid item xs={4}>
                  <FavouriteButton
                    benefit={benefit}
                    toggleOpenState={() => {}}
                    store={this.props.store}
                    t={this.props.t}
                  />
                </Grid>
              ) : null}
              <Grid item xs={8} className={alignRight}>
                <Button
                  className={button}
                  target="_blank"
                  variant="raised"
                  onClick={() =>
                    this.logExit(
                      this.props.t("current-language-code") === "en"
                        ? benefit.benefitPageEn
                        : benefit.benefitPageFr
                    )
                  }
                  href={
                    this.props.t("current-language-code") === "en"
                      ? benefit.benefitPageEn
                      : benefit.benefitPageFr
                  }
                  rel="noopener noreferrer"
                >
                  {this.props.t("Find out more")}
                  <KeyboardBackspace className={rightArrowIcon} />
                </Button>
              </Grid>
            </Grid>
          </Paper>

          {childBenefits.length > 0 ? (
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
                            t={this.props.t}
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
          ) : null}
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    needs: reduxState.needs,
    selectedNeeds: reduxState.selectedNeeds,
    benefits: reduxState.benefits
  };
};

BenefitCard.propTypes = {
  benefits: PropTypes.array.isRequired,
  allBenefits: PropTypes.array.isRequired,
  veteranBenefitIds: PropTypes.array.isRequired,
  familyBenefitIds: PropTypes.array.isRequired,
  benefit: PropTypes.object.isRequired,
  needs: PropTypes.array.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  showFavourite: PropTypes.bool.isRequired,
  searchString: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(BenefitCard);
