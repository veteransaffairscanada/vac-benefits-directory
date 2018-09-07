import React, { Component } from "react";
import PropTypes from "prop-types";
import { WordMark } from "@cdssnc/gcui";
import { Toolbar } from "@material-ui/core";
import { css } from "react-emotion";
import FooterLink from "./footer_link";

const root = css`
  width: 100%;
  background-color: #434343;
  height: 65px;
  text-align: center;
`;

const toolbar = css`
  padding: 0 !important;
  margin-left: 15px;
  margin-right: 15px;
  height: 100%;
`;

const envDetailsStyling = css`
  flex: 1;
  color: #fff;
`;

const wordMark = css`
  height: 25px;
`;

class Footer extends Component {
  render() {
    const envDetails = process.env.CIRCLE_SHA1
      ? process.env.CIRCLE_SHA1.substring(0, 7)
      : process.env.NODE_ENV;

    return (
      <div className={root} role="navigation">
        <Toolbar className={toolbar}>
          <FooterLink
            id="privacy"
            href={this.props.t("privacy-link")}
            target="_blank"
            rel="noopener noreferrer"
          >
            {this.props.t("Privacy")}
          </FooterLink>
          <p className={envDetailsStyling}>Build: {envDetails}</p>
          <div className={wordMark}>
            <WordMark width="6em" flag="#fff" text="#fff" />
          </div>
        </Toolbar>
      </div>
    );
  }
}

Footer.propTypes = {
  t: PropTypes.func.isRequired
};

export default Footer;
