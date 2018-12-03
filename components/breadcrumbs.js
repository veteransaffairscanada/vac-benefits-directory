import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { css } from "react-emotion";
import Container from "./container";
import HomeIcon from "./icons/Home";

const whiteBanner = css`
  background-color: #fff;
  width: 100%;
  padding-bottom: 20px;
  margin-bottom: 30px;
  font-weight: bold;
  color: ${globalTheme.colour.greyishBrown};
  font-size: 16px;
`;

const breadCrumbStyle = css`
  padding-top: 15px;
`;

const separator = css`
  padding: 0 5px;
`;

const urlStyle = css`
  color: #6d6363;
`;

const iconStyle = css`
  vertical-align: bottom;
`;

export class Breadcrumbs extends Component {
  render() {
    return (
      <div className={whiteBanner}>
        <Container>
          <div className={breadCrumbStyle}>
            <a href={this.props.url} className={urlStyle}>
              <HomeIcon className={iconStyle} /> Home
            </a>
            <span className={separator}> / </span>
            <span>{this.props.pageTitle}</span>
          </div>
        </Container>
      </div>
    );
  }
}

Breadcrumbs.propTypes = {
  t: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  pageTitle: PropTypes.string.isRequired
};

export default Breadcrumbs;
