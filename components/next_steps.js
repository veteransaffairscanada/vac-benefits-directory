import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";
import { globalTheme } from "../theme";
import Header from "./typography/header";
import { Grid } from "@material-ui/core";

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

export class NextSteps extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className={outerDiv}>
        <Grid container spacing={24}>
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
      </div>
    );
  }
}

NextSteps.propTypes = {
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default NextSteps;
