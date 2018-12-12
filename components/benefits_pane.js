import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import BenefitList from "./benefit_list";
import { connect } from "react-redux";
import {
  getProfileFilters,
  getFilteredBenefitsWithoutSearch,
  getFilteredBenefits
} from "../selectors/benefits";
import { css } from "emotion";
import Header from "./typography/header";
import Body from "./typography/body";
import SearchBox from "./search_box";
import Button from "./button";
import { getLink } from "../utils/common";
import { globalTheme } from "../theme";
import NextSteps from "./next_steps";

const noBenefitsPane = css`
  text-align: center;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
`;
const buttonBar = css`
  margin-top: 40px;
`;
const button = css`
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    margin: 20px;
  }
`;
const title = css`
  padding-bottom: 15px;
`;
const orText = css`
  display: inline-block;
  padding: 0 20px;
  margin-bottom: 0;
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    display: none;
  }
`;
const alignLeft = css`
  text-align: left;
`;

const headerPadding = css`
  padding: 0 12px;
  margin-top: 20px;
`;

export class BenefitsPane extends Component {
  clearFilters = () => {
    this.props.profileQuestions.forEach(q => {
      this.props.saveQuestionResponse(q.variable_name, "");
    });
    this.props.saveQuestionResponse("selectedNeeds", {});
  };

  countSelection = () => {
    const reducer = (acc, obj) => acc + (Object.values(obj)[0] == null ? 0 : 1);
    let count = Object.values(this.props.profileFilters).reduce(reducer, 0);
    return count + Object.values(this.props.selectedNeeds).length;
  };

  countString = (x, t) => {
    switch (true) {
      case this.countSelection() === 0 && this.props.searchString.trim() === "":
        return t("B3.All benefits to consider");
      case x === 1:
        return t("B3.search_results_single");
      default:
        return t("B3.search_results", { x: x });
    }
  };

  filteredResultsHeader = (x, t) => {
    if (this.props.searchString.trim() !== "" && x > 0) {
      return (
        <Header className={headerPadding} size="sm_md" headingLevel="h2">
          {t("B3.results_filtered")}
        </Header>
      );
    } else {
      return "";
    }
  };

  handleSearchChange = event => {
    this.props.setSearchString(event.target.value);
  };

  goToMap = url => {
    const mapLink = getLink(url, "/map", "benefits-directory");
    window.location.assign(mapLink);
  };

  render() {
    const { t, filteredBenefits, nextStepsRef } = this.props; // eslint-disable-line no-unused-vars
    if (this.props.filteredBenefitsWithoutSearch.length === 0) {
      return (
        <div className={noBenefitsPane}>
          <Header size="lg" headingLevel="h1">
            {t("BenefitsPane.no_filtered_benefits")}
          </Header>

          <div className={buttonBar}>
            <Button
              className={button}
              id="reset_filters_button"
              onClick={() => this.clearFilters()}
            >
              {t("BenefitsPane.reset_filters")}
            </Button>

            <Body className={orText}>{t("BenefitsPane.or")}</Body>

            <Button
              className={button}
              id="contact_us_button"
              secondary
              onClick={() => this.goToMap(this.props.url)}
            >
              {t("BenefitsPane.contact_us")}
            </Button>
          </div>
          <Grid item xs={12}>
            <div ref={nextStepsRef} className={alignLeft}>
              <Grid container spacing={24}>
                <NextSteps
                  t={t}
                  url={this.props.url}
                  store={this.props.store}
                />
              </Grid>
            </div>
          </Grid>
        </div>
      );
    } else {
      return (
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Header
              className={"BenefitsCounter " + title}
              size="lg"
              headingLevel="h1"
            >
              {this.countString(filteredBenefits.length, t)}
            </Header>
            {filteredBenefits.length > 0 ? (
              <Body>{t("B3.check eligibility")}</Body>
            ) : (
              ""
            )}
          </Grid>

          <Grid item xs={12}>
            <SearchBox
              inputId="bbSearchField"
              buttonId="searchButtonLink"
              placeholder={this.props.t("search")}
              value={this.props.searchString}
              onChange={this.handleSearchChange}
              disableButton={true}
              onClear={() => this.props.setSearchString("")}
            />
          </Grid>

          <Grid item xs={12}>
            <Grid container spacing={24}>
              {this.filteredResultsHeader(filteredBenefits.length, t)}
              <BenefitList
                t={t}
                filteredBenefits={filteredBenefits}
                searchString={this.props.searchString}
                showFavourites={true}
                store={this.props.store}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <div ref={nextStepsRef}>
              <Grid container spacing={24}>
                <NextSteps
                  t={t}
                  url={this.props.url}
                  store={this.props.store}
                />
              </Grid>
            </div>
          </Grid>
        </Grid>
      );
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveQuestionResponse: (question, response) => {
      dispatch({
        type: "SAVE_QUESTION_RESPONSE",
        data: { [question]: response }
      });
    },
    setSearchString: searchString => {
      dispatch({ type: "SET_SEARCH_STRING", data: searchString });
    }
  };
};

const mapStateToProps = (reduxState, props) => {
  return {
    profileQuestions: reduxState.questions.filter(
      q => q.variable_name !== "needs"
    ),
    profileFilters: getProfileFilters(reduxState, props),
    filteredBenefitsWithoutSearch: getFilteredBenefitsWithoutSearch(
      reduxState,
      props
    ),
    filteredBenefits: getFilteredBenefits(reduxState, props),
    searchString: reduxState.searchString,
    selectedNeeds: reduxState.selectedNeeds,
    reduxState: reduxState
  };
};

BenefitsPane.propTypes = {
  reduxState: PropTypes.object,
  nextStepsRef: PropTypes.object,
  url: PropTypes.object.isRequired,
  profileQuestions: PropTypes.array.isRequired,
  profileFilters: PropTypes.object.isRequired,
  filteredBenefitsWithoutSearch: PropTypes.array.isRequired,
  filteredBenefits: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  printUrl: PropTypes.string,
  searchString: PropTypes.string.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  saveQuestionResponse: PropTypes.func.isRequired,
  setSearchString: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BenefitsPane);
