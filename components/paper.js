import { Component } from "react";
import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../theme";
import AlphaBanner from "./alpha_banner";

class Paper extends Component {
  padding = { sm: "24px", md: "30px", lg: "63px", xl: "96px" };
  paddingMobile = { sm: "15px", md: "19px", lg: "30px", xl: "45px" };
  style = css`
    box-shadow: ${globalTheme.boxShadow};
    padding: ${this.padding[this.props.padding]};
    background-color: white;
    box-sizing: border-box;
    width: 100%;
    @media only screen and (max-width: ${globalTheme.max.xs}) {
      padding: ${this.paddingMobile[this.props.padding]};
    }
  `;
  bannerStyle = css`
    box-shadow: ${globalTheme.boxShadow};
    box-sizing: border-box;
  `;

  render() {
    return (
      <div>
        <div css={this.bannerStyle}>
          {this.props.includeBanner && this.props.url && this.props.t ? (
            <AlphaBanner t={this.props.t} url={this.props.url} />
          ) : null}
        </div>
        <div
          css={
            this.props.styles ? [this.style, this.props.styles] : [this.style]
          }
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

Paper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  padding: PropTypes.string,
  styles: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  url: PropTypes.object,
  t: PropTypes.func,
  includeBanner: PropTypes.bool
};

export default Paper;
