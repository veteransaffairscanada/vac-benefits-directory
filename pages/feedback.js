import React, { Component } from "react";
import Header from "../components/typography/header";
import withI18N from "../lib/i18nHOC";
import Layout from "../components/layout";
import { globalTheme } from "../theme";
import Container from "../components/container";
import { css } from "emotion";
import RadioSelector from "../components/radio_selector";
import { connect } from "react-redux";
import HeaderLink from "../components/header_link";
import Button from "../components/button";
import PropTypes from "prop-types";
import TextArea from "../components/text_area";

const padding = css`
  padding-top: 15px;
  padding-bottom: 15px;
`;
const prevButton = css`
  margin-top: 50px;
  margin-bottom: 15px;
`;
export class Feedback extends Component {
  render() {
    const { t, i18n, questions, store } = this.props;
    const question = questions.filter(x => x.variable_name === "feedback")[0];
    return (
      <Layout
        t={t}
        i18n={i18n}
        hideNoscript={false}
        title={t("feedback.page_title")}
        backgroundColor={globalTheme.colour.white}
        skipLink="#mainContent"
      >
        <Container className={padding} id="mainContent">
          <HeaderLink
            href={"/benefits-directory"} // will need to change
            className={prevButton}
            arrow="back"
          >
            {t("back")}
          </HeaderLink>

          <Header headingLevel="h1" size="lg">
            {t("feedback.page_header")}
          </Header>
          <RadioSelector
            legend={
              t("current-language-code") === "en"
                ? question.display_text_english
                : question.display_text_french
            }
            t={t}
            selectorType="feedback"
            options={question.multiple_choice_options}
            store={store}
          />
          <TextArea
            name="group1"
            maxLength={t("feedback.text_area_char_limit")}
            t={t}
          >
            {t("feedback.tell_us_more")}
          </TextArea>
          <div className={padding}>
            <Button
              arrow={true}
              size="big"
              // onClick={() => {
              //   console.log("sent!!")
              // }}
            >
              {t("send")}{" "}
            </Button>
          </div>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    questions: reduxState.questions
  };
};

Feedback.propTypes = {
  t: PropTypes.func.isRequired,
  i18n: PropTypes.object.isRequired,
  questions: PropTypes.array.isRequired,
  store: PropTypes.object
};

export default withI18N(connect(mapStateToProps)(Feedback));
