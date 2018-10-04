import React, { Component } from "react";
import PropTypes from "prop-types";

export class CardHeaderImportantInfo extends Component {
  benefitNote = benefit => {
    return this.props.t("current-language-code") === "en"
      ? benefit.noteEn
      : benefit.noteFr;
  };

  render() {
    return <span>{this.benefitNote(this.props.benefit)}</span>;
  }
}

CardHeaderImportantInfo.propTypes = {
  benefit: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default CardHeaderImportantInfo;
