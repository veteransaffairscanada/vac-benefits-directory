import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { globalTheme } from "../theme";
import Header from "./typography/header";
import HeaderLink from "./header_link";
import { Grid } from "@material-ui/core";
import Paper from "./paper";
import Button from "./button";
import { getMapUrl } from "../selectors/urls";
import { connect } from "react-redux";
import { logEvent } from "../utils/analytics";

const outerDiv = css`
  margin-top: 70px;
  padding: 12px;
  margin-left: 25px;
  margin-right: 25px;
  width: 100%;
`;

const innerDiv = css`
  border-top: 5px solid ${globalTheme.colour.blackish};
  margin-top: 30px;
  margin-bottom: 12px;
  width: 10%;
`;

const whatsNextList = css`
  padding-left: 20px;
  width: 100%;
  color: ${globalTheme.colour.greyishBrown};
  font-family: Merriweather;
  font-size: 18px;
`;

const liItem = css`
  padding-bottom: 20px;
`;

const fullHeight = css`
  height: 100%;
`;

const header = css`
  width: 100%;
`;
const font21 = css`
  font-size: 21px;
`;

const cerulean = css`
  color: ${globalTheme.colour.cerulean};
`;

export class NextSteps extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className={outerDiv}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Header
              className={header}
              size="md"
              headingLevel="h2"
              paddingTop="25"
            >
              {t("nextSteps.whats_next")}
            </Header>

            <div className={innerDiv} />

            <ul id="nextStepsList" className={whatsNextList}>
              <li className={liItem}>{t("nextSteps.bullet_1")}</li>
              <li className={liItem}>{t("nextSteps.bullet_2")}</li>
              <li className={liItem}>{t("nextSteps.bullet_3")}</li>
              <li className={liItem}>{t("nextSteps.bullet_4")}</li>
            </ul>
          </Grid>

          <Grid item xs={12}>
            <Header
              className={header}
              size="md"
              headingLevel="h2"
              paddingTop="25"
            >
              {t("nextSteps.contact_us")}
            </Header>

            <div className={innerDiv} />
          </Grid>

          <Grid item sm={12} md={6}>
            <Paper id="myVacCard" className={fullHeight} padding="sm">
              <Header size="md" className={font21}>
                {t("nextSteps.register_myvac")}
              </Header>
              <p>
                {t("nextSteps.box_1")}
                <a
                  id="registerNowLink"
                  href={t("nextSteps.myvac_register_href")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cerulean}
                >
                  {t("nextSteps.myvac_register_text")}
                </a>
                .
              </p>
              <Button
                id="myVacAccountButton"
                onClick={() => {
                  let exitUrl = t("contact.my_vac_link");
                  logEvent("Exit", exitUrl);
                  const win = window.open(exitUrl, "_blank");
                  win.focus();
                }}
              >
                {t("nextSteps.myvac_button_text")}
              </Button>
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Paper id="nearbyOfficeCard" className={fullHeight} padding="sm">
              <HeaderLink
                id="nearbyOfficeLink"
                arrow="forward"
                href={this.props.mapUrl}
              >
                {t("favourites.visit_prompt")}
              </HeaderLink>
              <p>{t("nextSteps.box_2a")}</p>
              <p>
                {t("nextSteps.box_2b") + " "}
                <a href={"mailto:" + t("contact.email")} className={cerulean}>
                  {t("contact.email")}
                </a>
                {t("nextSteps.box_2c")}
              </p>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (reduxState, props) => {
  return {
    mapUrl: getMapUrl(reduxState, props, {})
  };
};

NextSteps.propTypes = {
  t: PropTypes.func.isRequired,
  mapUrl: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(NextSteps);
