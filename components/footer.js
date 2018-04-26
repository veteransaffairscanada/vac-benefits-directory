import React, { Component } from "react";
import { WordMark } from "@cdssnc/gcui";
import { Button, Toolbar, Typography } from "material-ui";
import styled from "react-emotion";

type Props = {
  t: mixed
};

const Div = styled("div")`
  width: 100%;
  height: 65px;
  background-color: #ddd;
  color: #000;
  text-align: center;
`;

class Footer extends Component<Props> {
  props: Props;

  render() {
    const envDetails = process.env.CIRCLE_SHA1
      ? process.env.CIRCLE_SHA1.substring(0, 7)
      : process.env.NODE_ENV;

    return (
      <Div role="navigation">
        <Toolbar>
          <Button id="privacy">{this.props.t("Privacy")}</Button>
          <Typography style={{ flex: 1 }} />
          Build: {envDetails}
          <Typography style={{ flex: 1 }} />
          <div>
            <WordMark width="6em" flag="#000" />
          </div>
        </Toolbar>
      </Div>
    );
  }
}

export default Footer;
