import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import Button from "./button";
import { logEvent } from "../utils/analytics";
import { globalTheme } from "../theme";

const fullWidth = css`
  width: 100%;
`;
const anchorFocus = css`
  :focus {
    outline: 3px solid ${globalTheme.colour.focusColour};
  }
`;

const logExit = url => {
  logEvent("Exit", url);
};

const LearnMoreButton = props => {
  const { t, benefit } = props;
  const url =
    t("current-language-code") === "en"
      ? benefit.benefitPageEn
      : benefit.benefitPageFr;
  const vacName =
    t("current-language-code") === "en" ? benefit.vacNameEn : benefit.vacNameFr;

  return (
    <a
      className={anchorFocus}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        logExit(url);
      }}
    >
      <Button className={fullWidth} arrow={true} tabIndex="-1">
        {t("benefits_b.learn_more", { x: vacName })}
      </Button>
    </a>
  );
};

LearnMoreButton.propTypes = {
  benefit: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default LearnMoreButton;
