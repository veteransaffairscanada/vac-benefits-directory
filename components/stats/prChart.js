import React, { Component } from "react";
import ReactHighcharts from "react-highcharts";
import Moment from "moment";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles/index";
import { connect } from "react-redux";

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
        pointFormat: "{point.x:%e. %b}: {point.y}"
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
    return Object.keys(dataObject).map(i => [
      Moment(i).valueOf(),
      dataObject[i]
    ]);
  };

  filterMerged = () => {
    return this.props.githubData.filter(pr => pr.merged_at);
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
