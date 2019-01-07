import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import BenefitList from "./benefit_list";
import { connect } from "react-redux";
import {
  getProfileFilters,
  getFilteredBenefitsWithoutSearch,
  getNonFilteredBenefitsWithoutSearch,
  getFilteredBenefits,
  getNonFilteredBenefits
} from "../selectors/benefits";
import { css } from "emotion";
import Header from "./typography/header";
import Body from "./typography/body";
import SearchBox from "./search_box";
import { getLink, getBenefitCountString } from "../utils/common";
import NextSteps from "./next_steps";
import { NoResultsButtons } from "./no_results_buttons";
import { ResultsHeader } from "./results_header";

const noBenefitsPane = css`
  text-align: center;
  text-align: center;
  margin: 0 auto;
`;
const title = css`
  padding-bottom: 15px;
`;
const spacer = css`
  margin-top: 40px;
  width: 100%;
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

  countString = x => {
    const t = this.props.t;
    switch (true) {
      case this.countSelection() === 0 && this.props.searchString.trim() === "":
        return t("B3.All benefits to consider");
      case this.props.searchString.trim() === "":
        return getBenefitCountString(x, t);
      case x.length === 1:
        return t("B3.search_results_single");
      default:
        return t("B3.search_results", { x: x.length });
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
    const {
      t,
      filteredBenefits,
      filteredBenefitsWithoutSearch,
      nonFilteredBenefits,
      nextStepsRef,
      searchString,
      reduxState,
      store,
      setSearchString,
      url
    } = this.props; // eslint-disable-line no-unused-vars
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Header
            className={"BenefitsCounter " + title}
            size="lg"
            headingLevel="h1"
            autoFocus={true}
          >
            {filteredBenefitsWithoutSearch.length === 0
              ? t("BenefitsPane.no_filtered_benefits")
              : this.countString(
                  filteredBenefits.concat(
                    searchString.trim() === "" ? [] : nonFilteredBenefits
                  )
                )}
          </Header>
          {filteredBenefitsWithoutSearch.length === 0 ? (
            <NoResultsButtons
              clearFilters={this.clearFilters}
              url={this.props.url}
              goToMap={this.goToMap}
              t={t}
            />
          ) : filteredBenefits.length > 0 ? (
            <Body>{t("B3.check eligibility")}</Body>
          ) : null}
        </Grid>

        {filteredBenefitsWithoutSearch.length === 0 ? null : (
          <React.Fragment>
            <Grid item xs={12}>
              <SearchBox
                inputId="bbSearchField"
                buttonId="searchButtonLink"
                placeholder={t("search")}
                value={searchString}
                onChange={this.handleSearchChange}
                disableButton={true}
                onClear={() => setSearchString("")}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={24}>
                <ResultsHeader
                  benefitCount={filteredBenefits.length}
                  headerText={
                    filteredBenefitsWithoutSearch.length ==
                    reduxState.benefits.length
                      ? t("B3.results_all_benefits")
                      : t("B3.results_filtered")
                  }
                  searchString={searchString}
                />
                <BenefitList
                  t={t}
                  filteredBenefits={filteredBenefits}
                  searchString={searchString}
                  showFavourites={true}
                  store={store}
                />

                {nonFilteredBenefits.length > 0 ? (
                  <div className={spacer} />
                ) : null}
                <ResultsHeader
                  benefitCount={nonFilteredBenefits.length}
                  headerText={t("B3.results_all_benefits")}
                  searchString={searchString}
                />

                {searchString.trim() === "" ? null : (
                  <BenefitList
                    t={t}
                    filteredBenefits={nonFilteredBenefits}
                    searchString={searchString}
                    showFavourites={true}
                    store={store}
                  />
                )}
              </Grid>
            </Grid>
          </React.Fragment>
        )}

        <Grid item xs={12}>
          <div ref={nextStepsRef}>
            <Grid container spacing={24}>
              <NextSteps t={t} url={url} store={store} />
            </Grid>
          </div>
        </Grid>
      </Grid>
    );
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
    nonFilteredBenefitsWithoutSearch: getNonFilteredBenefitsWithoutSearch(
      reduxState,
      props
    ),
    filteredBenefits: getFilteredBenefits(reduxState, props),
    nonFilteredBenefits: getNonFilteredBenefits(reduxState, props),
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
  nonFilteredBenefits: PropTypes.array.isRequired,
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
