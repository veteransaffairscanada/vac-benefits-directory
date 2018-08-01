import React, { Component } from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import SearchComponent from "../components/search";
import { withI18next } from "../lib/withI18next";
import Layout from "../components/layout";
import styled from "react-emotion";
import { connect } from "react-redux";

const BlueBar = styled("div")`
  border-top: 10px solid #303f9f;
  width: 100%;
`;

const Hero = styled("div")`
  background-color: #eee;
  color: #000;
  max-width: 1200px;
  margin: 0 auto;
  padding: 75px 16px 50px 16px;
  text-align: center;
`;

const SearchArea = styled("div")`
  color: #000;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0px 16px 20px 16px;
  text-align: center;
`;

const HeroButton = styled("div")`
  padding-top: 50px;
`;

const Search = styled("div")`
  max-width: 1000px;
  margin: 0 auto;
  padding: 75px 16px 20px 16px;
  text-align: center;
  @media (max-width: 400px) {
    padding: 10px;
  }
`;

const Title = styled("div")`
  font-size: 25px;
  line-height: 50px;
  max-width: 700px;
  margin: 0 auto;
`;

export class App extends Component {
  constructor() {
    super();
    this.updateWindowWidth = this.updateWindowWidth.bind(this);
  }

  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener("resize", this.updateWindowWidth);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowWidth);
  }

  updateWindowWidth() {
    this.props.setPageWidth(window.innerWidth);
  }

  render() {
    const { i18n, t } = this.props;
    let urlGE = "A?section=A1&lng=" + t("current-language-code");
    let urlBD = "benefits-directory?lng=" + t("current-language-code");
    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={false}
        showRefreshCache={false}
        backgroundColor="white"
      >
        <BlueBar />
        <div style={{ backgroundColor: "#eee" }}>
          <Hero>
            <div style={{ paddingLeft: "16px", paddingRight: "16px" }}>
              <Title id="heroTitle">{t("index.title")}</Title>
              <HeroButton>
                <Link prefetch href={urlGE}>
                  <Button
                    id="heroGuidedLink"
                    style={{
                      marginBottom: "10px",
                      padding: "15px",
                      paddingLeft: "60px",
                      paddingRight: "60px",
                      textTransform: "none",
                      borderRadius: "0px"
                    }}
                    variant="raised"
                    color="primary"
                  >
                    {t("index.guided experience")}
                  </Button>
                </Link>
                <div>
                  {t("index.or")}
                  <Link prefetch href={urlBD}>
                    <a
                      id="heroBenefitsLink"
                      style={{
                        marginBottom: "10px",
                        padding: "20px",
                        textTransform: "none"
                      }}
                      variant="raised"
                      color="primary"
                    >
                      {t("index.all benefits")}
                    </a>
                  </Link>
                </div>
              </HeroButton>
            </div>
          </Hero>
        </div>
        <div>
          <SearchArea>
            <Search>
              <SearchComponent
                id="searchComponent"
                i18n={this.props.i18n}
                store={this.props.store}
                t={this.props.t}
              />
            </Search>
          </SearchArea>
        </div>
      </Layout>
    );
  }
}

App.propTypes = {
  i18n: PropTypes.object.isRequired,
  store: PropTypes.object,
  t: PropTypes.func.isRequired,
  setPageWidth: PropTypes.func.isRequired
};

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {
    setPageWidth: pageWidth => {
      dispatch({ type: "SET_PAGEWIDTH", data: pageWidth });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18next()(App));
