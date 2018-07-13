import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  needsTag: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    color: "black",
    borderRadius: 1,
    display: "inline-flex",
    padding: "4px 8px"
  }
});

export class NeedTag extends Component {
  render() {
    const { t, need, classes } = this.props;
    return (
      <div
        className={classes.needsTag}
        style={{ backgroundColor: need.colour }}
      >
        {t("current-language-code") === "en" ? need.nameEn : need.nameFr}
      </div>
    );
  }
}

NeedTag.propTypes = {
  classes: PropTypes.object.isRequired,
  need: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default withStyles(styles)(NeedTag);
