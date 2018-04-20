import React, { Component } from "react";
import Card, { CardContent } from "material-ui/Card";
import { Typography } from "material-ui";

type Props = {
  options: mixed,
  page: string,
  t: mixed
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
      </Card>
    );
  }
}

export default SelectedOptionsCard;
