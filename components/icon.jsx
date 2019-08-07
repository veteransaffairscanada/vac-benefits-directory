import React from "react";
const { PropTypes } = "prop-types";

const icons = {
  cancel:
    "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z",
  facebook:
    "M608 192h160v-192h-160c-123.514 0-224 100.486-224 224v96h-128v192h128v512h192v-512h160l32-192h-192v-96c0-17.346 14.654-32 32-32z"
};

const Icon = props => (
  <svg width="22" height="22" viewBox="0 0 1024 1024">
    <path d={icons[props.icon]} />
  </svg>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired
};

export default Icon;
