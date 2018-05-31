import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppBar, Button, Toolbar, Typography } from "material-ui";
import { GoCSignature } from "@cdssnc/gcui";
import { logEvent } from "../utils/analytics";

class MenuBar extends Component {
  changeLanguage = () => {
    this.props.i18n.changeLanguage(this.props.t("other-language-code"));
    logEvent("Language change", this.props.t("other-language"));
  };

  render() {
    const { t } = this.props;

    return (
      <AppBar style={{ backgroundColor: "#000" }} position="static">
        <Toolbar>
          <GoCSignature
            lang={t("current-language-code")}
            width="20em"
            text="#fff"
            flag="#fff"
          />
          <Typography style={{ flex: 1 }} />
          <Button id="refreshCache">
            <a href="/refresh" style={{ color: "#fff" }}>
              {t("refresh-cache")}
            </a>
          </Button>
          <Button
            id="changeLanguage"
            style={{ color: "#fff" }}
            onClick={this.changeLanguage}
          >
            {t("other-language")}
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

MenuBar.propTypes = {
  i18n: PropTypes.object,
  t: PropTypes.func
};

export default MenuBar;
