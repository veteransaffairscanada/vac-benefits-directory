// @flow

import React, { Component } from "react";
import { Grid } from "material-ui";
import Collapse from "material-ui/transitions/Collapse";
import IconButton from "material-ui/IconButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import classnames from "classnames";
import { withStyles } from "material-ui/styles";
import red from "material-ui/colors/red";

import { BenefitCard } from "../components/benefit_cards";
import FilterSelector from "../components/filter_selector";

type Props = {
  id: string,
  t: mixed,
  benefitTypes: mixed,
  patronTypes: mixed,
  benefits: mixed,
  corporaEn: mixed,
  corporaFr: mixed,
  selectedBenefitTypes: mixed,
  selectedPatronTypes: mixed,
  toggleSelectedPatronType: mixed,
  toggleSelectedBenefitType: mixed,
  classes: mixed
};

const styles = theme => ({
  card: {
    maxWidth: 400
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

export class B3 extends Component<Props> {
  props: Props;

  state = {
    expanded: true
  };

  countBenefitsString = (benefits, t) => {
    switch (benefits.length) {
      case 0:
        return t(
          "A3.At this time there are no benefits that match your selections"
        );
      case 1:
        return t("A3.Here is a benefit that may apply to you") + ":";
      default:
        return (
          t("A3.Here are NNN benefits that may apply to you", {
            value: benefits.length
          }) + ":"
        );
    }
  };

  filterBenefits = (benefits, benefitTypes, patronTypes) => {
    return benefits.filter(benefit => {
      const matchingBenefitTypes = benefit.benefit_types.filter(
        bt => benefitTypes.indexOf(bt) > -1
      );
      const matchingPatronTypes = benefit.patron_types.filter(
        pt => patronTypes.indexOf(pt) > -1
      );
      return matchingBenefitTypes.length > 0 && matchingPatronTypes.length > 0;
    });
  };

  enrichBenefit = (benefit, benefitTypes, corporaEn, corporaFr) => {
    let corporas = corporaEn.filter(corp => corp.benefits.includes(benefit.id));
    benefit.linkEn =
      corporas.length > 0 ? corporas[0].full_description_link : undefined;
    benefit.descriptionEn =
      corporas.length > 0 ? corporas[0].one_line_description : undefined;

    corporas = corporaFr.filter(corp => corp.benefits.includes(benefit.id));
    benefit.linkFr =
      corporas.length > 0 ? corporas[0].full_description_link : undefined;
    benefit.descriptionFr =
      corporas.length > 0 ? corporas[0].one_line_description : undefined;

    let bts = benefitTypes.filter(bt => bt.benefits.includes(benefit.id));
    benefit.benefitTypeEn = bts.length > 0 ? bts[0].name_en : "";
    benefit.benefitTypeFr = bts.length > 0 ? bts[0].name_fr : "";
    return benefit;
  };

  handleExpandClick = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { t, classes } = this.props; // eslint-disable-line no-unused-vars

    let benefits = this.filterBenefits(
      this.props.benefits,
      this.props.selectedBenefitTypes,
      this.props.selectedPatronTypes
    );

    // add links to benefits
    benefits = benefits.map(benefit =>
      this.enrichBenefit(
        benefit,
        this.props.benefitTypes,
        this.props.corporaEn,
        this.props.corporaFr
      )
    );

    return (
      <div id={this.props.id}>
        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <h1 id="benefitCountString" style={{ textAlign: "left" }}>
                {this.countBenefitsString(benefits, t)}
              </h1>
            </Grid>
          </Grid>
        </div>

        <div style={{ padding: 12 }}>
          <Grid container spacing={24}>
            <Grid item sm={3} xs={12}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <h2>
                    {t("B3.Filter Benefits")}
                    <IconButton
                      id="expandButton"
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.expanded
                      })}
                      onClick={this.handleExpandClick}
                      aria-expanded={this.state.expanded}
                      aria-label="Show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </h2>
                </Grid>

                <Collapse
                  id="collapseBlock"
                  in={this.state.expanded}
                  timeout="auto"
                  unmountOnExit
                >
                  <Grid item xs={12}>
                    <FilterSelector
                      id="patronTypesFilter"
                      t={t}
                      legend={"B3.Status"}
                      filters={this.props.patronTypes}
                      selectedFilters={this.props.selectedPatronTypes}
                      handleChange={this.props.toggleSelectedPatronType}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FilterSelector
                      id="benefitTypesFilter"
                      t={t}
                      legend={"B3.Needs"}
                      filters={this.props.benefitTypes}
                      selectedFilters={this.props.selectedBenefitTypes}
                      handleChange={this.props.toggleSelectedBenefitType}
                    />
                  </Grid>
                </Collapse>

                <Grid item xs={12}>
                  <p style={{ textAlign: "left", fontSize: "1em" }}>
                    <a
                      className="AllBenefits"
                      href={"all-benefits?lng=" + t("current-language-code")}
                      target="_blank"
                    >
                      {t("Show All Benefits")}
                    </a>
                  </p>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sm={9} xs={12}>
              <Grid container spacing={24}>
                {benefits.map((benefit, i) => (
                  <BenefitCard
                    id={"bc" + i}
                    className="BenefitCards"
                    benefit={benefit}
                    t={this.props.t}
                    key={i}
                  />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(B3);
