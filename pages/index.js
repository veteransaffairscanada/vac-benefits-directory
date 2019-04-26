import React, { Component } from "react";
import GuidedExperiencePage from "../components/guided_experience_page";
import Cookies from "universal-cookie";

export class Index extends Component {
  constructor(props) {
    super(props);
    this.cookies = new Cookies();
  }

  render() {
    const envDetails = process.env.CIRCLE_SHA1
      ? process.env.CIRCLE_SHA1.substring(0, 7)
      : process.env.NODE_ENV;

    // eslint-disable-next-line no-console
    console.log(envDetails); // temporary to be removed before release

    return <GuidedExperiencePage section="patronType" {...this.props} />;
  }
}

export default Index;
