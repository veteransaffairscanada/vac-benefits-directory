import React, { Component } from "react";
import PropTypes from "prop-types";
import RadioSelector from "./radio_selector";
import { connect } from "react-redux";
import "babel-polyfill/dist/polyfill";
import { Grid } from "@material-ui/core";
import {
  showStatusAndVitals,
  showServiceHealthIssue,
  showServiceType
} from "../selectors/show_filters";

export class ProfileSelector extends Component {
  render() {
    const {
      t,
      showServiceType,
      showStatusAndVitals,
      showServiceHealthIssue
    } = this.props;
    return (
      <div>
        <Grid container spacing={8}>
          <Grid item xs={12} className="patronTypeFilter">
            <RadioSelector
              t={t}
              legend={t("B3.Filter by eligibility")}
              selectorType={"patronType"}
              store={this.props.store}
            />
          </Grid>

          {showServiceType ? (
            <Grid item xs={12} className="serviceTypeFilter">
              <RadioSelector
                t={t}
                legend={t("B3.ServiceType")}
                selectorType={"serviceType"}
                store={this.props.store}
              />
            </Grid>
          ) : (
            ""
          )}

          {showStatusAndVitals ? (
            <Grid item xs={12} className="statusAndVitalsFilter">
              <RadioSelector
                t={t}
                legend={t("B3.serviceStatus")}
                selectorType={"statusAndVitals"}
                store={this.props.store}
              />
            </Grid>
          ) : (
            ""
          )}

          {showServiceHealthIssue ? (
            <Grid item xs={12} className="serviceHealthIssueFilter">
              <RadioSelector
                t={t}
                legend={t(
                  this.props.statusAndVitals === "deceased"
                    ? "health issue question deceased"
                    : "health issue question"
                )}
                selectorType={"serviceHealthIssue"}
                options={["true", "false"]}
                store={this.props.store}
              />
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    statusAndVitals: reduxState.statusAndVitals,
    showStatusAndVitals: showStatusAndVitals(reduxState),
    showServiceHealthIssue: showServiceHealthIssue(reduxState),
    showServiceType: showServiceType(reduxState)
  };
};

ProfileSelector.propTypes = {
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  statusAndVitals: PropTypes.string.isRequired,
  store: PropTypes.object,
  showStatusAndVitals: PropTypes.bool.isRequired,
  showServiceHealthIssue: PropTypes.bool.isRequired,
  showServiceType: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(ProfileSelector);
