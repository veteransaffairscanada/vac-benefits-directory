import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import Header from "./typography/header";
import HeaderLink from "./header_link";
import { Grid } from "@material-ui/core";
import Button from "./button";
import { getMapUrl } from "../selectors/urls";
import { connect } from "react-redux";
import { logEvent } from "../utils/analytics";
import AnchorLink from "./typography/anchor_link";

const outerDiv = css`
  margin-right: 10px;
  width: 100%;
`;
const font21 = css`
  font-size: 21px;
`;

export class ContactUs extends Component {
  render() {
    const { t } = this.props;

    return (
      <div className={outerDiv}>
        <Grid container spacing={24}>
          <Grid item sm={12}>
            <div id="myVacCard">
              <Header size="md" className={font21}>
                {t("nextSteps.register_myvac")}
              </Header>
              <p>
                {t("nextSteps.box_1")}
                <AnchorLink
                  id="registerNowLink"
                  href={t("nextSteps.myvac_register_href")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    logEvent("Exit", "register for myVAC");
                  }}
                >
                  {t("nextSteps.myvac_register_text")}
                </AnchorLink>
                .
              </p>
              <Button
                id="myVacAccountButton"
                onClick={() => {
                  let exitUrl = t("contact.my_vac_link");
                  logEvent("Exit", "register for myVAC");
                  const win = window.open(exitUrl, "_blank");
                  win.focus();
                }}
              >
                {t("nextSteps.myvac_button_text")}
              </Button>
            </div>
          </Grid>
          <Grid item sm={12}>
            <div id="nearbyOfficeCard">
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
                <AnchorLink
                  href={"mailto:" + t("contact.email")}
                  onClick={() => {
                    logEvent("Exit", "email VAC");
                  }}
                >
                  {t("contact.email")}
                </AnchorLink>
                {t("nextSteps.box_2c")}
              </p>
            </div>
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

ContactUs.propTypes = {
  t: PropTypes.func.isRequired,
  mapUrl: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(ContactUs);
