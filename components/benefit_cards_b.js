import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Typography, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";
import PriorityHigh from "@material-ui/icons/PriorityHigh";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Highlighter from "react-highlight-words";
import FavouriteButton from "./favourite_button_b";
import Paper from "@material-ui/core/Paper";
import { logEvent } from "../utils/analytics";
import { connect } from "react-redux";
import NeedTag from "./need_tag";

const styles = () => ({
  button: {
    marginTop: "30px"
  },
  cardBottom: {
    backgroundColor: "#f1f7fc",
    borderRadius: "0px",
    borderTop: "1px solid #8b8b8b",
    padding: "15px 0px 15px 24px",
    position: "relative"
  },
  cardTop: {
    backgroundColor: "#f1f7fc",
    borderRadius: "0px",
    borderBottom: "1px solid #8b8b8b",
    padding: "15px 0px 15px 24px",
    position: "relative"
  },
  cardDescriptionText: {
    fontSize: "20px",
    fontWeight: 400,
    padding: "15px 0px"
  },
  collapse: {
    paddingTop: "25px"
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
  expandIcon: {
    color: "#3e57e2",
    marginTop: "40px",
    "&:hover": {
      background: "none"
    }
  },
  ChildBenefitDesc: {
    paddingBottom: "30px"
  },
  children: {
    width: "100%"
  },
  ExampleDesc: {
    paddingBottom: "10px"
  },
  examples: {
    width: "100%",
    marginLeft: "20px"
  },
  benefitName: {
    color: "#3e57e2",
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
  parentIcon: {
    position: "relative",
    marginRight: 5
  },
  headerDesc: {
    position: "absolute"
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

  parentBenefitNames = (parentBenefits, availableIndependently) => {
    if (availableIndependently === "Independent") {
      const nameString = parentBenefits
        .map(b => this.benefitTitle(b))
        .join(", ")
        .replace(/,([^,]*)$/, " or " + "$1");
      return "";
    } else {
      const nameString = parentBenefits
        .map(b => this.benefitTitle(b))
        .join(", ")
        .replace(/,([^,]*)$/, " or " + "$1");
      return this.props.t("benefits_b.needs_parents", {
        x: nameString
      });
    }
  };

  childBenefitNames = childBenefits => {
    const length = childBenefits.length;
    if (length === 1) {
      return this.props.t("benefits_b.eligible_for_single", {
        x: this.benefitTitle(childBenefits[0])
      });
    } else {
      return this.props.t("benefits_b.eligible_for_multi", {
        x: length
      });
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

    const examples =
      typeof benefit.examples !== "undefined" &&
      typeof this.props.examples !== "undefined"
        ? this.props.examples.filter(ex => benefit.examples.indexOf(ex.id) > -1)
        : [];

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
                {this.parentBenefitNames(
                  parentBenefits,
                  benefit.availableIndependently
                )}
              </span>
            </Paper>
          ) : (
            ""
          )}

          <ExpansionPanel
            expanded={this.state.open}
            className={
              this.state.open
                ? classes.ExpansionPanelOpen
                : classes.ExpansionPanelClosed
            }
          >
            <ExpansionPanelSummary
              className={classes.ExpansionPanelSummary}
              expandIcon={
                this.state.open ? (
                  <RemoveIcon className={classes.expandIcon} />
                ) : (
                  <AddIcon className={classes.expandIcon} />
                )
              }
              IconButtonProps={{
                className: classes.expandIcon,
                disableRipple: true
              }}
              onClick={() => this.toggleOpenState()}
            >
              <div>
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
                    toggleOpenState={this.toggleOpenState}
                    store={this.props.store}
                    t={this.props.t}
                  />
                ) : (
                  ""
                )}
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails timeout="auto" className={classes.collapse}>
              <Grid container spacing={24}>
                <Grid item xs={12}>
                  {examples.length > 0 ? (
                    <Typography className={classes.ExampleDesc}>
                      {t("examples") + ":"}
                    </Typography>
                  ) : (
                    ""
                  )}
                  <Typography className={classes.examples}>
                    {examples.map(ex => {
                      return (
                        <li key={ex.id}>
                          {this.props.t("current-language-code") === "en"
                            ? ex.nameEn
                            : ex.nameFr}{" "}
                        </li>
                      );
                    })}
                  </Typography>

                  <Button
                    className={classes.button}
                    target="_blank"
                    variant="raised"
                    style={{ textTransform: "none" }}
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
                  </Button>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          {childBenefits.length > 0 ? (
            <Paper className={classes.cardBottom}>
              <KeyboardReturnIcon className={classes.returnIcon} />
              {this.childBenefitNames(childBenefits)}
            </Paper>
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
    examples: reduxState.examples,
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
  examples: PropTypes.array.isRequired,
  needs: PropTypes.array.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  onRef: PropTypes.func.isRequired,
  showFavourite: PropTypes.bool.isRequired,
  searchString: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withStyles(styles)(BenefitCardB));
