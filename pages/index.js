import React, { Component } from "react";
import PropTypes from "prop-types";
import Cookies from "universal-cookie";
import { connect } from "react-redux";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import GuidedExperienceProfile from "../components/guided_experience_profile";
import { Grid } from "@material-ui/core";
import { css } from "emotion";
import { globalTheme } from "../theme";
import Paper from "../components/paper";
import Header from "../components/typography/header";
import Body from "../components/typography/body";
import NextSkipButtons from "../components/next_skip_buttons";
import Container from "../components/container";
import HeaderLink from "../components/header_link";

const box = css`
  padding: 63px 63px 63px 63px;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    padding: 17px 26px 55px 26px;
  }
  display: inline-flex;
`;
const prevButton = css`
  margin-top: 50px;
  margin-bottom: 15px;
`;
const questions = css`
  margin: 0;
  padding: 0;
`;

const section = "patronType";

export class Index extends Component {
  constructor(props) {
    super(props);
    this.cookies = new Cookies();
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setURL();
    }
  }

  setURL = () => {
    this.props.url.query[section] = this.props.reduxState[section];
    this.props.url.query.lng = this.props.t("current-language-code");
  };

  getSubtitle = question => {
    if (this.props.t("current-language-code") === "en") {
      return question["guided_experience_english"];
    } else {
      return question["guided_experience_french"];
    }
  };

  render() {
    const { t, i18n, store, reduxState, url } = this.props;
    const question = reduxState.questions.filter(
      x => x.variable_name === section
    )[0];
    const id = section;
    const subtitle = this.getSubtitle(question);

    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={false}
        title={t("ge.Find benefits and services")}
        skipLink="#mainContent"
      >
        <Container id="mainContent">
          <HeaderLink
            id="prevButton"
            href={t("ge.home_link")}
            className={prevButton}
            arrow="back"
          >
            {t("back")}
          </HeaderLink>
          <Header size="lg" headingLevel="h1">
            {t("ge.Find benefits and services")}
          </Header>
          <Body>
            <p>{t("ge.intro_text_p1")}</p>
            <p>{t("ge.intro_text_p2")}</p>
          </Body>

          <Paper padding="md" className={box}>
            <Grid container spacing={24}>
              <Grid item xs={12} className={questions}>
                <Header size="md_lg" headingLevel="h2">
                  {subtitle}
                </Header>
                <GuidedExperienceProfile
                  t={t}
                  selectorType={section}
                  store={store}
                  options={question["multiple_choice_options"]}
                />
              </Grid>
              <Grid item xs={12}>
                <NextSkipButtons t={t} id={id} url={url} />
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveQuestionResponse: (question, response) => {
      dispatch({
        type: "SAVE_QUESTION_RESPONSE",
        data: { [question]: response }
      });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState,
    selectedNeeds: reduxState.selectedNeeds,
    sectionOrder: reduxState.questions.map(x => x.variable_name)
  };
};

Index.propTypes = {
  reduxState: PropTypes.object,
  sectionOrder: PropTypes.array.isRequired,
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  saveQuestionResponse: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withI18N(Index));
