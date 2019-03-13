import { Component } from "react";
import PropTypes from "prop-types";
import FooterLink from "./typography/footer_link";
import FolderMouse from "./icons/FolderMouse";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../theme";

const desktopButton = css`
  font-size: 10px;
  text-transform: uppercase;
  line-height: 23px;
  letter-spacing: 2.5px;
  margin-left: 30px;
  svg {
    margin-top: 5px;
    vertical-align: middle;
    padding-left: 10px;
    color: ${globalTheme.colour.blueGrey};
  }
`;

class MyVacButton extends Component {
  render() {
    const { t } = this.props;
    return (
      <FooterLink href={t("links.myvac")} css={desktopButton}>
        {t("myvac_button_text")}
        <FolderMouse />
      </FooterLink>
    );
  }
}

MyVacButton.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default MyVacButton;
