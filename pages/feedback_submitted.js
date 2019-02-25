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
import { mutateUrl } from "../utils/common";

const padding = css`
  padding-top: 15px;
  padding-bottom: 15px;
`;
const textStyle = css`
  fontfamily: ${globalTheme.fontFamilySansSerif};
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
export class FeedbackSubmitted extends Component {
  render() {
    const { t, i18n, url } = this.props;
    return (
      <Layout
        t={t}
        i18n={i18n}
        hideNoscript={false}
        title={t("feedback.page_title")}
        backgroundColor={globalTheme.colour.paleGreyTwo}
        skipLink="#mainContent"
        url={url}
      >
        <Container className={padding} id="mainContent">
          <Header headingLevel="h1" size="lg">
            {t("feedback.page_header")}
          </Header>

          <p className={textStyle}>{t("feedback.submitted")}</p>

          <HeaderLink
            href={mutateUrl(url, "/benefits-directory")}
            className={headerLinkStyle}
          >
            {t("feedback.ben_dir_link")}
          </HeaderLink>
        </Container>
      </Layout>
    );
  }
}

FeedbackSubmitted.propTypes = {
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired
};

export default withI18N(connect()(FeedbackSubmitted));
