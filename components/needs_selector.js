import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NeedButton from "./need_button";
import { Grid } from "@material-ui/core";
import { css } from "react-emotion";
import Header4 from "./typography/header4";
import { showQuestion } from "../utils/common";
const needsButtons = css`
  display: flex;
  flex-wrap: wrap;
`;

const topBorder = css`
  border-top: 1px solid black;
  padding-top: 30px;
  margin-top: 15px;
`;

export class NeedsSelector extends Component {
  render() {
    const { needs, t, store } = this.props;

    if (showQuestion("needs", undefined, this.props.reduxState)) {
      return (
        <div className={topBorder}>
          <Header4>{t("filter by category")}</Header4>
          <Grid container spacing={16}>
            <Grid item xs={9}>
              <div>{t("Select all that apply")}</div>
            </Grid>
            <Grid item xs={12} className={needsButtons}>
              {needs.map(need => (
                <NeedButton key={need.id} need={need} t={t} store={store} />
              ))}
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = reduxState => {
  return {
    needs: reduxState.needs,
    reduxState: reduxState
  };
};

NeedsSelector.propTypes = {
  needs: PropTypes.array.isRequired,
  reduxState: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(NeedsSelector);
