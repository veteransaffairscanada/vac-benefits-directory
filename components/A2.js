// @flow

import React, { Component } from "react";
import { Grid } from "material-ui";
import SelectButton from "../components/select_button";

type Props = {
  t: mixed,
  storeHydrated: boolean,
  patronTypes: mixed,
  url: mixed,
  selectedPatronTypes: mixed,
  switchSection: mixed
};

export class App extends Component<Props> {
  props: Props;

  constructor() {
    super();
    this.state = {
      patronTypes: [],
      selectedPatronTypes: []
    };
  }

  componentWillMount() {
    let newSelectedPatronTypes = {};
    this.props.selectedPatronTypes.map(patronType => {
      newSelectedPatronTypes[patronType] = true;
    });
    this.setState({
      selectedPatronTypes: newSelectedPatronTypes
    });
  }

  toggleButton = id => {
    let selected = this.state.selectedPatronTypes;
    if (selected.hasOwnProperty(id)) {
      delete selected[id];
    } else {
      selected[id] = true;
    }
    this.setState({
      selectedPatronTypes: selected
    });
  };

  render() {
    const { t } = this.props; // eslint-disable-line no-unused-vars

    return (
      <div style={{ padding: 12 }}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <h1 style={{ textAlign: "center" }}>
              {t("A2.What best describes your status?")}
            </h1>
          </Grid>
        </Grid>

        {this.props.patronTypes.map((type, i) => (
          <Grid
            container
            key={i}
            justify="center"
            spacing={24}
            style={{ marginTop: "1em" }}
          >
            <Grid item sm={4} xs={12}>
              <SelectButton
                id={type.id}
                text={
                  t("current-language-code") === "en"
                    ? type.name_en
                    : type.name_fr
                }
                onClick={this.toggleButton}
                isDown={this.state.selectedPatronTypes.hasOwnProperty(type.id)}
              />
            </Grid>
          </Grid>
        ))}

        <Grid
          container
          justify="center"
          spacing={24}
          style={{ marginTop: "3em" }}
        >
          <Grid item sm={4} xs={12}>
            <SelectButton
              text={t("A2.See Results")}
              onClick={() =>
                this.props.switchSection("A3", {
                  selectedPatronTypes: Object.keys(
                    this.state.selectedPatronTypes
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
