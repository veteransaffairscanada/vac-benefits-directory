import React, { Component } from "react";

import { withI18next } from "../lib/withI18next";
import { GoCSignature, Button } from "@cdssnc/gcui";
import styles from "../styles/styles.scss";

class App extends Component {
  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars

    return (
      <div>
        <GoCSignature width="20em" />
        <p className={styles.example}>{t("poc-description")}</p>
        <Button
          className={styles.button}
          onClick={() =>
            i18n.changeLanguage(
              i18n.language.substring(0, 2) === "en" ? "fr" : "en"
            )
          }
        >
          {i18n.language.substring(0, 2) === "en" ? "Français" : "English"}
        </Button>
      </div>
    );
  }
}

export default withI18next(["home"])(App);
