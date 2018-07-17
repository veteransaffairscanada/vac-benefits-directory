import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import { KeyboardBackspace } from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Highlighter from "react-highlight-words";
import FavouriteButton from "./favourite_button_b";
import Paper from "@material-ui/core/Paper";
import { logEvent } from "../utils/analytics";
import { connect } from "react-redux";
import NeedTag from "./need_tag";
import EmbeddedBenefitCard from "./embedded_benefit_card_b";

const styles = () => ({
  button: {
    backgroundColor: "#3e57e2",
    color: "white",
    textAlign: "right"
  },
  cardBottom: {
    backgroundColor: "#f1f7fc",
    paddingLeft: "9px",
    borderRadius: "0px",
    borderTop: "1px solid #f5f5f5",
    position: "relative"
  },
  cardBottomContent: {
    margin: "0 15px"
  },
  cardTop: {
    backgroundColor: "#f1f7fc",
    borderRadius: "0px",
    borderBottom: "1px solid #8b8b8b",
    padding: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  cardBody: {
    padding: "25px",
    paddingTop: "15px"
  },
  cardDescriptionText: {
    fontSize: "18px",
    padding: "10px 0px",
    paddingBottom: "15px"
  },
  collapse: {
    paddingTop: "25px",
    paddingLeft: "15px",
    backgroundColor: "#f5f5f5"
  },
  root: {
    width: "100%"
  },
  ExpansionPanelClosed: {},
  ExpansionPanelOpen: {
    marginBottom: "0px",
    marginTop: "0px"
  },
  ExpansionPanelSummary: {
    borderBottom: "0px",
    userSelect: "inherit"
  },
  ChildBenefitDesc: {
    fontSize: "16px",
    paddingBottom: "30px"
  },
  children: {
    width: "100%"
  },
  benefitName: {
    fontWeight: 600,
    padding: "10px 0"
  },
  returnIcon: {
    "-moz-transform": "scaleX(-1)",
    "-o-transform": "scaleX(-1)",
    "-webkit-transform": "scaleX(-1)",
    transform: "scaleX(-1)",
    float: "left",
    filter: "FlipH",
    "-ms-filter": "FlipH",
    paddingLeft: "10px"
  },
  rightArrowIcon: {
    "-moz-transform": "scaleX(-1)",
    "-o-transform": "scaleX(-1)",
    "-webkit-transform": "scaleX(-1)",
    transform: "scaleX(-1)",
    float: "left",
    filter: "FlipH",
    "-ms-filter": "FlipH",
    paddingRight: "10px"
  },
  parentIcon: {
    flexGrow: 1,
    marginRight: 15,
    fontSize: 40,
    "-webkit-text-stroke": "1px black"
  },
  headerDesc: {
    width: "auto",
    flexGrow: 3
  }
});

export class BenefitCardB extends Component {
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
    this.props.onRef(this);
    this.forceUpdate();
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
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

  render() {
    const benefit = this.props.benefit;
    const { t, classes } = this.props;

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
        <div className={classes.root}>
          {parentBenefits.length > 0 &&
          benefit.availableIndependently == "Requires Gateway Benefit" ? (
            <Paper className={classes.cardTop}>
              <ErrorOutlineIcon className={classes.parentIcon} />
              <span className={classes.headerDesc}>
                <span>{t("benefits_b.card_header_1") + " "}</span>
                {parentBenefits
                  .map((b, i) => (
                    <a key={i} href={this.benefitUrl(b)}>
                      {this.benefitTitle(b)}
                    </a>
                  ))
                  .flatMap(
                    (value, index, array) =>
                      array.length - 1 !== index
                        ? [
                            value,
                            <span key={index}> {" " + t("index.or")} </span>
                          ]
                        : [value, <span key={index}> </span>]
                  )}

                <span>
                  {this.props.t("benefits_b.card_header_2") +
                    " " +
                    this.benefitTitle(this.props.benefit) +
                    "."}
                </span>
              </span>
            </Paper>
          ) : (
            ""
          )}

          <Paper className={classes.cardBody}>
            <div component="p" className={classes.benefitName}>
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

            <Typography
              className={"cardDescription " + classes.cardDescriptionText}
            >
              <Highlighter
                searchWords={this.props.searchString.split(",")}
                autoEscape={true}
                textToHighlight={
                  this.props.t("current-language-code") === "en"
                    ? benefit.oneLineDescriptionEn
                    : benefit.oneLineDescriptionFr
                }
              />
            </Typography>
            <div>
              {needsMet.map(need => (
                <NeedTag
                  key={benefit.id + need.id}
                  t={this.props.t}
                  need={need}
                />
              ))}
            </div>

            {this.props.showFavourite ? (
              <FavouriteButton
                benefit={benefit}
                toggleOpenState={() => {}}
                store={this.props.store}
                t={this.props.t}
              />
            ) : (
              ""
            )}
            <Button
              className={classes.button}
              target="_blank"
              variant="raised"
              style={{ textTransform: "none", float: "right" }}
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
            >
              {this.props.t("Find out more")}
              <KeyboardBackspace className={classes.rightArrowIcon} />
            </Button>
          </Paper>

          {childBenefits.length > 0 ? (
            <ExpansionPanel
              expanded={this.state.open}
              className={
                this.state.open
                  ? classes.ExpansionPanelOpen
                  : classes.ExpansionPanelClosed
              }
            >
              <ExpansionPanelSummary
                className={classes.cardBottom}
                expandIcon={<ExpandMoreIcon />}
                onClick={() => this.toggleOpenState()}
              >
                <div className={classes.cardBottomContent}>
                  <KeyboardReturnIcon className={classes.returnIcon} />
                  {this.childBenefitNames(
                    benefit,
                    childBenefits,
                    this.state.open
                  )}
                </div>
              </ExpansionPanelSummary>

              <ExpansionPanelDetails
                timeout="auto"
                className={classes.collapse}
              >
                <Grid item xs={12}>
                  {veteranBenefits.length > 0 ? (
                    <div className={classes.children}>
                      <div>
                        {veteranBenefits.map((cb, i) => (
                          <EmbeddedBenefitCard
                            id={"cb" + i}
                            benefit={cb}
                            t={this.props.t}
                            key={cb.id}
                            onRef={ref => this.children.push(ref)}
                            showFavourite={this.props.showFavourite}
                            store={this.props.store}
                          />
                        ))}
                        <br />
                        <br />
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {familyBenefits.length > 0 ? (
                    <div>
                      <KeyboardReturnIcon className={classes.returnIcon} />
                      <Typography className={classes.ChildBenefitDesc}>
                        {t("benefits_b.eligible_open_family")}
                      </Typography>
                      <div className={classes.children}>
                        {familyBenefits.map((cb, i) => (
                          <EmbeddedBenefitCard
                            id={"cb" + i}
                            className="BenefitCards"
                            benefit={cb}
                            t={this.props.t}
                            key={cb.id}
                            onRef={ref => this.children.push(ref)}
                            showFavourite={this.props.showFavourite}
                            store={this.props.store}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </Grid>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ) : (
            ""
          )}
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

BenefitCardB.propTypes = {
  benefits: PropTypes.array.isRequired,
  allBenefits: PropTypes.array.isRequired,
  veteranBenefitIds: PropTypes.array.isRequired,
  familyBenefitIds: PropTypes.array.isRequired,
  benefit: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  needs: PropTypes.array.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  onRef: PropTypes.func.isRequired,
  showFavourite: PropTypes.bool.isRequired,
  searchString: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withStyles(styles)(BenefitCardB));
