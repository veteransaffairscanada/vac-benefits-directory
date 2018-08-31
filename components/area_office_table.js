import React, { Component } from "react";
import PropTypes from "prop-types";
import Pin from "@material-ui/icons/Place";
import { cx, css } from "react-emotion";
import { connect } from "react-redux";
import { globalTheme } from "../theme";

const root = css`
  margin-right: 10px;
  margin-left: 10px;
`;
const tableWidth = css`
  width: 100%;
`;
const scrollingDiv = css`
height: 400px;
width: 100%;
overflow-y: scroll;
`;
const tableHeaderDiv = css`
  width: 100% !important;
  margin-top: ${globalTheme.marginTop};
  border-bottom: 1px solid #e0e0e0;
`;
const distanceCell = css`
  text-align: right;
  vertical-align: text-top;
  width: 20px;
  padding-right: 20px;
`;
const distanceCellTitle = css`
  text-align: right;
  width: 20px;
  padding-right: 20px;
`;
const officeRow = css`
  td {
    border-bottom: 0.5px solid #e0e0e0;
  }
`;
const officeCellHeader = css`
  padding-left: 70px;
  text-align: left;
`;
const pinCell = css`
  padding-right: 10px !important;
`;
const officeCell = css`
  padding-bottom: 10px;
`;
const bold = css`
  font-weight: bold;
`;
const pin = css`
  color: #ea4335;
  font-size: 60px !important;
  padding-top: 10px;
`;
const provinceCell = css`
  color: #000;
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid #e0e0e0;
  padding-top: 15px;
  padding-bottom: 15px;
`;
const selectedRow = css`
  background-color: #e4e8fe;
`;
const mainTable = css`
  border-spacing: 0px;
`;

export class AreaOfficeTable extends Component {
  computeDistanceKm = (lat1, long1, lat2, long2) => {
    const R = 6371; // kilometres
    const Radians = degrees => (degrees * Math.PI) / 180;
    const lat1Rad = Radians(lat1);
    const long1Rad = Radians(long1);
    const lat2Rad = Radians(lat2);
    const long2Rad = Radians(long2);
    const x = (long2Rad - long1Rad) * Math.cos((lat1Rad + lat2Rad) / 2);
    const y = lat2Rad - lat1Rad;
    return Math.sqrt(x * x + y * y) * R;
  };

  defaultAreaOffices = () => {
    const reducer = (acc, office) => {
      const key = [office.province_en, office.province_fr];
      if (acc[key]) {
        acc[key].push(office);
      } else {
        acc[key] = [office];
      }
      return acc;
    };
    return this.props.areaOffices.reduce(reducer, {});
  };

  isDefaultLocation = () => {
    const defaultLocation = { lat: 49, lng: -104 };
    return (
      JSON.stringify(defaultLocation) ===
      JSON.stringify(this.props.userLocation)
    );
  };

  officeDistance = () => {
    let officeDistance = {};
    this.props.areaOffices.forEach(ae => {
      officeDistance[ae.id] = this.computeDistanceKm(
        this.props.userLocation.lat,
        this.props.userLocation.lng,
        ae.lat,
        ae.lng
      );
    });
    return officeDistance;
  };

  sortedAreaOffices = () => {
    let officeDistance = this.officeDistance();
    let sortedOffices = this.props.areaOffices.sort((a, b) => {
      const diff = officeDistance[a.id]
        ? officeDistance[a.id] - officeDistance[b.id]
        : a.name_en.toUpperCase().localeCompare(b.name_en.toUpperCase());
      switch (true) {
        case diff > 0:
          return 1;
        case diff < 0:
          return -1;
        default:
          return 0;
      }
    });

    if (Object.keys(officeDistance).length > 0) {
      this.props.setClosestAreaOffice(sortedOffices[0]);
    }
    return sortedOffices;
  };

  sortProvinces = provinces => {
    let index = this.props.t("current-language-code") == "en" ? 0 : 1;
    return provinces.sort((a, b) =>
      a.split(",")[index].localeCompare(b.split(",")[index])
    );
  };

  tableRow = ae => {
    const language = this.props.t("current-language-code");
    const distances = this.officeDistance();
    return (
      <tr
        key={"tableRow" + ae.id}
        id={"tableRow" + ae.id}
        className={
          ae.id === this.props.selectedAreaOffice.id
            ? cx(officeRow, selectedRow)
            : officeRow
        }
        onClick={() => {
          this.props.setMapView({
            lat: ae.lat,
            lng: ae.lng,
            zoom: 10
          });
          this.props.setSelectedAreaOffice(ae);
        }}
      >
        <td className={pinCell}>
          <Pin className={pin} />
        </td>
        <td className={officeCell}>
          <p className={bold}>{language === "en" ? ae.name_en : ae.name_fr}</p>
          {language === "en" ? ae.address_en : ae.address_fr}
        </td>
        {this.isDefaultLocation() ? null : (
          <td className={distanceCell}>
            <p className={bold}>{Math.round(distances[ae.id]) + " km"}</p>
          </td>
        )}
      </tr>
    );
  };

  render() {
    const { t } = this.props;
    const defaultOffices = this.defaultAreaOffices();
    return (
      <div className={root}>
        <div className={tableHeaderDiv}>
          <table className={tableWidth}>
            <tbody>
              <tr id="tableHeader">
                <th className={officeCellHeader}>{t("map.office")}</th>
                {this.isDefaultLocation() ? null : (
                  <th className={distanceCellTitle}>{t("map.distance")}</th>
                )}
              </tr>
            </tbody>
          </table>
        </div>
        <div
          id="scrolling_div"
          className={scrollingDiv}
          >
          <table className={mainTable}>
            <colgroup>
              <col span="1" style={{ width: "10%" }} />
              {this.isDefaultLocation() ? (
                <col span="1" style={{ width: "90%" }} />
              ) : (
                <React.Fragment>
                  <col span="1" style={{ width: "70%" }} />
                  <col span="1" style={{ width: "20%" }} />
                </React.Fragment>
              )}
            </colgroup>
            <tbody>
              {this.isDefaultLocation()
                ? this.sortProvinces(Object.keys(defaultOffices)).map(
                    (name, i1) => {
                      return (
                        <React.Fragment key={i1}>
                          <tr>
                            <td className={provinceCell} />
                            <td
                              className={provinceCell}
                              colSpan={this.isDefaultLocation() ? "1" : "2"}
                            >
                              {t("current-language-code") == "en"
                                ? name.split(",")[0]
                                : name.split(",")[1]}{" "}
                              ({defaultOffices[name].length})
                            </td>
                          </tr>
                          {defaultOffices[name].map(ae => this.tableRow(ae))}
                        </React.Fragment>
                      );
                    }
                  )
                : this.sortedAreaOffices().map(ae => this.tableRow(ae))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setClosestAreaOffice: closestAreaOffice => {
      dispatch({ type: "SET_CLOSEST_OFFICE", data: closestAreaOffice });
    },
    setSelectedAreaOffice: selectedAreaOffice => {
      dispatch({ type: "SET_SELECTED_OFFICE", data: selectedAreaOffice });
    },
    setMapView: mapView => {
      dispatch({ type: "SET_MAP_VIEW", data: mapView });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    areaOffices: reduxState.areaOffices,
    selectedAreaOffice: reduxState.selectedAreaOffice,
    userLocation: reduxState.userLocation
  };
};

AreaOfficeTable.propTypes = {
  areaOffices: PropTypes.array.isRequired,
  selectedAreaOffice: PropTypes.object.isRequired,
  setClosestAreaOffice: PropTypes.func.isRequired,
  setSelectedAreaOffice: PropTypes.func.isRequired,
  setMapView: PropTypes.func.isRequired,
  userLocation: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AreaOfficeTable);
