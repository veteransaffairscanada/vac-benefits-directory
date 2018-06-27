import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import Typography from "@material-ui/core/Typography";

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

SelectedOptionsCard.propTypes = {
  action: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired
};

export default SelectedOptionsCard;
