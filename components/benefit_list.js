/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import BenefitCard from "./benefit_cards";

import CircularProgress from "@material-ui/core/CircularProgress";

import { css, jsx } from "@emotion/core";

const Div = css`
  width: 100%;
  position: fixed;
  left: 50%;
  top: 40%;
`;

export class BenefitList extends Component {
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

  sortBenefits = (filteredBenefits, language) => {
    filteredBenefits.forEach(b => {
      b.sortingNumber = { high: 1, medium: 2, low: 3 }[
        this.cleanSortingPriority(b.sortingPriority)
      ];
    });

    let sorting_fn = (a, b) => {
      if (a.sortingNumber === b.sortingNumber) {
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
    let {
      filteredBenefits,
      t,
      searchString,
      showFavourites,
      store
    } = this.props;
    const sortedBenefits = searchString
      ? filteredBenefits
      : this.sortBenefits(filteredBenefits, t("current-language-code"));

    return loading ? (
      <div css={Div}>
        <CircularProgress size={100} />
      </div>
    ) : (
      sortedBenefits.map((benefit, i) => (
        <BenefitCard
          id={"bc" + i}
          benefit={benefit}
          t={t}
          key={benefit.id}
          showFavourite={showFavourites}
          searchString={searchString}
          store={store}
        />
      ))
    );
  }
}

BenefitList.propTypes = {
  t: PropTypes.func.isRequired,
  filteredBenefits: PropTypes.array.isRequired,
  showFavourites: PropTypes.bool.isRequired,
  searchString: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default BenefitList;
