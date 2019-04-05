import { Component } from "react";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import PropTypes from "prop-types";
import Container from "../components/container";
import HeaderButton from "../components/header_button";
import Paper from "../components/paper";
import { Grid } from "@material-ui/core";
import Button from "../components/button";
import Header from "../components/typography/header";
import Router from "next/router";
import BreadCrumbs from "../components/breadcrumbs";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../theme";
import { mutateUrl, getBenefitCountString, getPageName } from "../utils/common";
import { connect } from "react-redux";
import GuidedExperienceSummary from "../components/guided_experience_summary";
import Body from "../components/typography/body";
import { getFilteredBenefits } from "../selectors/benefits";
import { getGeUrl } from "../selectors/urls";
import AlphaBanner from "../components/alpha_banner";

const box = css`
  padding: 63px 63px 63px 63px;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    padding: 26px 26px 55px 26px;
  }
`;
const alignRight = css`
  text-align: right;
`;
const questions = css`
  margin: 0;
  padding: 0;
`;

export class Summary extends Component {
  render() {
    const {
      t,
      i18n,
      url,
      reduxState,
      store,
      filteredBenefits,
      geUrl
    } = this.props;
    const prevSection =
      reduxState.patronType === "organization" ? "patronType" : "needs";
    const backUrl = mutateUrl(url, "/" + getPageName(prevSection));
    const benefitsToConsider = getBenefitCountString(filteredBenefits, t);

    const breadcrumbs = [
      {
        url: geUrl,
        name: t("ge.Find benefits and services")
      }
    ];

    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={false}
        title={t("titles.ge_summary")}
        backgroundColor={globalTheme.colour.paleGreyTwo}
        skipLink="mainContent"
        url={url}
      >
        <Container id="mainContent">
          <div>
            <BreadCrumbs
              t={t}
              breadcrumbs={breadcrumbs}
              pageTitle={t("ge.Find benefits and services")}
            />
          </div>
          <Paper padding="md" styles={box}>
            <AlphaBanner t={t} url={url} />
            <Grid container spacing={24}>
              <Grid item xs={12} css={questions}>
                <Header size="md_lg" headingLevel="h2">
                  {t("ge.summary_subtitle")}
                </Header>
                <Body>
                  <p>{t("ge.summary_tooltip")}</p>
                </Body>
                <div>
                  <GuidedExperienceSummary t={t} url={url} store={store} />
                  <Header size="md_lg" headingLevel="h3" paddingTop="40">
                    {benefitsToConsider}
                  </Header>
                  {filteredBenefits.length > 0 ? (
                    <Body>
                      <p>{t("B3.check eligibility")}</p>
                    </Body>
                  ) : null}
                </div>
              </Grid>
              <Grid item xs={4} md={6}>
                <HeaderButton
                  id="prevButton"
                  hasBorder
                  onClick={() => Router.push(backUrl)}
                >
                  {t("back")}
                </HeaderButton>
              </Grid>
              <Grid item xs={8} md={6}>
                <div css={alignRight}>
                  <Button
                    id="nextButton"
                    onClick={() =>
                      Router.push(mutateUrl(url, "/benefits-directory")).then(
                        () => window.scrollTo(0, 0)
                      )
                    }
                  >
                    {t("ge.show_results")}
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (reduxState, props) => {
  return {
    reduxState: reduxState,
    filteredBenefits: getFilteredBenefits(reduxState, props),
    geUrl: getGeUrl(reduxState, props)
  };
};

Summary.propTypes = {
  filteredBenefits: PropTypes.array.isRequired,
  reduxState: PropTypes.object.isRequired,
  i18n: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object,
  geUrl: PropTypes.string
};

export default withI18N(connect(mapStateToProps)(Summary));
