/** @jsx jsx */
import { Component } from "react";
import { css, jsx } from "@emotion/core";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import { connect } from "react-redux";
import BenefitList from "../components/benefit_list";
import Container from "../components/container";
import Header from "../components/typography/header";

const header = css`
  padding-bottom: 10px;
`;
const list = css`
  max-width: 800px;
`;

export class AllBenefits extends Component {
  render() {
    const { i18n, t, url } = this.props; // eslint-disable-line no-unused-vars
    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={true}
        title={t("titles.all_benefits")}
        skipLink="#mainContent"
        url={url}
      >
        <Container id="mainContent">
          <Header size="xl" headingLevel="h1" paddingTop="30" styles={header}>
            {t("all-benefits.List of all benefits")}
          </Header>
          <Grid item xs={12}>
            <Grid container spacing={24}>
              <div css={list}>
                <BenefitList
                  t={t}
                  currentLanguage={t("current-language-code")}
                  filteredBenefits={this.props.benefits}
                  searchString={this.props.searchString}
                  savedList={true}
                  store={this.props.store}
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    benefits: reduxState.benefits,
    searchString: reduxState.searchString
  };
};

AllBenefits.propTypes = {
  benefits: PropTypes.array.isRequired,
  searchString: PropTypes.string.isRequired,
  i18n: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withI18N(AllBenefits));
