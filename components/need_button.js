import React, { Component } from "react";
import PropTypes from "prop-types";
import Checkbox from "./checkbox";
import { connect } from "react-redux";
import { logEvent } from "../utils/analytics";
import { css } from "react-emotion";

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
    const { t, need } = this.props;
    return (
      <Checkbox
        checked={this.props.selectedNeeds[need.id] !== undefined}
        onChange={() => this.handleClick(need.id)}
        value={need.id}
        className={style}
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
    pageWidth: reduxState.pageWidth
  };
};

NeedButton.propTypes = {
  need: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  setSelectedNeeds: PropTypes.func.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  pageWidth: PropTypes.number.isRequired,
  scrollOnClick: PropTypes.bool,
  store: PropTypes.object
};

NeedButton.defaultProps = {
  scrollOnClick: true
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NeedButton);
