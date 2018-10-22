import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import RadioSelector from "./radio_selector";
import { css } from "react-emotion";

const outerDiv = css`
  padding: 12px;
`;

export class GuidedExperienceProfile extends Component {
  componentDidMount() {
    // this.props.rootRef.current.focus();
    console.log("componentDidUpdate: GuidedExperienceProfile ");
  }
  render() {
    const { t } = this.props;
    return (
      <div className={outerDiv}>
        <Grid container spacing={24}>
          <RadioSelector
            id={"RadioSelector" + this.props.selectorType}
            t={t}
            legend={""}
            selectorType={this.props.selectorType}
            store={this.props.store}
            options={this.props.options}
          />
        </Grid>
      </div>
    );
  }
}

GuidedExperienceProfile.propTypes = {
  t: PropTypes.func.isRequired,
  selectorType: PropTypes.string.isRequired,
  options: PropTypes.array,
  store: PropTypes.object
};

export default GuidedExperienceProfile;
