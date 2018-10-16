import React from "react";
import PropTypes from "prop-types";
import BenefitCard from "./benefit_cards";
import { connect } from "react-redux";

import CircularProgress from "@material-ui/core/CircularProgress";

import { css } from "react-emotion";

const Div = css`
  width: 100%;
  position: fixed;
  left: 50%;
  top: 40%;
`;

export class BenefitList extends React.Component {
  state = {
    loading: false
  };

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.filteredBenefits) !==
      JSON.stringify(prevProps.filteredBenefits)
    ) {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 500);
    }
  }

  cleanSortingPriority = sp => {
    return sp === undefined || ["high", "medium", "low"].indexOf(sp) === -1
      ? "low"
      : sp;
  };

  sortBenefits = (filteredBenefits, language, sortByValue) => {
    filteredBenefits.forEach(b => {
      b.sortingNumber = { high: 1, medium: 2, low: 3 }[
        this.cleanSortingPriority(b.sortingPriority)
      ];
    });

    let sorting_fn = (a, b) => {
      if (
        sortByValue === "alphabetical" ||
        a.sortingNumber === b.sortingNumber
      ) {
        // sort alphabetically
        let vacName = language === "en" ? "vacNameEn" : "vacNameFr";
        let nameA = a[vacName].toUpperCase();
        let nameB = b[vacName].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
      // ascending numeric sort
      return a.sortingNumber - b.sortingNumber;
    };
    return filteredBenefits.sort(sorting_fn);
  };

  render() {
    let { loading } = this.state;
    const sortedBenefits = this.sortBenefits(
      this.props.filteredBenefits,
      this.props.t("current-language-code"),
      this.props.sortByValue
    );

    return loading ? (
      <div className={Div}>
        <CircularProgress size={100} />
      </div>
    ) : (
      sortedBenefits.map((benefit, i) => (
        <BenefitCard
          id={"bc" + i}
          benefit={benefit}
          t={this.props.t}
          key={benefit.id}
          showFavourite={this.props.showFavourites}
          searchString={this.props.searchString}
          store={this.props.store}
        />
      ))
    );
  }
}

const mapStateToProps = reduxState => {
  return {};
};

BenefitList.propTypes = {
  t: PropTypes.func.isRequired,
  filteredBenefits: PropTypes.array.isRequired,
  sortByValue: PropTypes.string.isRequired,
  showFavourites: PropTypes.bool.isRequired,
  searchString: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(BenefitList);
