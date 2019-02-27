import React, { Component } from "react";
import PropTypes from "prop-types";
import FooterButton from "./footer_button";
// import { logEvent } from "../utils/analytics";
import { css } from "emotion";
import { globalTheme } from "../theme";

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

class MyVacButton extends Component {
  render() {
    const { t } = this.props;

    return (
      <React.Fragment>
        <div title={t("other-language-in-current-language")}>
          <FooterButton
            id="changeLanguage"
            onClick={this.changeLanguage}
            className={desktopButton}
            lang={t("other-language-code")}
          >
            my vac
          </FooterButton>
        </div>
      </React.Fragment>
    );
  }
}

MyVacButton.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default MyVacButton;
