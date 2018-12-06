import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { globalTheme } from "../theme";
import Header from "./typography/header";
import HeaderLink from "./header_link";
import { Grid } from "@material-ui/core";
import Paper from "./paper";
import Button from "./button";
import { getMapUrl } from "../selectors/urls";
import { connect } from "react-redux";
import Router from "next/router";

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

const header = css`
  width: 100%;
`;
const font21 = css`
  font-size: 21px;
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

            <ul className={whatsNextList}>
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
            <Paper padding="sm">
              <Header size="md" className={font21}>
                {t("nextSteps.register_myvac")}
              </Header>
              <p>{t("nextSteps.box_1")}</p>
              <Button onClick={() => Router.push(t("contact.my_vac_link"))}>
                {t("nextSteps.myvac_button_text")}
              </Button>
            </Paper>
          </Grid>
          <Grid item sm={12} md={6}>
            <Paper padding="sm">
              <HeaderLink arrow="forward" href={this.props.mapUrl}>
                {t("favourites.visit_prompt")}
              </HeaderLink>
              <p>{t("nextSteps.box_2a")}</p>
              <p>{t("nextSteps.box_2b")}</p>
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
