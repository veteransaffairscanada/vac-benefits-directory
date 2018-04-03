import React from "react";

import { withI18next } from "../lib/withI18next";
import { GoCSignature } from "@cdssnc/gcui";

export default withI18next(["home"])((
  { t, initialI18nStore } // eslint-disable-line no-unused-vars
) => (
  <div>
    <GoCSignature width="20em" />
    <p>{t("poc-description")}</p>
  </div>
));
