import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { css } from "emotion";
import HeaderLink from "./header_link";

const greyBanner = css`
  font-family: ${globalTheme.fontFamilySansSerif};
  margin: 30px 0;
  font-weight: 700;
  color: ${globalTheme.colour.greyishBrown};
  font-size: 16px;
  background-color: ${globalTheme.colour.paleGreyTwo};
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    padding-left: 15px;
    padding-right: 15px;
    margin: 11px 0;
  }
`;

const separator = css`
  padding: 0 5px;
  color: ${globalTheme.colour.slateGrey};
  font-weight: normal;
`;

const urlStyle = css`
  color: ${globalTheme.colour.slateGrey};
  text-decoration: underline;
  font-size: 16px;
  font-weight: 700;
`;

const currentPageStyle = css`
  color: ${globalTheme.colour.slateGrey};
  font-size: 16px;
  font-weight: 700;
`;

export class BreadCrumbs extends Component {
  render() {
    const { breadcrumbs, homeUrl } = this.props;
    return (
      <div className={greyBanner}>
        <div>
          <HeaderLink id="homeButton" href={homeUrl} className={urlStyle}>
            {this.props.t("titles.home")}
          </HeaderLink>
          {breadcrumbs.map((breadcrumb, i) => (
            <span key={"breadcrumb" + i}>
              <span className={separator}>{" > "}</span>
              <HeaderLink
                id={"breadcrumb" + i}
                href={breadcrumb.url}
                className={urlStyle}
              >
                {breadcrumb.name}
              </HeaderLink>
            </span>
          ))}
          <span className={separator}>{" > "}</span>
          <span className={currentPageStyle}>{this.props.pageTitle}</span>
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
