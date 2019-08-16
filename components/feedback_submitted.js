import { Component } from "react";
import { globalTheme } from "../theme";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import HeaderLink from "../components/header_link";
import PropTypes from "prop-types";
import { mutateUrl } from "../utils/common";

const textStyle = css`
  font-family: ${globalTheme.fontFamilySansSerif};
  color: ${globalTheme.colour.greyishBrown};
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
`;
const headerLinkStyle = css`
  font-weight: normal;
  font-size: 20px;
  padding: 0px;
  font-family: ${globalTheme.fontFamilySansSerif};
  text-decoration: underline;
`;
export class FeedbackSubmitted extends Component {
  render() {
    const { t, url } = this.props;
    return (
      <span>
        <p css={textStyle}>{t("feedback.submitted")}</p>

        <HeaderLink
          href={mutateUrl(url, "/benefits-directory")}
          css={headerLinkStyle}
          onClick={() => window.history.back()}
        >
          {t("feedback.ben_dir_link")}
        </HeaderLink>
      </span>
    );
  }
}

FeedbackSubmitted.propTypes = {
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired
};

export default FeedbackSubmitted;
