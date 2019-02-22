import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import HeaderLink from "./header_link";
import { logEvent } from "../utils/analytics";
import CardDetails from "./card_details";

const children = css`
  width: 100%;
`;
const heading = css`
  font-size: 1em;
  font-weight: normal;
  text-align: left;
  padding: 0px;
`;

const liStyle = css`
  margin-bottom: 10px;
  margin-left: 6px; // this is so bullets appear in 2nd column in IE
`;
const listStyle = css`
  padding-left: 20px;
  list-style: disc;
  text-indent: 0.2em;
`;

const ChildBenefitList = props => {
  const { benefits, colonText, t } = props;
  if (benefits.length === 0) {
    return null;
  }
  const language = t("current-language-code");
  return (
    <CardDetails summary={colonText}>
      <div className={children}>
        <div>
          <ul className={listStyle}>
            {benefits.map(cb => (
              <li key={cb.id} className={liStyle}>
                <HeaderLink
                  rel="noopener noreferrer"
                  className={heading}
                  size="small"
                  href={language === "en" ? cb.benefitPageEn : cb.benefitPageFr}
                  onClick={() => {
                    logEvent(
                      "Exit",
                      "child benefit",
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
    </CardDetails>
  );
};

ChildBenefitList.propTypes = {
  benefits: PropTypes.array.isRequired,
  colonText: PropTypes.string,
  t: PropTypes.func.isRequired
};

export default ChildBenefitList;
