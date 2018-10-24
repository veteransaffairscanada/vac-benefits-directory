import React, { Component } from "react";
import PropTypes from "prop-types";
import Pin from "./icons/Place";
import { cx, css } from "react-emotion";
import { connect } from "react-redux";
import { globalTheme } from "../theme";
import Body from "../components/typography/body";

const scrollingDiv = css`
  box-sizing: border-box;
  margin-top: 15px;
  margin-bottom: 15px;
  height: 750px;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    height: 400px;
  }
  width: 100%;
  overflow-y: scroll;
  padding: 10px;
`;
const distanceCell = css`
  text-align: right;
  vertical-align: text-top;
  width: 20px;
  padding-right: 20px;
`;
const officeRow = css`
  td {
    border-bottom: 0.5px solid ${globalTheme.colour.paleGrey};
  }
  :focus {
    outline: 3px solid ${globalTheme.colour.govukYellow};
    outline-offset: 0;
  }
`;
const pinCell = css`
  padding-right: 10px !important;
  vertical-align: top; //desktop
`;
const officeCell = css`
  padding-bottom: 10px;
`;
const bold = css`
  font-weight: bold;
`;
const tableText = css`
  font-size: 18px;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    font-size: 14px;
  }
  margin-top: 4px;
  margin-bottom: 0px;
`;
const pin = css`
  color: ${globalTheme.colour.tornadoRed};
  margin-top: 6px;
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    font-size: 60px !important;
  }
  font-size: 30px !important;
`;
const provinceCell = css`
  color: ${globalTheme.colour.white};
  font-size: 20px;
  font-weight: bold;
  border-bottom: 1px solid ${globalTheme.colour.black};
  padding-top: 15px;
  padding-bottom: 15px;
`;
const selectedRow = css`
  background-color: ${globalTheme.colour.paleBlue};
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
        tabIndex={0}
        className={
          ae.id === this.props.selectedAreaOffice.id
            ? cx(officeRow, selectedRow)
            : officeRow
        }
        onKeyPress={e => {
          if (e.key == "Enter") {
            this.props.setMapView({
              lat: ae.lat,
              lng: ae.lng,
              zoom: 10
            });
            this.props.setSelectedAreaOffice(ae);
          }
        }}
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
          <Body className={cx(tableText, bold)}>
            {language === "en" ? ae.name_en : ae.name_fr}
          </Body>
          <Body className={tableText}>
            {language === "en" ? ae.address_en : ae.address_fr}
          </Body>
        </td>
        {this.isDefaultLocation() ? null : (
          <td className={distanceCell}>
            <Body className={cx(tableText, bold)}>
              {Math.round(distances[ae.id]) + " km"}
            </Body>
          </td>
        )}
      </tr>
    );
  };

  render() {
    const { t } = this.props;
    const defaultOffices = this.defaultAreaOffices();
    return (
      <div>
        <div id="scrolling_div" className={scrollingDiv}>
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
