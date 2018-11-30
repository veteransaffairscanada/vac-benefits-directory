import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { css } from "react-emotion";
import { globalTheme } from "../theme";
import AnchorLink from "./typography/anchor_link";
import { connect } from "react-redux";

const outerDiv = css`
  padding: 12px;
`;

const breadcrumbCss = css`
  border-top: 1px solid ${globalTheme.colour.warmGrey};
  padding-bottom: 15px;
  padding-top: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;
`;

const breadcrumbList = css`
  border-bottom: 1px solid ${globalTheme.colour.warmGrey};
  padding-left: 0;
  width: 100%;
`;

export class GuidedExperienceSummary extends Component {
  breadcrumbs = () => {
    const { t, reduxState } = this.props;
    // console.log(this.props)
    const questionVariableNames = reduxState.questions
      .map(x => x.variable_name)
      .filter(x => x != "needs");
    let jsx_array = questionVariableNames.map((k, i) => {
      if (!reduxState[k]) {
        return (
          <li className={breadcrumbCss} key={i}>
            Not answered
          </li>
        );
      } else {
        let option = reduxState.multipleChoiceOptions.filter(
          x => x.variable_name === reduxState[k]
        )[0];
        let text;
        if (t("current-language-code") === "en") {
          text = option.ge_breadcrumb_english
            ? option.ge_breadcrumb_english
            : option.display_text_english;
        } else {
          text = option.ge_breadcrumb_french
            ? option.ge_breadcrumb_french
            : option.display_text_french;
        }

        return (
          <li className={breadcrumbCss} key={i}>
            <AnchorLink
              id={"breadcrumbs" + i}
              href="#"
              fontSize={24}
              // onClick={() => this.props.setSection(k)}
            >
              {text}
            </AnchorLink>
          </li>
        );
      }
    });
    return jsx_array;
  };

  // <li className={breadcrumbCss}>
  //   <AnchorLink
  //     id={"breadcrumb1"}
  //     href="#"
  //     onClick={x => x}
  //     fontSize={24}
  //   >
  //     Benefits for Veterans PL
  //   </AnchorLink>
  // </li>
  // <li className={breadcrumbCss}>
  //   <AnchorLink
  //     id={"breadcrumb2"}
  //     href="#"
  //     onClick={x => x}
  //     fontSize={24}
  //   >
  //     Canadian Armed Forces PL
  //   </AnchorLink>
  // </li>
  // <li className={breadcrumbCss}>
  //   <AnchorLink
  //     id={"breadcrumb3"}
  //     href="#"
  //     onClick={x => x}
  //     fontSize={24}
  //   >
  //     Has a service related health issue PL
  //   </AnchorLink>
  // </li>

  render() {
    // const { t, reduxState } = this.props;
    console.log(this.props);
    return (
      <div className={outerDiv}>
        <Grid container spacing={24}>
          <ul className={breadcrumbList}>{this.breadcrumbs()}</ul>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

GuidedExperienceSummary.propTypes = {
  reduxState: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(GuidedExperienceSummary);
