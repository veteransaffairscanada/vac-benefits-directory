import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { css } from "react-emotion";
import Container from "./container";
import HomeIcon from "./icons/Home";
import HeaderLink from "./header_link";

const greyBanner = css`
  background-color: ${globalTheme.colour.paleGreyishBrown};
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
  text-decoration: underline;
  font-size: 16px;
`;

const iconStyle = css`
  vertical-align: bottom;
`;

export class BreadCrumbs extends Component {
  render() {
    const { breadcrumbs } = this.props;
    return (
      <div className={greyBanner}>
        <Container>
          <div className={breadCrumbStyle}>
            <HeaderLink href={"/"} className={urlStyle}>
              <HomeIcon className={iconStyle} /> {this.props.t("titles.home")}
            </HeaderLink>
            {breadcrumbs.map((breadcrumb, i) => (
              <span key={"breadcrumb" + i}>
                <span className={separator}> / </span>
                <HeaderLink href={breadcrumb.url} className={urlStyle}>
                  {breadcrumb.name}
                </HeaderLink>
              </span>
            ))}
            <span className={separator}> / </span>
            <span>{this.props.pageTitle}</span>
          </div>
        </Container>
      </div>
    );
  }
}

BreadCrumbs.propTypes = {
  t: PropTypes.func.isRequired,
  breadcrumbs: PropTypes.array.isRequired,
  pageTitle: PropTypes.string.isRequired
};

export default BreadCrumbs;
