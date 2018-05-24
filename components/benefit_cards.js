import React, { Component } from "react";
import Card, { CardContent } from "material-ui/Card";
import { Grid, Typography, Button } from "material-ui";
import EmbeddedBenefitCard from "./embedded_benefit_card";

type Props = {
  benefit: mixed,
  allBenefits: mixed,
  t: mixed
};

const buttonStyles = {
  float: "right",
  marginTop: "10px"
};

export class BenefitCard extends Component<Props> {
  props: Props;

  render() {
    const benefit = this.props.benefit;
    const style = {
      padding: "30px 0px"
    };
    const childBenefits = benefit.childBenefits
      ? this.props.allBenefits.filter(
          ab => benefit.childBenefits.indexOf(ab.id) > -1
        )
      : [];

    return (
      <Grid item xs={12} lg={6}>
        <Card>
          <Button
            style={buttonStyles}
            target="_blank"
            href={
              this.props.t("current-language-code") === "en"
                ? benefit.benefitPageEn
                : benefit.benefitPageFr
            }
          >
            {this.props.t("View Details")}
          </Button>

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
              {childBenefits.length > 0 ? (
                <div width="100%" style={style}>
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
                </div>
              ) : (
                <div />
              )}
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}
