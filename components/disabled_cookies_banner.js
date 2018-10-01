import React from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import { globalTheme } from "../theme";
import Body from "./typography/body";

const Banner = css`
  color: ${globalTheme.colour.greyishBrown};
  background-color: #e3f2ff;
  border-left: 5px solid ${globalTheme.colour.cerulean};
  padding-left: 25px;
  padding-top: 13px;
  padding-bottom: 13px;
`;
const Text = css`
  flex-grow: 1;
`;
const CloseIcon = css`
  float: right;
  margin-top: -10px;
`;

export const DisabledCookiesBanner = ({ t, onClose }) => (
  <Body className={Banner}>
    <span className={Text}>
      {t("B3.disabled_cookies_text")}
      <a href={t("B3.disabled_cookies_link")}>
        {t("B3.disabled_cookies_link_text")}
      </a>
    </span>
    <span className={CloseIcon}>
      <IconButton aria-label="Hide cookie warning" onClick={onClose}>
        <Close />
      </IconButton>
    </span>
  </Body>
);

DisabledCookiesBanner.propTypes = {
  t: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
