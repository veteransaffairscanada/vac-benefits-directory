import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import Button from "./button";
import { logEvent } from "../utils/analytics";

const fullWidth = css`
  width: 100%;
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
    <a href={url} target="_blank">
      <Button
        className={fullWidth}
        arrow={true}
        onClick={() => {
          logExit(url);
        }}
      >
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
