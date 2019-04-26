import { Component } from "react";
import PropTypes from "prop-types";
import HeaderButton from "./header_button";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { Grid } from "@material-ui/core";
import { globalTheme } from "../theme";

const greyBox = css`
  background-color: ${globalTheme.colour.paleGreyTwo};
  padding-top: 30px;
  padding-bottom: 30px;
  padding-left: 50px;
  padding-right: 50px;
  margin-bottom: 20px;
`;
const leftDiv = css`
  padding-right: 30px;
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    padding-bottom: 30px;
  }
`;
const rightDiv = css`
  font-family: ${globalTheme.fontFamilySerif};
  font-size: 24px;
  color: ${globalTheme.colour.navy};
  border-left: 4px solid ${globalTheme.colour.duckEggBlue};
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;
const link = css`
  padding-top: 10px;
`;
const quickLinksText = css`
  font-family: ${globalTheme.fontFamilySansSerif};
  font-size: 12px;
  color: ${globalTheme.colour.navy};
  font-weight: bold;
  letter-spacing: 1.2px;
  text-transform: uppercase;
`;

const linkStyle = css`
  color: ${globalTheme.colour.navy};
  text-align: left;
  font-size: 16px;
  font-weight: 400;
  padding: 0;
  text-decoration: underline;
  line-height: 16px;
  color: ${globalTheme.colour.greyishBrown};
`;

class QuickLinks extends Component {
  scrollToId(id) {
    window.location = id;
    window.scrollBy(0, -90); // not ideal
  }

  render() {
    const { t, onFavourites, rightHandText } = this.props;
    return (
      <div css={greyBox}>
        <Grid container>
          <Grid item xs={12} md={4}>
            <div css={leftDiv}>
              <span css={quickLinksText}>{t("quick_links")}</span>
              <div css={link}>
                {onFavourites ? (
                  <HeaderButton
                    id="saved-list-button"
                    styles={linkStyle}
                    onClick={() => this.scrollToId("#saved-list")}
                  >
                    {t("titles.saved_list")}
                  </HeaderButton>
                ) : (
                  <HeaderButton
                    id="benefits-and-services-button"
                    styles={linkStyle}
                    onClick={() => this.scrollToId("#benefits-and-services")}
                  >
                    {t("titles.benefits_and_services")}
                  </HeaderButton>
                )}
              </div>
              <div css={link}>
                <HeaderButton
                  id="next-steps-button"
                  styles={linkStyle}
                  onClick={() => this.scrollToId("#next-steps")}
                >
                  {t("nextSteps.whats_next")}
                </HeaderButton>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <div css={rightDiv}>{rightHandText}</div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

QuickLinks.defaultProps = {
  onFavourites: false
};

QuickLinks.propTypes = {
  t: PropTypes.func.isRequired,
  onFavourites: PropTypes.bool,
  rightHandText: PropTypes.string.isRequired
};

export default QuickLinks;
