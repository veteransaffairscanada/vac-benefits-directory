import React from "react";

import { withI18next } from "../lib/withI18next";
import { GoCSignature } from "@cdssnc/gcui";
import styles from "../styles/styles.scss";

export default withI18next(["home"])((
  { t, initialI18nStore } // eslint-disable-line no-unused-vars
) => (
  <div>
    <GoCSignature width="20em" />
    <p className={styles.example}>{t("poc-description")}</p>
  </div>
));
