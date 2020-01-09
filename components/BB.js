import { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { getPrintUrl, getGuidedExperienceUrl } from "../selectors/urls";
import { withTheme } from "@material-ui/core/styles";
import { getBenefitCountString } from "../utils/common";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Container from "../components/container";
import { globalTheme } from "../theme";
// import { DisabledCookiesBanner } from "./disabled_cookies_banner";
import BenefitsPane from "./benefits_pane";
import BreadCrumbs from "../components/breadcrumbs";
import Paper from "./paper";
import Header from "./typography/header";
import ShareBox from "../components/share_box";
import { getProfileFilters, getFilteredBenefits } from "../selectors/benefits";

const shareBox = css`
  margin-top: 25px;
  text-align: right;
`;

const innerDiv = css`
  padding-top: 24px;
`;
const topMatter = css`
  background-color: ${globalTheme.colour.white};
  width: 100%;
`;

export class BB extends Component {
  ResultsString = (b, t) => {
    return b.length + " " + t("breadcrumbs.ben_dir_page_title");
  };

  render() {
    const {
      t,
      url,
      store,
      guidedExperienceUrl,
      printUrl,
      filteredBenefits
    } = this.props; // eslint-disable-line no-unused-vars
    const breadcrumbs = [
      {
        url: guidedExperienceUrl,
        name: t("ge.Find benefits and services")
      }
    ];

    return (
      <Container>
        <div className={topMatter}>
          <BreadCrumbs
            t={t}
            breadcrumbs={breadcrumbs}
            pageTitle={t("breadcrumbs.ben_dir_page_title")}
          />
        </div>
        <Paper
          id={this.props.id}
          padding="md"
          styles={innerDiv}
          url={url}
          t={t}
          includeBanner={true}
        >
          <Grid container spacing={32}>
            <Grid item xs={8}>
              <Header headingLevel="h1" size="xl">
                {this.ResultsString(filteredBenefits, t)}
              </Header>
            </Grid>
            <Grid item xs={4}>
              <div css={shareBox}>
                <ShareBox
                  t={t}
                  printUrl={printUrl}
                  url={url}
                  showShareLink={true}
                />
              </div>
            </Grid>
            <Grid id="mainContent" item md={12} xs={12}>
              <BenefitsPane id="BenefitsPane" t={t} store={store} url={url} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (reduxState, props) => {
  return {
    filteredBenefits: getFilteredBenefits(reduxState, props),
    guidedExperienceUrl: getGuidedExperienceUrl(reduxState, props),
    printUrl: getPrintUrl(reduxState, props, {})
  };
};

BB.propTypes = {
  url: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  guidedExperienceUrl: PropTypes.string,
  printUrl: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object,
  filteredBenefits: PropTypes.array.isRequired
};

export default withTheme()(connect(mapStateToProps)(BB));
