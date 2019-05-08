import React, { Component } from "react";
import GuidedExperiencePage from "../components/guided_experience_page";
import Cookies from "universal-cookie";

export class Index extends Component {
  constructor(props) {
    super(props);
    this.cookies = new Cookies();
  }

  render() {
    return <GuidedExperiencePage section="patronType" {...this.props} />;
  }
}

export default Index;
