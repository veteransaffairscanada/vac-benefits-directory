import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import { Button } from "@material-ui/core";

export class SelectButton extends Component {
  render() {
    return (
      <Card>
        <Button
          target={this.props.target}
          onClick={
            this.props.onClick
              ? () => this.props.onClick(this.props.id)
              : undefined
          }
          fullWidth={true}
          href={this.props.href}
          style={{ backgroundColor: this.props.isDown ? "#aaa" : "#fff" }}
        >
          {this.props.text}
        </Button>
      </Card>
    );
  }
}

SelectButton.propTypes = {
  href: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isDown: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  target: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default SelectButton;
