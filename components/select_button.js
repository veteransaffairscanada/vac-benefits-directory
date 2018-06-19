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
  action: PropTypes.func,
  href: PropTypes.string,
  id: PropTypes.string,
  isDown: PropTypes.bool,
  onClick: PropTypes.func,
  t: PropTypes.func,
  target: PropTypes.string,
  text: PropTypes.string
};

export default SelectButton;
