import React, { Component } from "react";
import PropTypes from "prop-types";
import HeaderButton from "./header_button";
import { css } from "emotion";
import { Grid } from "@material-ui/core";
import { globalTheme } from "../theme";

const greyBox = css`
  background-color: ${globalTheme.colour.paleGreyTwo};
  padding: 30px;
`;
const leftBorder = css`
  border-left: 2px solid ${globalTheme.colour.duckEggBlue};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
`;

const text = css`
  flex: 1;
`;
const link = css`
  padding-top: 10px;
`;

class QuickLinks extends Component {
  scrollToId(id) {
    window.location = id;
    window.scrollBy(0, -90); // not ideal
  }

  render() {
    const { t } = this.props;
    return (
      <div className={greyBox}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <span>Quick Links</span>
            <div className={link}>
              <HeaderButton
                id="benefits-and-services-button"
                onClick={() => this.scrollToId("#benefits-and-services")}
              >
                {"Benefits and services"}
              </HeaderButton>
            </div>
            <div className={link}>
              <HeaderButton
                id="next-steps-button"
                onClick={() => this.scrollToId("#next-steps")}
              >
                {t("nextSteps.whats_next")}
              </HeaderButton>
            </div>
            <div className={link}>
              <HeaderButton
                id="contact-button"
                onClick={() => this.scrollToId("#contact")}
              >
                {t("BenefitsPane.contact_us")}
              </HeaderButton>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className={leftBorder}>
              <div className={text}>{t("B3.check eligibility")}</div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

QuickLinks.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default QuickLinks;
