import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import BenefitCard from "../components/benefit_cards";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit
  }
});

export class BenefitList extends React.Component {
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
    this.sortBenefits(
      this.props.benefits,
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

    return this.props.filteredBenefits.map(
      (benefit, i) =>
        true || benefit.availableIndependently === "Independant" ? ( // eslint-disable-line no-constant-condition
          <BenefitCard
            id={"bc" + i}
            className="BenefitCards"
            benefit={benefit}
            examples={this.props.examples}
            allBenefits={this.props.benefits}
            veteranBenefitIds={veteranBenefitIds}
            familyBenefitIds={familyBenefitIds}
            t={this.props.t}
            key={benefit.id}
            onRef={this.props.onRef}
          />
        ) : (
          ""
        )
    );
  }
}

BenefitList.propTypes = {
  classes: PropTypes.object,
  t: PropTypes.func,
  filteredBenefits: PropTypes.array,
  eligibilityPaths: PropTypes.array,
  benefits: PropTypes.array,
  examples: PropTypes.array,
  onRef: PropTypes.func,
  sortByValue: PropTypes.string
};

export default withStyles(styles)(BenefitList);
