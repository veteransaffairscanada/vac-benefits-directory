import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import Button from "./button";
import { logEvent } from "../utils/analytics";
import { globalTheme } from "../theme";

const anchorFocus = css`
  :focus {
    outline: 3px solid ${globalTheme.colour.focusColour};
  }
`;

const LearnMoreButton = props => {
  const { t, benefit } = props;
  const url =
    t("current-language-code") === "en"
      ? benefit.benefitPageEn
      : benefit.benefitPageFr;

  return (
    <a
      className={anchorFocus}
      href={url}
      rel="noopener noreferrer"
      onClick={() => {
        logEvent("Exit", "learn more", url);
      }}
    >
      <Button arrow={false} tabIndex="-1">
        {t("Find out more")}
      </Button>
    </a>
  );
};

LearnMoreButton.propTypes = {
  benefit: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default LearnMoreButton;
