import React from "react";

import { withI18next } from "../lib/withI18next";
import styles from "../styles/styles.scss";

export default withI18next(["home"])((
  { t, initialI18nStore } // eslint-disable-line no-unused-vars
) => (
  <div>
    <p className={styles.example}>{t("welcome")}</p>
  </div>
));
