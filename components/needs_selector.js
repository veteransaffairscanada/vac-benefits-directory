import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NeedButton from "./need_button";
import { Grid } from "@material-ui/core";
import { css } from "react-emotion";
import Header4 from "./header4";

const needsButtons = css`
  display: flex;
  flex-wrap: wrap;
`;

export class NeedsSelector extends Component {
  render() {
    const { needs, t, store } = this.props;
    return (
      <div>
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
  }
}

const mapStateToProps = reduxState => {
  return {
    needs: reduxState.needs
  };
};

NeedsSelector.propTypes = {
  needs: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(NeedsSelector);
