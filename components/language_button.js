import React, { Component } from "react";
import PropTypes from "prop-types";
import FooterLink from "./typography/footer_link";
import { logEvent } from "../utils/analytics";
import { css } from "emotion";
import Language from "./icons/Language";
import { globalTheme } from "../theme";
import { mutateUrl } from "../utils/common";

const desktopButton = css`
  font-size: 10px;
  text-transform: uppercase;
  line-height: 23px;
  letter-spacing: 2.5px;
  svg {
    margin-top: -4px;
    vertical-align: middle;
    padding-left: 5px;
    color: ${globalTheme.colour.blueGrey};
  }
`;

class LanguageButton extends Component {
  render() {
    const { t, url } = this.props;

    return (
      <FooterLink
        id="changeLanguage"
        title={t("other-language-in-current-language")}
        href={mutateUrl(url, "", { lng: t("other-language-code") })}
        onClick={() => {
          logEvent("Language change", t("other-language"));
        }}
        className={desktopButton}
        lang={t("other-language-code")}
      >
        {t("other-language")}
        <Language />
      </FooterLink>
    );
  }
}

LanguageButton.propTypes = {
  i18n: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default LanguageButton;
