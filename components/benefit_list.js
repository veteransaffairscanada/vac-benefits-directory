import React from "react";
import PropTypes from "prop-types";
import BenefitCard from "./benefit_cards";
import Button from "./button";

import CircularProgress from "@material-ui/core/CircularProgress";

/** @jsx jsx */
import { css, jsx } from "@emotion/core";

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

const center = css`
  text-align: center;
  padding-top: 25px;
`;

export class BenefitList extends React.Component {
  state = {
    loading: false,
    limit: 5 //should initialze to airtable value
  };

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.filteredBenefits) !==
      JSON.stringify(prevProps.filteredBenefits)
    ) {
      this.state.limit = 5;
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 500);
    }
  }

  onLoadMore = () => {
    this.setState({
      limit: this.state.limit + 5 //the 5 should be an airtable variable
    });
  };

  cleanSortingPriority = sp => {
    let ARBITRARY_HIGH_NUM = 5000;
    let sortNum = parseInt(sp, 10);
    return sp === undefined || !Number.isInteger(sortNum)
      ? ARBITRARY_HIGH_NUM
      : sortNum;
  };

  sortBenefits = filteredBenefits => {
    filteredBenefits.forEach(b => {
      b.sortingNumber = [this.cleanSortingPriority(b.sortOrder)];
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
      <div css={Div}>
        <CircularProgress size={100} />
      </div>
    ) : (
      <ul css={list}>
        {sortedBenefits.slice(0, this.state.limit).map((benefit, i) => (
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

        {this.state.limit >= sortedBenefits.length ? null : (
          <div css={center}>
            <Button
              arrow={false}
              tabIndex="-1"
              mobileFullWidth={true}
              onClick={() => this.onLoadMore()}
            >
              {t("Load more")} {this.state.limit + 1} -{" "}
              {sortedBenefits.length < this.state.limit + 5
                ? sortedBenefits.length
                : this.state.limit + 5}
            </Button>
          </div>
        )}
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
