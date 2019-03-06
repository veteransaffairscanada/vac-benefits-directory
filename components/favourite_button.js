import React, { Component } from "react";
import PropTypes from "prop-types";
import SaveChecked from "./icons/SaveChecked";
import SaveUnchecked from "./icons/SaveUnchecked";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { cx, css } from "emotion";
import { globalTheme } from "../theme";
import HeaderButton from "./header_button";
import { areCookiesDisabled } from "../utils/common";
import Tooltip from "./tooltip";
import CloseButton from "./icons/CloseButton";

const saveButton = css`
  margin-left: -5px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
  padding-top: 0.526315em;
  padding-bottom: 0.526315em;
`;
const hideSmall = css`
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    display: none !important;
  }
`;
const hideBig = css`
  @media only screen and (min-width: ${globalTheme.min.sm}) {
    display: none !important;
  }
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    display: none !important;
  }
`;
const saveIcon = css`
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    font-size: 45px !important;
  }
`;

const xButton = css`
  color: ${globalTheme.colour.blackish2};
  cursor: pointer;
  border: none;
  border-radius: 50%;
  padding: 0;
  :hover {
    color: ${globalTheme.colour.navy};
  }
  :focus {
    outline: 3px solid ${globalTheme.colour.focusColour};
  }
`;

const rightAlign = css`
  flex-grow: 3;
  text-align: right;
  margin-top: -15px;
  margin-right: -15px;
`;

export class FavouriteButton extends Component {
  constructor() {
    super();
    this.cookies = new Cookies();
  }

  toggleFavourite = id => {
    let favouriteBenefits = this.cookies.get("favouriteBenefits")
      ? this.cookies.get("favouriteBenefits")
      : [];
    if (favouriteBenefits.indexOf(id) > -1) {
      favouriteBenefits.splice(favouriteBenefits.indexOf(id), 1);
    } else {
      favouriteBenefits.push(id);
    }
    this.cookies.set("favouriteBenefits", favouriteBenefits, { path: "/" });
    this.props.saveFavourites(favouriteBenefits);
    this.props.toggleOpenState();
  };

  render() {
    const { t, benefit, icon } = this.props;
    const isSaved =
      this.props.favouriteBenefits.indexOf(this.props.benefit.id) > -1;
    const longButtonText = t(
      isSaved ? "B3.favouritesButtonTextRemove" : "B3.favouritesButtonBText"
    );
    const shortButtonText = t(
      isSaved
        ? "B3.favouritesButtonTextRemove"
        : "B3.favouritesButtonBTextMobile"
    );
    const benefitName =
      t("current-language-code") === "en"
        ? benefit.vacNameEn
        : benefit.vacNameFr;

    return (
      <Tooltip
        disabled={!this.props.cookiesDisabled}
        tooltipText={t("favourites.disabled_cookies_tooltip")}
        className={icon ? rightAlign : null}
      >
        {icon ? (
          <button
            className={xButton}
            disabled={this.props.cookiesDisabled}
            ariaLabel={longButtonText + " " + benefitName}
            id={"favourite-" + benefit.id}
            aria-label={t("B3.favouritesButtonText")}
            onClick={() => this.toggleFavourite(benefit.id)}
            onMouseOver={() => {
              this.props.setCookiesDisabled(areCookiesDisabled());
            }}
          >
            <CloseButton />
          </button>
        ) : (
          <HeaderButton
            disabled={this.props.cookiesDisabled}
            ariaLabel={longButtonText + " " + benefitName}
            id={"favourite-" + benefit.id}
            className={saveButton}
            aria-label={t("B3.favouritesButtonText")}
            onClick={() => this.toggleFavourite(benefit.id)}
            onMouseOver={() => {
              this.props.setCookiesDisabled(areCookiesDisabled());
            }}
            size="small"
          >
            {isSaved ? (
              <SaveChecked className={cx("saved", saveIcon)} />
            ) : (
              <SaveUnchecked className={cx("notSaved", saveIcon)} />
            )}
            <span className={hideSmall}>{longButtonText}</span>
            <span className={hideBig}>{shortButtonText}</span>
          </HeaderButton>
        )}
      </Tooltip>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveFavourites: favouriteBenefits => {
      dispatch({
        type: "LOAD_DATA",
        data: { favouriteBenefits: favouriteBenefits }
      });
    },
    setCookiesDisabled: areDisabled => {
      dispatch({ type: "SET_COOKIES_DISABLED", data: areDisabled });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    favouriteBenefits: reduxState.favouriteBenefits,
    cookiesDisabled: reduxState.cookiesDisabled
  };
};

FavouriteButton.propTypes = {
  favouriteBenefits: PropTypes.array.isRequired,
  icon: PropTypes.bool,
  cookiesDisabled: PropTypes.bool.isRequired,
  setCookiesDisabled: PropTypes.func.isRequired,
  saveFavourites: PropTypes.func.isRequired,
  benefit: PropTypes.object.isRequired,
  toggleOpenState: PropTypes.func.isRequired,
  store: PropTypes.object,
  t: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavouriteButton);
