import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import BenefitList from "./benefit_list";
import { connect } from "react-redux";
import {
  getFilteredBenefitsWithoutSearch,
  getFilteredBenefits
} from "../selectors/benefits";
import { css } from "react-emotion";
import Header2 from "./typography/header2";
import Body from "./typography/body";
import SearchBox from "./search_box";
import Dropdown from "./dropdown";
import Button from "./button";
import { getLink } from "../utils/common";
import { globalTheme } from "../theme";

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

export class BenefitsPane extends Component {
  clearFilters = () => {
    this.props.profileQuestions.forEach(q => {
      this.props.saveQuestionResponse(q.variable_name, "");
    });
    this.props.saveQuestionResponse("selectedNeeds", {});
  };

  handleSortByChange = event => {
    this.props.setSortBy(event.target.value);
  };

  countSelection = () => {
    const reducer = (acc, obj) => acc + (Object.values(obj)[0] == null ? 0 : 1);
    let count = Object.values(this.props.selectedEligibility).reduce(
      reducer,
      0
    );
    return count + Object.values(this.props.selectedNeeds).length;
  };

  countString = (x, t) => {
    switch (true) {
      case this.countSelection() === 0 && this.props.searchString.trim() === "":
        return t("B3.All benefits to consider");
      case x === 0:
        return t("B3.No benefits");
      case x === 1:
        return t("B3.One benefit");
      default:
        return t("B3.x benefits to consider", { x: x });
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
    const { t } = this.props; // eslint-disable-line no-unused-vars
    const filteredBenefits = this.props.filteredBenefits;

    if (this.props.filteredBenefitsWithoutSearch.length === 0) {
      return (
        <div className={noBenefitsPane}>
          <Header2>{t("BenefitsPane.no_filtered_benefits")}</Header2>

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
        </div>
      );
    } else {
      return (
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Header2 className={"BenefitsCounter " + title}>
              {this.countString(filteredBenefits.length, t)}
            </Header2>
            {filteredBenefits.length > 0 ? (
              <Body>{t("B3.check eligibility")}</Body>
            ) : (
              ""
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <Dropdown
              value={this.props.sortBy}
              onChange={this.handleSortByChange}
              label={t("B3.Sort By")}
              id="sortBySelector"
            >
              <option value="relevance">{t("B3.Popularity")}</option>
              <option value="alphabetical">{t("B3.Alphabetical")}</option>
            </Dropdown>
          </Grid>

          <Grid item xs={12} md={6}>
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
              <BenefitList
                t={t}
                filteredBenefits={filteredBenefits}
                sortByValue={this.props.sortBy}
                searchString={this.props.searchString}
                showFavourites={true}
                store={this.props.store}
              />
            </Grid>
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
    },
    setSortBy: sortBy => {
      dispatch({ type: "SET_SORT_BY", data: sortBy });
    }
  };
};

const mapStateToProps = (reduxState, props) => {
  return {
    profileQuestions: reduxState.questions.filter(
      q => q.variable_name !== "needs"
    ),
    filteredBenefitsWithoutSearch: getFilteredBenefitsWithoutSearch(
      reduxState,
      props
    ),
    filteredBenefits: getFilteredBenefits(reduxState, props),
    searchString: reduxState.searchString,
    selectedEligibility: {
      patronType: reduxState.patronType,
      serviceType: reduxState.serviceType,
      statusAndVitals: reduxState.statusAndVitals,
      serviceHealthIssue: reduxState.serviceHealthIssue
    },
    selectedNeeds: reduxState.selectedNeeds,
    sortBy: reduxState.sortBy
  };
};

BenefitsPane.propTypes = {
  url: PropTypes.object.isRequired,
  profileQuestions: PropTypes.array.isRequired,
  filteredBenefitsWithoutSearch: PropTypes.array.isRequired,
  filteredBenefits: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  printUrl: PropTypes.string,
  searchString: PropTypes.string.isRequired,
  selectedEligibility: PropTypes.object.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  saveQuestionResponse: PropTypes.func.isRequired,
  setSearchString: PropTypes.func.isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BenefitsPane);
