import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { css } from "emotion";
import HomeIcon from "./icons/Home";
import HeaderLink from "./header_link";

const greyBanner = css`
  padding-bottom: 20px;
  margin-bottom: 30px;
  font-weight: bold;
  color: ${globalTheme.colour.greyishBrown};
  font-size: 16px;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    padding-left: 15px;
    padding-right: 15px;
  }
`;

const breadCrumbStyle = css`
  padding-top: 15px;
`;

const separator = css`
  padding: 0 5px;
`;

const urlStyle = css`
  color: #6d6363;
  text-decoration: underline;
  font-size: 16px;
`;

const iconStyle = css`
  vertical-align: bottom;
`;

export class BreadCrumbs extends Component {
  render() {
    const { breadcrumbs, homeUrl } = this.props;
    return (
      <div className={greyBanner}>
        <div className={breadCrumbStyle}>
          <HeaderLink id="homeButton" href={homeUrl} className={urlStyle}>
            <HomeIcon className={iconStyle} /> {this.props.t("titles.home")}
          </HeaderLink>
          {breadcrumbs.map((breadcrumb, i) => (
            <span key={"breadcrumb" + i}>
              <span className={separator}> / </span>
              <HeaderLink
                id={"breadcrumb" + i}
                href={breadcrumb.url}
                className={urlStyle}
              >
                {breadcrumb.name}
              </HeaderLink>
            </span>
          ))}
          <span className={separator}> / </span>
          <span>{this.props.pageTitle}</span>
        </div>
      </div>
    );
  }
}

BreadCrumbs.propTypes = {
  t: PropTypes.func.isRequired,
  breadcrumbs: PropTypes.array.isRequired,
  pageTitle: PropTypes.string.isRequired,
  homeUrl: PropTypes.string
};

export default BreadCrumbs;
