import React, { Component } from "react";
import Card, { CardContent, CardActions } from "material-ui/Card";
import Button from "material-ui/Button";

import { Typography } from "material-ui";

class SelectedOptionsCard extends Component {
  render() {
    return (
      <Card id={this.props.id} style={{ backgroundColor: "#ddd" }}>
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
          <Button id="ChangeButton" onClick={this.props.action}>
            {this.props.t("Change")}
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default SelectedOptionsCard;
