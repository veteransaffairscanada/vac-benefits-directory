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
    resultsShown: parseInt(this.props.t("loadmore.num")),
    loadNumber: parseInt(this.props.t("loadmore.num"))
  };

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.filteredBenefits) !==
      JSON.stringify(prevProps.filteredBenefits)
    ) {
      this.state.resultsShown = this.state.loadNumber;
      this.props.parentCallback(this.state.resultsShown);
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 500);
    }
  }

  componentDidMount() {
    this.props.parentCallback(this.state.resultsShown);
  }

  onLoadMore = () => {
    this.setState(
      {
        resultsShown: this.state.resultsShown + this.state.loadNumber
      },
      this.sendToParent
    );
  };

  getLoadMore = () => {};

  sendToParent = () => {
    this.props.parentCallback(this.state.resultsShown);
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
      store,
      showAllBenefits,
      parentCallback
    } = this.props;
    const sortedBenefits = searchString
      ? filteredBenefits
      : this.sortBenefits(filteredBenefits);
    return loading ? (
      <div css={Div}>
        <CircularProgress size={100} />
      </div>
    ) : (
      <div>
        <ul css={list}>
          {sortedBenefits
            .slice(
              0,
              showAllBenefits ? sortedBenefits.length : this.state.resultsShown
            )
            .map((benefit, i) => (
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
        <div css={center}>
          {showAllBenefits ||
          this.state.resultsShown >= sortedBenefits.length ? null : (
            <Button
              arrow={false}
              tabIndex="-1"
              mobileFullWidth={true}
              onClick={() => this.onLoadMore()}
            >
              <div>
                {this.getLoadMore()}
                {t("Load more")} {this.state.resultsShown + 1} -{" "}
                {sortedBenefits.length <
                this.state.resultsShown + this.state.loadNumber
                  ? sortedBenefits.length
                  : this.state.resultsShown + this.state.loadNumber}
              </div>
            </Button>
          )}
        </div>
      </div>
    );
  }
}

BenefitList.propTypes = {
  t: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  filteredBenefits: PropTypes.array.isRequired,
  savedList: PropTypes.bool.isRequired,
  searchString: PropTypes.string.isRequired,
  store: PropTypes.object,
  showAllBenefits: PropTypes.bool.isRequired,
  parentCallback: PropTypes.func
};

export default BenefitList;
