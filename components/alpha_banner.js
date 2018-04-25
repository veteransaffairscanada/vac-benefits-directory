import React, { Component } from "react";
import styled from "react-emotion";

const Alpha = styled("div")`
  color: #ffffff;
  background-color: #e8026e;
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
  padding-top: 15px;
`;

const AlphaWrap = styled("div")`
  background-color: #181818;
  color: #000;
  height: 50px;
`;

type Props = {
  t: mixed
};

class AlphaBanner extends Component<Props> {
  props: Props;

  render() {
    return (
      <AlphaWrap role="complementary">
        <div style={{ height: "50px", verticalAlign: "center" }}>
          <Alpha>Alpha</Alpha>
          <AlphaText id="AlphaTextContainer">{this.props.t("alpha")}</AlphaText>
        </div>
      </AlphaWrap>
    );
  }
}

export default AlphaBanner;
