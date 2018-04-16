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
          <Typography
            id="options"
            variant="body1"
            style={{ textAlign: "center" }}
          >
            {this.props.options.map(option => (
              <p key={option}>
                {" "}
                {this.props.t(this.props.page + "." + option)}{" "}
              </p>
            ))}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default SelectedOptionsCard;
