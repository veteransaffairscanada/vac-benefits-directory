import React, { Component } from "react";
import PropTypes from "prop-types";
import MarkdownIt from "markdown-it";
import JsxParser from "react-jsx-parser";

export class CardHeaderImportantInfo extends Component {
  md = new MarkdownIt();
  benefitNote = benefit => {
    const note =
      this.props.t("current-language-code") === "en"
        ? benefit.noteEn
        : benefit.noteFr;

    let jsxString = this.md
      .render(note)
      .replace("<p>", "<span>")
      .replace("</p>", "</span>");
    return <JsxParser jsx={jsxString} />;
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
