import React, { Component } from "react";
import PropTypes from "prop-types";
import { globalTheme } from "../theme";
import { cx, css } from "react-emotion";
import ArrowBack from "@material-ui/icons/ArrowBack";
import ArrowForward from "@material-ui/icons/ArrowForward";
import Bookmark from "@material-ui/icons/Bookmark";
import Print from "@material-ui/icons/Print";
import CloseIcon from "@material-ui/icons/Close";

const style = css`
  display: inline-block;
  font-family: ${globalTheme.fontFamily};
  font-size: 21px;
  font-weight: bold;
  color: ${globalTheme.colour.cerulean};
  text-decoration: none !important;
  :hover {
    text-decoration: underline !important;
    cursor: pointer;
  }
  svg {
    margin-top: -4px;
    vertical-align: middle;
  }
`;
const closeIcon = css`
  font-size: 100% !important;
  margin-left: ${globalTheme.unit};
  font-weight: bold;
`;
const nonMobileStyle = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    display: none;
  }
`;

class HeaderAnchorLink extends Component {
  render() {
    const { id, icon, className, children, nonMobile, onClick } = this.props;
    let propsCopy = JSON.parse(JSON.stringify(this.props));
    delete propsCopy.className;
    delete propsCopy.children;
    delete propsCopy.icon;
    delete propsCopy.nonMobile;
    delete propsCopy.id;
    delete propsCopy.onClick;
    return (
      <a
        className={cx(style, className)}
        id={"a-" + id}
        onClick={onClick}
        {...propsCopy}
      >
        {icon === "arrowBack" ? <ArrowBack /> : null}
        {icon === "bookmark" ? <Bookmark /> : null}
        {icon === "print" ? <Print /> : null}
        {children}
        {nonMobile ? (
          <span className={nonMobileStyle}> {nonMobile} </span>
        ) : null}
        {icon === "arrowForward" ? <ArrowForward /> : null}
        {icon === "close" ? <CloseIcon className={closeIcon} /> : null}
      </a>
    );
  }
}

HeaderAnchorLink.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object
  ]),
  className: PropTypes.string,
  icon: PropTypes.string,
  label: PropTypes.object,
  nonMobile: PropTypes.string,
  onClick: PropTypes.func
};

export default HeaderAnchorLink;
