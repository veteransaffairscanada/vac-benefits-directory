// @flow

import React, { Component } from "react";
import { Grid } from "material-ui";
import SelectButton from "../components/select_button";

type Props = {
  t: mixed,
  storeHydrated: boolean,
  benefitTypes: mixed,
  selectedBenefitTypes: mixed,
  switchSection: mixed
};

export class App extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      selectedBenefitTypes: {}
    };
  }

  componentWillMount() {
    let newSelectedBenefitTypes = {};
    this.props.selectedBenefitTypes.map(benefitType => {
      newSelectedBenefitTypes[benefitType] = true;
    });
    this.setState({
      selectedBenefitTypes: newSelectedBenefitTypes
    });
  }

  toggleButton = id => {
    let selected = this.state.selectedBenefitTypes;
    if (selected.hasOwnProperty(id)) {
      delete selected[id];
    } else {
      selected[id] = true;
    }
    this.setState({
      selectedBenefitTypes: selected
    });
  };

  render() {
    const { t } = this.props; // eslint-disable-line no-unused-vars
    return (
      <div style={{ padding: 12 }}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1 style={{ textAlign: "center" }}>
              {t("A1.What services are you interested in?")}
            </h1>
            <p style={{ textAlign: "center", fontSize: "1.5em" }}>
              {t("A1.Select all that apply")}
            </p>
          </Grid>

          {this.props.benefitTypes.map((type, i) => (
            <Grid key={i} item sm={4} xs={12}>
              <SelectButton
                id={type.id}
                text={
                  t("current-language-code") === "en"
                    ? type.name_en
                    : type.name_fr
                }
                onClick={this.toggleButton}
                isDown={this.state.selectedBenefitTypes.hasOwnProperty(type.id)}
              />
            </Grid>
          ))}
        </Grid>

        <Grid
          container
          justify="center"
          spacing={24}
          style={{ marginTop: "3em" }}
        >
          <Grid item sm={4} xs={12}>
            <SelectButton
              text={t("A1.Next")}
              onClick={() =>
                this.props.switchSection("A2", {
                  selectedBenefitTypes: Object.keys(
                    this.state.selectedBenefitTypes
                  )
                })
              }
              isDown={false}
            />
          </Grid>
        </Grid>

        <Grid
          container
          justify="center"
          spacing={24}
          style={{ marginTop: "1em" }}
        >
          <Grid item sm={4} xs={12}>
            <p style={{ textAlign: "center", fontSize: "1em" }}>
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
      </div>
    );
  }
}

export default App;
