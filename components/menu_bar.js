import React, { Component } from "react";
import PropTypes from "prop-types";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";
import { GoCSignature } from "@cdssnc/gcui";
import { logEvent } from "../utils/analytics";
import Router from "next/router";

class MenuBar extends Component {
  changeLanguage = () => {
    const newQuery = Router.query;
    newQuery.lng = this.props.t("other-language-code");
    Router.push({
      pathname: Router.pathname,
      query: newQuery
    });
    this.props.i18n.changeLanguage(this.props.t("other-language-code"));
    logEvent("Language change", this.props.t("other-language"));
  };

  render() {
    const { t } = this.props;

    return (
      <AppBar
        style={{ backgroundColor: "#000", boxShadow: "none" }}
        position="static"
      >
        <Toolbar style={{ paddingLeft: "15px", paddingRight: "0px" }}>
          <GoCSignature
            lang={t("current-language-code")}
            width="20em"
            text="#fff"
            flag="#fff"
          />
          <Typography style={{ flex: 1 }} />
          {this.props.showRefreshCache ? (
            <a href="/refresh">
              <Button id="refreshCache" style={{ color: "#fff" }}>
                {t("refresh-cache")}
              </Button>
            </a>
          ) : (
            ""
          )}
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
  t: PropTypes.func,
  showRefreshCache: PropTypes.bool
};

export default MenuBar;
