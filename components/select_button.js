import React, { Component } from "react";
import Card from "material-ui/Card";
import { Button } from "material-ui";

type Props = {
  text: string,
  href: string,
  isDown: boolean,
  onClick: mixed,
  id: string,
  t: mixed
};

export class SelectButton extends Component<Props> {
  props: Props;

  render() {
    return (
      <Card>
        <Button
          onClick={() => this.props.onClick(this.props.id)}
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

export default SelectButton;
