import React, { Component } from "react";
import { Typography, Button } from "material-ui";
import classnames from "classnames";
import { withStyles } from "material-ui/styles";
import ExpansionPanel from "material-ui/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "material-ui/ExpansionPanel/ExpansionPanelSummary";
import ExpansionPanelDetails from "material-ui/ExpansionPanel/ExpansionPanelDetails";
import ExpansionPanelActions from "material-ui/ExpansionPanel/ExpansionPanelActions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import PropTypes from "prop-types";

type Props = {
  benefit: mixed,
  t: mixed,
  classes: mixed
};

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

export class EmbeddedBenefitCard extends Component<Props> {
  props: Props;

  render() {
    const { t, classes, benefit } = this.props;
    return (
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classnames(classes.heading)}>
            {t("current-language-code") === "en"
              ? benefit.vacNameEn
              : benefit.vacNameFr}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </ExpansionPanelDetails>
        <ExpansionPanelActions>
          <Button
            size="small"
            target="_blank"
            variant="raised"
            href={
              this.props.t("current-language-code") === "en"
                ? benefit.benefitPageEn
                : benefit.benefitPageFr
            }
          >
            {t("View Details")}
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    );
  }
}
EmbeddedBenefitCard.propTypes = {
  classes: PropTypes.object.isRequired
};
export default withStyles(styles)(EmbeddedBenefitCard);
