import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "react-emotion";

const Modal = css`
  left: 50%;
  margin: -250px 0 0 -32%;
  opacity: 1;
  position: absolute;
  top: 50%;
  visibility: visible;
  width: 65%;
  box-shadow: 0 3px 7px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  transition: all 0.4s ease-in-out;
  -moz-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
`;

const ModalContent = css`
  background: #ff6961;
  position: relative;
  z-index: 20;
  border-radius: 5px;
  color: #fff;
  padding: 30px;
`;

class Noscript extends Component {
  render() {
    const { t } = this.props;

    return (
      <noscript role="complementary">
        <div className={Modal}>
          <div className={ModalContent}>
            <div className="copy">
              <p dangerouslySetInnerHTML={{ __html: t("noscript") }} />
            </div>
          </div>

        </div>
      </noscript>
    );
  }
}

Noscript.propTypes = {
  t: PropTypes.func.isRequired
};

export default Noscript;
