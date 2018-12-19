import React, { Component } from "react";
import { css } from "emotion";
import PropTypes from "prop-types";

const noFocusStyle = css`
  :focus {
    outline: none;
  }
`;

class AutoFocus extends Component {
  constructor(props) {
    super(props);
    this.focusEl = React.createRef();
    this.state = { label: false };
  }

  componentDidMount() {
    const node = this.focusEl.current;
    this.setState({ label: node.innerText });
    node.focus();
  }

  render() {
    return (
      <div ref={this.focusEl} tabIndex="-1" className={noFocusStyle}>
        {this.props.children}
      </div>
    );
  }
}

AutoFocus.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
};

export default AutoFocus;
