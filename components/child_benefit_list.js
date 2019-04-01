import PropTypes from "prop-types";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
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
  line-height: 24px;
  text-decoration: underline;
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
  const utm = "?utm_source=fbas&utm_medium=referral&utm_content=child-benefit";

  return (
    <CardDetails summary={colonText}>
      <div css={children}>
        <div>
          <ul css={listStyle}>
            {benefits.map(cb => (
              <li key={cb.id} css={liStyle}>
                <HeaderLink
                  rel="noopener noreferrer"
                  css={heading}
                  size="small"
                  href={
                    (language === "en" ? cb.benefitPageEn : cb.benefitPageFr) +
                    utm
                  }
                  onClick={() => {
                    logEvent(
                      "Exit",
                      "child benefit",
                      (language === "en"
                        ? cb.benefitPageEn
                        : cb.benefitPageFr) + utm
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
