import React, { Component } from "react";
import Card from "material-ui/Card";
import { Button } from "material-ui";

type Props = {
  text: string,
  href: string,
  isDown: boolean,
  t: mixed
};

export class MenuButton extends Component<Props> {
  props: Props;

  render() {
    return (
      <Card>
        <Button
          fullWidth={true}
          href={this.props.href}
          style={{ backgroundColor: this.props.isDown ? "#aaa" : "#fff" }}
        >
          {this.props.t(this.props.text)}
        </Button>
      </Card>
    );
  }
}

export default MenuButton;
