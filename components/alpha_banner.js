import React, { Component } from "react";
import { AppBar } from "material-ui";
import styled from "react-emotion";

const Alpha = styled("div")`
  color: #ffffff;
  background-color: #f90277;
  margin: 10px;
  padding: 5px;
  width: 60px;
  text-align: center;
  font-size: 14px;
  border-radius: 6px;
  float: left;
  text-transform: uppercase;
`;

const AlphaText = styled("div")`
  font-size: 14px;
  width: 500px;
  color: #fff;
  margin: 15px;
`;
type Props = {
  t: mixed
};

class AlphaBanner extends Component<Props> {
  props: Props;

  render() {
    return (
      <AppBar
        style={{ backgroundColor: "#181818", color: "#000", height: "50px" }}
        position="static"
      >
        <div style={{ height: "50px", verticalAlign: "center" }}>
          <Alpha>Alpha</Alpha>
          <AlphaText id="AlphaTextContainer">{this.props.t("alpha")}</AlphaText>
        </div>
      </AppBar>
    );
  }
}

export default AlphaBanner;
