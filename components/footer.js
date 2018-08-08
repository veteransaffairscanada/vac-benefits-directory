import React, { Component } from "react";
import PropTypes from "prop-types";
import { WordMark } from "@cdssnc/gcui";
import { Button, Toolbar, Typography } from "@material-ui/core";
import styled from "react-emotion";

const Div = styled("div")`
  width: 100%;
  background-color: #434343;
  height: 65px;
  color: #fff;
  text-align: center;
`;

class Footer extends Component {
  render() {
    const envDetails = process.env.CIRCLE_SHA1
      ? process.env.CIRCLE_SHA1.substring(0, 7)
      : process.env.NODE_ENV;

    return (
      <Div role="navigation">
        <Toolbar style={{ padding: 0 }}>
          <Button
            id="privacy"
            style={{ color: "#fff", paddingLeft: 0, textTransform: "none" }}
            href={this.props.t("privacy-link")}
            target="_blank"
          >
            {this.props.t("Privacy")}
          </Button>
          <Typography style={{ flex: 1 }} />
          Build: {envDetails}
          <Typography style={{ flex: 1 }} />
          <div>
            <WordMark width="6em" flag="#fff" text="#fff" />
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
