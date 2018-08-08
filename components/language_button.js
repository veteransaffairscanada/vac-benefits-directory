import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { logEvent } from "../utils/analytics";
import Router from "next/router";

const styles = theme => ({
  mobileButton: {
    color: "#fff",
    textTransform: "none",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  desktopButton: {
    color: "#fff",
    textTransform: "none",
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
});

class LanguageButton extends Component {
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

  titleCase = word => {
    return word[0].toUpperCase() + word.substr(1);
  };

  render() {
    const { t, classes } = this.props;

    return (
      <div>
        <Button
          id="changeLanguage"
          onClick={this.changeLanguage}
          className={classes.desktopButton}
        >
          {t("other-language")}
        </Button>

        <Button
          id="changeLanguageMobile"
          onClick={this.changeLanguage}
          className={classes.mobileButton}
        >
          {this.titleCase(t("other-language-code"))}
        </Button>
      </div>
    );
  }
}

LanguageButton.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LanguageButton);
