import React, { Component } from "react";
import Card, { CardContent, CardHeader, CardActions } from "material-ui/Card";
import { Grid, Typography, Button } from "material-ui";

type CardProps = {
  benefit: mixed
};

export class BenefitCard extends Component<CardProps> {
  props: CardProps;

  state = {
    benefit: this.props.benefit
  };

  render() {
    const benefit = this.state.benefit;
    return (
      <Grid item xs={12}>
        <Card>
          <CardHeader title={benefit.type} />
          <CardContent>
            <Typography id="title" variant="title" gutterBottom>
              {benefit.title}
            </Typography>
            <Typography id="description" variant="body1" gutterBottom>
              {benefit.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button>View Details</Button>
          </CardActions>
        </Card>
      </Grid>
    );
  }
}

type CardListProps = {
  benefitList: mixed
};

class BenefitCardList extends Component<CardListProps> {
  props: CardListProps;

  state = {
    info: this.props.benefitList
  };

  render() {
    return this.state.info.map((benefit, i) => (
      <BenefitCard id={"bc" + i} benefit={benefit} key={i} />
    ));
  }
}

export default BenefitCardList;
