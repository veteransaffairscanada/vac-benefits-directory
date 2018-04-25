// @flow

import React, { Component } from "react";
import { Grid } from "material-ui";
import Link from "next/link";
import SelectButton from "../components/select_button";

type Props = {
  i18n: mixed,
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
      selectedBenefitTypes: []
    };
  }

  toggleButton = id => {
    let selected = this.state.selectedBenefitTypes;
    const index = selected.indexOf(id);
    if (index >= 0) {
      selected.splice(index, 1);
    } else {
      selected.push(id);
    }
    this.setState({
      selectedBenefitTypes: selected
    });
  };

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars
    return (
      <div style={{ padding: 12 }}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <p style={{ textAlign: "center", fontSize: "2em" }}>
              {t("A1.What services are you interested in?")}
            </p>
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
                isDown={this.state.selectedBenefitTypes.indexOf(type.id) >= 0}
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
              onClick={() => this.props.switchSection("A2", this.state)}
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
              <Link href="all-benefits">
                <a>{t("Show All Benefits")}</a>
              </Link>
            </p>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
