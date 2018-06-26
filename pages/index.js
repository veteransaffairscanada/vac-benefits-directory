import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import styled from "react-emotion";

const Hero = styled("div")`
  background-color: #eee;
  border-top: 10px solid #303f9f;
  color: #000;
  min-height: 350px;
  padding: 75px 16% 20px 16%;
  text-align: center;
`;

const HeroButton = styled("div")`
  padding-top: 50px;
`;

const Title = styled("div")`
  font-size: 38px;
  line-height: 56px;
`;

export class App extends Component {
  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars

    return (
      <Layout i18n={i18n} t={t}>
        <Hero>
          <Title id="heroTitle">{t("index.title")}</Title>
          <HeroButton>
            <Button
              id="heroGuidedLink"
              style={{ padding: "20px" }}
              variant="raised"
              color="primary"
              href={"A?section=A1&lng=" + t("current-language-code")}
            >
              {t("index.guided experience")}
            </Button>
            &nbsp; &nbsp; &nbsp;
            {t("index.or")}
            &nbsp; &nbsp; &nbsp;
            <Button
              id="heroBenefitsLink"
              style={{ padding: "20px" }}
              variant="raised"
              color="primary"
              href={"A?section=BB&lng=" + t("current-language-code")}
            >
              {t("index.all benefits")}
            </Button>
          </HeroButton>
        </Hero>
      </Layout>
    );
  }
}

App.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default withI18next(["common"])(App);
