import React, { Component } from "react";
import PropTypes from "prop-types";
import { WordMark } from "@cdssnc/gcui";
import { Button, Toolbar, Typography } from "@material-ui/core";
import styled from "react-emotion";

const Div = styled("div")`
  width: 100%;
  height: 65px;
  color: #000;
  text-align: center;
`;

class Footer extends Component {
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

Footer.propTypes = {
  t: PropTypes.func.isRequired
};

export default Footer;
