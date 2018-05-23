import React, { Component } from "react";
import Card, { CardContent, CardActions } from "material-ui/Card";
import { Grid, Typography, Button } from "material-ui";
import SelectButton from "./select_button";

type Props = {
  benefit: mixed,
  allBenefits: mixed,
  t: mixed
};

export class EmbeddedBenefitCard extends Component<Props> {
  props: Props;

  render() {
    const benefit = this.props.benefit;
    return (
      <Grid item xs={12}>
        <SelectButton
          target="_blank"
          text={
            this.props.t("current-language-code") === "en"
              ? benefit.vacNameEn
              : benefit.vacNameFr
          }
          href={
            this.props.t("current-language-code") === "en"
              ? benefit.benefitPageEn
              : benefit.benefitPageFr
          }
          isDown={false}
          id="title"
        />
      </Grid>
    );
  }
}

export class BenefitCard extends Component<Props> {
  props: Props;

  render() {
    const benefit = this.props.benefit;

    const childBenefits = benefit.childBenefits
      ? this.props.allBenefits.filter(
          ab => benefit.childBenefits.indexOf(ab.id) > -1
        )
      : [];

    return (
      <Grid item xs={12} lg={6}>
        <Card>
          <CardContent>
            <Typography className="cardTitle" variant="title" gutterBottom>
              {this.props.t("current-language-code") === "en"
                ? benefit.vacNameEn
                : benefit.vacNameFr}
            </Typography>
            <Typography
              className="cardDescription"
              variant="body1"
              gutterBottom
            >
              {"Benefit Description"}
            </Typography>

            <Grid container spacing={24}>
              {childBenefits.map((cb, i) => (
                <EmbeddedBenefitCard
                  id={"cb" + i}
                  className="BenefitCards"
                  benefit={cb}
                  allBenefits={this.props.allBenefits}
                  t={this.props.t}
                  key={i}
                />
              ))}
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              target="_blank"
              href={
                this.props.t("current-language-code") === "en"
                  ? benefit.benefitPageEn
                  : benefit.benefitPageFr
              }
            >
              {this.props.t("View Details")}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}
