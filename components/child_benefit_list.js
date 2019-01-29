import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import HeaderLink from "./header_link";
import { globalTheme } from "../theme";
import { logEvent } from "../utils/analytics";

const headerDesc = css`
  flex-grow: 1;
  color: ${globalTheme.colour.greyishBrown};
`;
const cardBottomFamilyTitle = css`
  margin-bottom: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const children = css`
  width: 100%;
`;
const heading = css`
  font-size: 1em;
  font-weight: normal;
  margin-bottom: 10px;
  text-align: left;
`;
const listStyle = css`
  padding-left: 20px;
  list-style: disc;
  margin: 16px 0;
  text-indent: 0.2em;
`;

const logExit = url => {
  logEvent("Exit", url);
};

const ChildBenefitList = props => {
  const { benefits, colonText, t } = props;
  if (benefits.length === 0) {
    return null;
  }
  const language = t("current-language-code");
  return (
    <div>
      <div className={cardBottomFamilyTitle}>
        <span className={headerDesc}>{colonText}</span>
      </div>
      <div className={children}>
        <div>
          <ul className={listStyle}>
            {benefits.map(cb => (
              <li key={cb.id}>
                <HeaderLink
                  target="_blank"
                  rel="noopener noreferrer"
                  className={heading}
                  size="small"
                  href={language === "en" ? cb.benefitPageEn : cb.benefitPageFr}
                  onClick={() => {
                    logExit(
                      language === "en" ? cb.benefitPageEn : cb.benefitPageFr
                    );
                    return true;
                  }}
                >
                  {language === "en" ? cb.vacNameEn : cb.vacNameFr}
                </HeaderLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

ChildBenefitList.propTypes = {
  benefits: PropTypes.array.isRequired,
  colonText: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired
};

export default ChildBenefitList;
