import React, { Component } from "react";
import Header from "../components/typography/header";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import { globalTheme } from "../theme";
import Container from "../components/container";
import { css } from "emotion";
import { connect } from "react-redux";
import HeaderLink from "../components/header_link";
import PropTypes from "prop-types";

const padding = css`
  padding-top: 15px;
  padding-bottom: 15px;
`;
const prevButton = css`
  margin-top: 50px;
  margin-bottom: 15px;
`;
const textStyle = css`
  fontfamily: ${globalTheme.fontFamily};
  color: ${globalTheme.colour.greyishBrown};
  font-size: 20px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: normal;
  padding: 30px 0px 10px;
`;
const headerLinkStyle = css`
  font-weight: normal;
  font-size: 20px;
`;
export class Feedback extends Component {
  render() {
    const { t, i18n, store } = this.props;
    return (
      <Layout
        t={t}
        i18n={i18n}
        hideNoscript={false}
        title={t("feedback.page_title")}
        backgroundColor={globalTheme.colour.white}
      >
        <Container className={padding} id="mainContent">
          <HeaderLink href={"/feedback"} className={prevButton} arrow="back">
            {t("back")}
          </HeaderLink>

          <Header headingLevel="h1" size="lg">
            {t("feedback.page_header")}
          </Header>

          <p className={textStyle}>{t("feedback.submitted")}</p>

          <HeaderLink href={"/benefits-directory"} className={headerLinkStyle}>
            {t("feedback.ben_dir_link")}
          </HeaderLink>
        </Container>
      </Layout>
    );
  }
}

Feedback.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default withI18N(connect()(Feedback));
