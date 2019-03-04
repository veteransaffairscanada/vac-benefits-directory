import React from "react";
import PropTypes from "prop-types";
import BenefitCard from "./benefit_cards";

import CircularProgress from "@material-ui/core/CircularProgress";

import { css } from "emotion";

const Div = css`
  width: 100%;
  position: fixed;
  left: 50%;
  top: 40%;
`;

const list = css`
  width: 100%;
  list-style: none;
  padding-left: 0;
  margin-top: 0;
  > li {
    padding: 12px;
  }
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

  sortBenefits = filteredBenefits => {
    filteredBenefits.forEach(b => {
      b.sortingNumber = { high: 1, medium: 2, low: 3 }[
        this.cleanSortingPriority(b.sortingPriority)
      ];
    });

    let sorting_fn = (a, b) => {
      if (a.sortingNumber === b.sortingNumber) {
        // sort alphabetically
        let nameA = a.vacNameEn.toUpperCase();
        let nameB = b.vacNameEn.toUpperCase(); // ignore upper and lowercase
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
      currentLanguage,
      searchString,
      savedList,
      store
    } = this.props;
    const sortedBenefits = searchString
      ? filteredBenefits
      : this.sortBenefits(filteredBenefits);

    return loading ? (
      <div className={Div}>
        <CircularProgress size={100} />
      </div>
    ) : (
      <ul className={list}>
        {sortedBenefits.map((benefit, i) => (
          <li
            key={benefit.id}
            aria-label={
              this.props.t("current-language-code") === "en"
                ? benefit.vacNameEn
                : benefit.vacNameFr
            }
          >
            <BenefitCard
              id={"bc" + i}
              benefit={benefit}
              t={t}
              currentLanguage={currentLanguage}
              key={benefit.id}
              savedList={savedList}
              store={store}
            />
          </li>
        ))}
      </ul>
    );
  }
}

BenefitList.propTypes = {
  t: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  filteredBenefits: PropTypes.array.isRequired,
  savedList: PropTypes.bool.isRequired,
  searchString: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default BenefitList;
