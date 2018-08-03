import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import { connect } from "react-redux";
import NeedButton from "./need_button";
import "babel-polyfill/dist/polyfill";
import { Grid } from "@material-ui/core";

const styles = () => ({
  title: {
    color: "black !important"
  },
  needsButtons: {
    display: "flex",
    flexWrap: "wrap"
  }
});

export class NeedsSelector extends Component {
  render() {
    const { needs, classes, t, store, pageWidth } = this.props;
    return (
      <div>
        <Typography variant="subheading" className={classnames(classes.title)}>
          {t("filter by category")}
        </Typography>
        <Grid container spacing={16}>
          <Grid item xs={9}>
            <Typography variant="body2">
              {t("Select all that apply")}
            </Typography>
          </Grid>
          <Grid
            // id="needs_buttons"
            item
            xs={12}
            className={classes.needsButtons}
          >
            {needs.map(need => (
              <NeedButton
                key={need.id}
                need={need}
                t={t}
                pageWidth={pageWidth}
                store={store}
              />
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
  classes: PropTypes.object.isRequired,
  needs: PropTypes.array.isRequired,
  pageWidth: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withStyles(styles)(NeedsSelector));
