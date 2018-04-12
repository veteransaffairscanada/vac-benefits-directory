// @flow

import React, { Component } from "react";

import { AppBar, Button, Toolbar, Typography } from "material-ui";
import { GoCSignature } from "@cdssnc/gcui";
import { logEvent } from "../utils/analytics";

type Props = {
  i18n: mixed,
  t: mixed
};

class MenuBar extends Component<Props> {
  props: Props;

  changeLanguage = () => {
    this.props.i18n.changeLanguage(this.props.t("other-language-code"));
    logEvent("Language change", this.props.t("other-language"));
  };

  render() {
    const { t } = this.props;

    return (
      <AppBar style={{ backgroundColor: "#000" }} position="static">
        <Toolbar>
          <GoCSignature width="20em" text="#fff" flag="#fff" />
          <Typography style={{ flex: 1 }} />
          <Button style={{ color: "#fff" }} onClick={this.changeLanguage}>
            {t("other-language")}
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default MenuBar;
