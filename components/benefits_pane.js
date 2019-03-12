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
import SearchBox from "./search_box";
import { getLink, getBenefitCountString } from "../utils/common";
import NoResultsButtons from "./no_results_buttons";
import ResultsHeader from "./results_header";

const title = css`
  padding-bottom: 15px;
`;
const spacer = css`
  margin-top: 40px;
  width: 100%;
`;
const bottomPadding = css`
  padding-bottom: 50px;
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

  render() {
    const {
      t,
      filteredBenefits,
      filteredBenefitsWithoutSearch,
      nonFilteredBenefits,
      searchString,
      reduxState,
      store,
      setSearchString
    } = this.props; // eslint-disable-line no-unused-vars
    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Header
            className={"BenefitsCounter " + title}
            size="md"
            headingLevel="h3"
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
              t={t}
            />
          ) : null}
        </Grid>

        {filteredBenefitsWithoutSearch.length === 0 ? null : (
          <React.Fragment>
            <Grid item xs={12}>
              <div className={bottomPadding}>
                <SearchBox
                  inputId="bbSearchField"
                  buttonId="searchButtonLink"
                  placeholder={t("search")}
                  value={searchString}
                  onChange={this.handleSearchChange}
                  disableButton={true}
                  onClear={() => setSearchString("")}
                />
              </div>
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
                  currentLanguage={t("current-language-code")}
                  filteredBenefits={filteredBenefits}
                  searchString={searchString}
                  savedList={true}
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
                {filteredBenefits.length === 0 &&
                nonFilteredBenefits.length === 0 ? (
                  <ResultsHeader
                    benefitCount={1}
                    headerText={t("B3.search_tip")}
                    searchString={searchString}
                  />
                ) : null}

                {searchString.trim() === "" ? null : (
                  <BenefitList
                    t={t}
                    currentLanguage={t("current-language-code")}
                    filteredBenefits={nonFilteredBenefits}
                    searchString={searchString}
                    savedList={true}
                    store={store}
                  />
                )}
              </Grid>
            </Grid>
          </React.Fragment>
        )}
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
