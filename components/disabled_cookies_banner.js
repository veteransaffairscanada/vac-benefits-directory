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
  padding-top: 20px;
  padding-bottom: 1px;
  padding-left: 25px;
  padding-right: 25px;
  margin-top: 10px;
  margin-bottom: 10px;
`;
const Text = css`
  flex-grow: 1;
`;
const CloseIcon = css`
  float: right;
  margin-top: -14px;
`;

export const DisabledCookiesBanner = ({ t, onClose, ...rest }) => (
  <aside {...rest} className={Banner}>
    <Body>
      <span className={Text}>
        {t("B3.disabled_cookies_text")}
        <a href={t("B3.disabled_cookies_link")}>
          {t("B3.disabled_cookies_link_text")}
        </a>
      </span>
      <IconButton
        className={CloseIcon}
        aria-label="Hide cookie warning"
        onClick={onClose}
      >
        <Close />
      </IconButton>
    </Body>
  </aside>
);

DisabledCookiesBanner.propTypes = {
  t: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};
