import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import SearchComponent from "../components/search";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import styled from "react-emotion";

const BlueBar = styled("div")`
  border-top: 10px solid #303f9f;
  width: 100%;
`;

const Hero = styled("div")`
  background-color: #eee;
  color: #000;
  min-height: 350px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 75px 0 20px 0;
  text-align: center;
`;

const HeroButton = styled("div")`
  padding-top: 50px;
`;

const Search = styled("div")`
  max-width: 1200px;
  margin: 0 auto;
  padding: 70px;
  text-align: center;
  @media (max-width: 400px) {
    padding: 10px;
  }
`;

const Title = styled("div")`
  font-size: 38px;
  line-height: 56px;
`;

export class App extends Component {
  render() {
    const { i18n, t } = this.props;
    let urlGE = "A?section=A1&lng=" + t("current-language-code");
    let urlBD = "benefits-directory?lng=" + t("current-language-code");
    return (
      <Layout i18n={i18n} t={t} hideNoscript={false} showRefreshCache={false}>
        <BlueBar />
        <Hero>
          <Title id="heroTitle">{t("index.title")}</Title>
          <HeroButton>
            <Button
              id="heroGuidedLink"
              style={{
                marginBottom: "10px",
                padding: "20px",
                textTransform: "none"
              }}
              variant="raised"
              color="primary"
              href={urlGE}
            >
              {t("index.guided experience")}
            </Button>
            &nbsp; &nbsp; &nbsp;
            {t("index.or")}
            &nbsp; &nbsp; &nbsp;
            <Button
              id="heroBenefitsLink"
              style={{
                marginBottom: "10px",
                padding: "20px",
                textTransform: "none"
              }}
              variant="raised"
              color="primary"
              href={urlBD}
            >
              {t("index.all benefits")}
            </Button>
          </HeroButton>
        </Hero>
        <Search>
          <SearchComponent
            id="searchComponent"
            i18n={this.props.i18n}
            store={this.props.store}
            t={this.props.t}
          />
        </Search>
      </Layout>
    );
  }
}

App.propTypes = {
  i18n: PropTypes.object.isRequired,
  store: PropTypes.object,
  t: PropTypes.func.isRequired
};

export default withI18next()(App);
