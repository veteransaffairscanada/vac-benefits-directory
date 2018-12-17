/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import Checkbox from "./checkbox";
import { connect } from "react-redux";
import { logEvent } from "../utils/analytics";
import { css, jsx } from "@emotion/core";

const style = css`
  margin-bottom: 10px;
  margin-right: 10px;
`;

export class NeedButton extends Component {
  handleClick = id => {
    let newSelectedNeeds = JSON.parse(JSON.stringify(this.props.selectedNeeds));
    if (newSelectedNeeds.hasOwnProperty(id)) {
      delete newSelectedNeeds[id];
    } else {
      logEvent("FilterClick", "need", id);
      newSelectedNeeds[id] = id;
    }
    if (window && this.props.pageWidth >= 600 && this.props.scrollOnClick) {
      window.scrollTo(0, 0);
    }
    this.props.setSelectedNeeds(newSelectedNeeds);
  };

  render() {
    const { t, need, disabled } = this.props;
    return (
      <Checkbox
        checked={this.props.selectedNeeds[need.id] !== undefined}
        onChange={() => this.handleClick(need.id)}
        value={need.id}
        disabled={disabled ? "disabled" : null}
        css={style}
      >
        {t("current-language-code") === "en" ? need.nameEn : need.nameFr}
      </Checkbox>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelectedNeeds: needsObject => {
      dispatch({ type: "SET_SELECTED_NEEDS", data: needsObject });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    needs: reduxState.needs,
    selectedNeeds: reduxState.selectedNeeds,
    pageWidth: reduxState.pageWidth,
    language: reduxState.language
  };
};

NeedButton.propTypes = {
  need: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  setSelectedNeeds: PropTypes.func.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  pageWidth: PropTypes.number.isRequired,
  scrollOnClick: PropTypes.bool,
  disabled: PropTypes.string,
  store: PropTypes.object
};

NeedButton.defaultProps = {
  scrollOnClick: true,
  disabled: "",
  pageWidth: 1000
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NeedButton);
