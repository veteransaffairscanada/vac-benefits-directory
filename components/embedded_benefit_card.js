/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { logEvent } from "../utils/analytics";
import Paper from "./paper";
import { css, jsx } from "@emotion/core";
import OneLiner from "./typography/one_liner";
import HeaderLink from "./header_link";

const root = css`
  margin-bottom: 20px;
  margin-top: 0px;
`;
const heading = css`
  margin-bottom: 10px;
  text-align: left;
`;

export class EmbeddedBenefitCard extends Component {
  state = {
    open: false
  };

  logExit = url => {
    logEvent("Exit", url);
  };

  toggleOpenState = () => {
    this.setState(previousState => {
      return { ...previousState, open: !previousState.open };
    });
  };

  render() {
    const { t, benefit } = this.props;
    const language = t("current-language-code");

    return (
      <Paper padding="sm" css={root}>
        <div
          css="exit_div"
          onClick={() =>
            this.logExit(
              language === "en" ? benefit.benefitPageEn : benefit.benefitPageFr
            )
          }
        >
          <HeaderLink
            id={"embedded-" + benefit.id}
            target="_blank"
            rel="noopener noreferrer"
            css={heading}
            size="small"
            href={
              language === "en" ? benefit.benefitPageEn : benefit.benefitPageFr
            }
            onClick={() => {
              this.logExit(
                language === "en"
                  ? benefit.benefitPageEn
                  : benefit.benefitPageFr
              );
              return true;
            }}
          >
            {language === "en" ? benefit.vacNameEn : benefit.vacNameFr}
          </HeaderLink>
        </div>

        <Grid container spacing={24}>
          <Grid item xs={12}>
            <OneLiner>
              {language === "en"
                ? benefit.oneLineDescriptionEn
                : benefit.oneLineDescriptionFr}
            </OneLiner>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

EmbeddedBenefitCard.propTypes = {
  benefit: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default EmbeddedBenefitCard;
