import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import SearchComponent from "../components/search";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import styled from "react-emotion";
import { connect } from "react-redux";
import { redux2i18n } from "../utils/redux2i18n";

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

const Search = styled("div")`
  padding: 70px;
  text-align: center;
`;

const Title = styled("div")`
  font-size: 38px;
  line-height: 56px;
`;

export class App extends Component {
  componentWillMount() {
    redux2i18n(this.props.i18n, this.props.translations);
  }

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars

    return (
      <Layout i18n={i18n} t={t} hideNoscript={false} showRefreshCache={false}>
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
              href={"benefits-directory?lng=" + t("current-language-code")}
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

const mapStateToProps = state => {
  return {
    translations: state.translations
  };
};

App.propTypes = {
  i18n: PropTypes.object.isRequired,
  store: PropTypes.object,
  t: PropTypes.func.isRequired,
  translations: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(withI18next()(App));
