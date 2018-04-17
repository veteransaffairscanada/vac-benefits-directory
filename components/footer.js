import React, { Component } from "react";
import { WordMark } from "@cdssnc/gcui";
import { AppBar, Button, Toolbar, Typography } from "material-ui";
import styled from "react-emotion";

type Props = {
  t: mixed
};

const Div = styled("div")`
  bottom: 0;
  width: 100%;
  background-color: #222;
  color: #000;
  text-align: center;
`;

class Footer extends Component<Props> {
  props: Props;

  render() {
    const envDetails = process.env.CIRCLE_SHA1
      ? process.env.CIRCLE_SHA1
      : process.env.NODE_ENV;

    return (
      <Div>
        <AppBar style={{ backgroundColor: "#DDD" }} position="static">
          <Toolbar>
            <Button id="privacy">{this.props.t("Privacy")}</Button>
            <Typography style={{ flex: 1 }} />
            Build: {envDetails}
            <Typography style={{ flex: 1 }} />
            <WordMark width="6em" flag="#000" />
          </Toolbar>
        </AppBar>
      </Div>
    );
  }
}

export default Footer;
