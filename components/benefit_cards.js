import React, { Component } from "react";
import Card, { CardContent, CardHeader, CardActions } from "material-ui/Card";
import { Grid, Typography, Button } from "material-ui";
import SelectButton from "./select_button";

type CardProps = {
  benefit: mixed,
  t: mixed
};

export class BenefitTitleCard extends Component<CardProps> {
  props: CardProps;

  render() {
    const benefit = this.props.benefit;
    return (
      <Grid item xs={12} sm={4}>
        <SelectButton
          text={
            this.props.t("current-language-code") === "en"
              ? benefit.vac_name_en
              : benefit.vac_name_fr
          }
          href={
            this.props.t("current-language-code") === "en"
              ? benefit.linkEn
              : benefit.linkFr
          }
          isDown={false}
          id="title"
        />
      </Grid>
    );
  }
}

type Props = {
  benefits: mixed,
  t: mixed
};

export class BenefitTitleCardList extends Component<CardListProps> {
  props: Props;

  render() {
    return this.props.benefits.map((benefit, i) => (
      <BenefitTitleCard
        id={"bc" + i}
        benefit={benefit}
        t={this.props.t}
        key={i}
      />
    ));
  }
}

export class BenefitCard extends Component<CardProps> {
  props: CardProps;

  state = {
    benefit: this.props.benefit
  };

  render() {
    const benefit = this.state.benefit;
    return (
      <Grid item xs={12} lg={6}>
        <Card>
          <CardHeader title={this.props.t(benefit.type).toUpperCase()} />
          <CardContent>
            <Typography id="title" variant="title" gutterBottom>
              {this.props.t(benefit.title)}
            </Typography>
            <Typography id="description" variant="body1" gutterBottom>
              {this.props.t(benefit.description)}
            </Typography>
          </CardContent>
          <CardActions>
            <Button>{this.props.t("View Details")}</Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

type CardListProps = {
  benefitList: mixed,
  t: mixed
};

class BenefitCardList extends Component<CardListProps> {
  props: CardListProps;

  state = {
    benefits: this.props.benefitList
  };

  render() {
    return this.state.benefits.map((benefit, i) => (
      <BenefitCard id={"bc" + i} benefit={benefit} t={this.props.t} key={i} />
    ));
  }
}

export default BenefitCardList;
