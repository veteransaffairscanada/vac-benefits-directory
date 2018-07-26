import React, { Component } from "react";
import ReactHighcharts from "react-highcharts";
import MomentBase from "moment";
import { extendMoment } from "moment-range";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles/index";
import { connect } from "react-redux";

const Moment = extendMoment(MomentBase);

const styles = () => ({});

export class PrChart extends Component {
  chartConfig = () => {
    return {
      chart: {
        zoomType: "x"
      },
      title: {
        text: "Deploys over time"
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Date"
        }
      },
      yAxis: {
        title: {
          text: "Deploys per day"
        },
        min: 0
      },
      tooltip: {
        headerFormat: "<b>{series.name}</b><br>",
        pointFormat: "{point.x:%a %e %b}: <b>{point.y}</b>"
      },
      legend: {
        enabled: false
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
          name: "Deploys",
          data: this.chartData()
        }
      ]
    };
  };

  chartData = () => {
    let filtered = this.filterMerged();
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
    let dataObject = this.filterMerged().reduce(reducer, {});
    return dates.map(m => {
      let key = m.format("YYYY-MM-DD");
      let value = dataObject.hasOwnProperty(key) ? dataObject[key] : 0;
      return [m.valueOf(), value];
    });
  };

  filterMerged = () => {
    return this.props.githubData.pullRequests
      .filter(pr => pr.merged_at)
      .sort(this.sortByMergedAt);
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

PrChart.propTypes = {
  classes: PropTypes.object.isRequired,
  githubData: PropTypes.array.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true })(PrChart)
);
