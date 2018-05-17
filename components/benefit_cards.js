import React, { Component } from "react";
import Card, { CardContent, CardHeader, CardActions } from "material-ui/Card";
import { Grid, Typography, Button } from "material-ui";
import SelectButton from "./select_button";

type Props = {
  benefit: mixed,
  t: mixed
};

export class BenefitTitleCard extends Component<Props> {
  props: Props;

  render() {
    const benefit = this.props.benefit;
    return (
      <Grid item xs={12} sm={4}>
        <SelectButton
          target="_blank"
          text={
            this.props.t("current-language-code") === "en"
              ? benefit.vac_name_en
              : benefit.vac_name_fr
          }
          href={
            this.props.t("current-language-code") === "en"
              ? benefit.benefit_page_en
              : benefit.benefit_page_fr
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
    return (
      <Grid item xs={12} lg={6}>
        <Card>
          <CardContent>
            <Typography className="cardTitle" variant="title" gutterBottom>
              {this.props.t("current-language-code") === "en"
                ? benefit.vac_name_en
                : benefit.vac_name_fr}
            </Typography>
            <Typography
              className="cardDescription"
              variant="body1"
              gutterBottom
            >
              {"Benefit Description"}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              target="_blank"
              href={
                this.props.t("current-language-code") === "en"
                  ? benefit.benefit_page_en
                  : benefit.benefit_page_fr
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
