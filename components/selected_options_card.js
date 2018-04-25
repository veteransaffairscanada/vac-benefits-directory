import React, { Component } from "react";
import Card, { CardContent, CardActions } from "material-ui/Card";
import Button from "material-ui/Button";

import { Typography } from "material-ui";

type Props = {
  options: mixed,
  action: mixed
};

class SelectedOptionsCard extends Component<Props> {
  props: Props;

  render() {
    return (
      <Card style={{ backgroundColor: "#ddd" }}>
        <CardContent>
          {this.props.options.map(option => (
            <Typography
              key={option}
              id={option}
              variant="body1"
              style={{ textAlign: "left" }}
            >
              {option}
            </Typography>
          ))}
        </CardContent>
        <CardActions>
          <Button label="Back" onClick={this.props.action}>
            Back
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default SelectedOptionsCard;
