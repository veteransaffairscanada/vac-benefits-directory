import React, { Component } from "react";
import ReactHighcharts from "react-highcharts";
import MomentBase from "moment";
import { extendMoment } from "moment-range";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles/index";
import { connect } from "react-redux";

const Moment = extendMoment(MomentBase);

const styles = () => ({});

export class PrDurationChart extends Component {
  chartConfig = () => {
    return {
      chart: {
        zoomType: "x"
      },
      title: {
        text: "Average duration of PR per day"
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Date Merged"
        }
      },
      yAxis: {
        allowDecimals: false,
        title: {
          text: "Days"
        },
        min: 0
      },
      plotOptions: {
        spline: {
          marker: {
            enabled: true
          }
        }
      },
      series: [
        {
          data: this.prData(),
          name: "Deploys",
          tooltip: {
            headerFormat: "<b>{series.name}</b><br>",
            pointFormat: "{point.x:%a %e %b}: <b>{point.y}</b>"
          },
          type: "spline"
        },
        {
          data: this.releaseData(),
          name: "Releases",
          tooltip: {
            headerFormat: "<b>{series.name}</b><br>",
            pointFormat: "{point.x:%a %e %b}: <b>{point.tag}</b>"
          },
          type: "column"
        }
      ]
    };
  };

  filterMerged = () => {
    return this.props.githubData.pullRequests
      .filter(pr => pr.merged_at)
      .sort(this.sortByMergedAt);
  };

  maxValue = () => {
    let values = this.prData().map(t => t[1]);
    return Math.max.apply(null, values);
  };

  prData = () => {
    let filtered = this.filterMerged();
    if (filtered.length == 0) {
      return [];
    }
    let lastDate = Moment(filtered[filtered.length - 1].merged_at);
    let firstDate = Moment(filtered[0].merged_at);
    let range = Moment.range(firstDate, lastDate).snapTo("day");
    let dates = Array.from(range.by("day"));
    const reducer = (acc, currentVal) => {
      let date = Moment(currentVal.merged_at).format("YYYY-MM-DD");
      if (acc.hasOwnProperty(date)) {
        acc[date] = acc[date] + 1;
      } else {
        acc[date] = 1;
      }
      return acc;
    };
    const reducerLife = (acc, currentVal) => {
      let date = Moment(currentVal.merged_at).format("YYYY-MM-DD");
      let lifeLength = Moment(currentVal.merged_at).diff(
        Moment(currentVal.created_at),
        "day",
        true
      );
      if (acc.hasOwnProperty(date)) {
        acc[date] = acc[date] + lifeLength;
      } else {
        acc[date] = 1;
      }

      console.log(currentVal.merged_at, date, currentVal.created_at, "diff:");
      return acc;
    };

    const dataCounts = this.filterMerged().reduce(reducer, {});
    const dataLifetimes = this.filterMerged().reduce(reducerLife, {});

    let dataObjectLifetimes = {};
    Object.keys(dataLifetimes).forEach(key => {
      dataObjectLifetimes[key] = dataLifetimes[key] / dataCounts[key];
    });

    return dates.map(m => {
      let key = m.format("YYYY-MM-DD");
      let value = dataObjectLifetimes.hasOwnProperty(key)
        ? dataObjectLifetimes[key]
        : 0;
      return [m.valueOf(), value];
    });
  };

  releaseData = () => {
    let filtered = this.filterMerged();
    let max = this.maxValue();
    return this.props.githubData.releases.map(release => {
      let commit = filtered.find(
        c => c.merge_commit_sha === release.commit.sha
      );
      return {
        tag: release.name,
        x: Moment(commit.created_at).valueOf(),
        y: max
      };
    });
  };

  sortByMergedAt = (a, b) => {
    if (Moment(a.merged_at).valueOf() > Moment(b.merged_at).valueOf()) {
      return 1;
    }
    if (Moment(a.merged_at).valueOf() < Moment(b.merged_at).valueOf()) {
      return -1;
    }
    return 0;
  };

  render() {
    const { classes, t } = this.props; // eslint-disable-line no-unused-vars
    return <ReactHighcharts config={this.chartConfig()} />;
  }
}

const mapStateToProps = reduxState => {
  return {
    githubData: reduxState.githubData
  };
};

PrDurationChart.propTypes = {
  classes: PropTypes.object.isRequired,
  githubData: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(PrDurationChart)
);
