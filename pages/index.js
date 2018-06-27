import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import styled from "react-emotion";
import { connect } from "react-redux";

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
  componentWillMount() {
    let i18nEn = {};
    let i18nFr = {};
    this.props.text.forEach(text => {
      if (text.section) {
        if (!i18nEn[text.section]) {
          i18nEn[text.section] = {};
          i18nFr[text.section] = {};
        }
        i18nEn[text.section][text.key] = text.English;
        i18nFr[text.section][text.key] = text.French;
      } else {
        i18nEn[text.key] = text.English;
        i18nFr[text.key] = text.French;
      }
    });
    this.props.i18n.addResourceBundle("en", "common", i18nEn);
    this.props.i18n.addResourceBundle("fr", "common", i18nFr);
  }

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

const mapStateToProps = state => {
  return {
    text: state.text
  };
};

App.propTypes = {
  i18n: PropTypes.object,
  t: PropTypes.func,
  text: PropTypes.array
};

export default connect(mapStateToProps)(withI18next()(App)); // withI18next(["common"])(App);
