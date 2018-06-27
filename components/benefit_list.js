import React from "react";
import PropTypes from "prop-types";
import BenefitCard from "../components/benefit_cards";
import CircularProgress from "@material-ui/core/CircularProgress";

import styled from "react-emotion";

const Div = styled("div")`
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
    if (this.props.filteredBenefits !== prevProps.filteredBenefits) {
      this.setState({ loading: true });
      setTimeout(() => {
        this.setState({ loading: false });
      }, 500);
    }
  }

  sortBenefits = (filteredBenefits, language, sortByValue) => {
    filteredBenefits.forEach(b => {
      if (b.sortingPriority === undefined) {
        b.sortingPriority = "low";
      }
      b.sortingNumber = { high: 1, medium: 2, low: 3 }[b.sortingPriority];
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

    let veteranBenefitIds = [];
    let familyBenefitIds = [];

    this.props.eligibilityPaths.forEach(ep => {
      if (ep.patronType === "service-person") {
        veteranBenefitIds = veteranBenefitIds.concat(ep.benefits);
      }
      if (ep.patronType === "family") {
        familyBenefitIds = familyBenefitIds.concat(ep.benefits);
      }
    });
    return loading ? (
      <Div>
        <CircularProgress size={100} />
      </Div>
    ) : (
      sortedBenefits.map(
        (benefit, i) =>
          true || benefit.availableIndependently === "Independent" ? ( // eslint-disable-line no-constant-condition
            <BenefitCard
              id={"bc" + i}
              benefit={benefit}
              examples={this.props.examples}
              allBenefits={this.props.benefits}
              veteranBenefitIds={veteranBenefitIds}
              familyBenefitIds={familyBenefitIds}
              t={this.props.t}
              key={benefit.id}
              onRef={this.props.onRef}
              toggleFavourite={this.props.toggleFavourite}
              favouriteBenefits={this.props.favouriteBenefits}
              showFavourite={this.props.showFavourites}
              searchString={this.props.searchString}
            />
          ) : (
            ""
          )
      )
    );
  }
}

BenefitList.propTypes = {
  t: PropTypes.func.isRequired,
  filteredBenefits: PropTypes.array.isRequired,
  eligibilityPaths: PropTypes.array.isRequired,
  benefits: PropTypes.array.isRequired,
  examples: PropTypes.array.isRequired,
  onRef: PropTypes.func.isRequired,
  sortByValue: PropTypes.string.isRequired,
  favouriteBenefits: PropTypes.array.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
  showFavourites: PropTypes.bool.isRequired,
  searchString: PropTypes.string.isRequired
};

export default BenefitList;
