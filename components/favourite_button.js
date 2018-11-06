import React, { Component } from "react";
import PropTypes from "prop-types";
import Bookmark from "./icons/Bookmark";
import BookmarkBorder from "./icons/BookmarkBorder";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { cx, css } from "react-emotion";
import { globalTheme } from "../theme";
import HeaderButton from "./header_button";
import { areCookiesDisabled } from "../utils/common";
import Tooltip from "./tooltip";

const bookmarkButton = css`
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
const bookmarkIcon = css`
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    font-size: 45px !important;
  }
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
    const { t, benefit } = this.props;
    const isBookmarked =
      this.props.favouriteBenefits.indexOf(this.props.benefit.id) > -1;
    const longButtonText = t(
      isBookmarked
        ? "B3.favouritesButtonTextRemove"
        : "B3.favouritesButtonBText"
    );
    const shortButtonText = t(
      isBookmarked
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
      >
        <HeaderButton
          disabled={this.props.cookiesDisabled}
          ariaLabel={longButtonText + " " + benefitName}
          id={"favourite-" + benefit.id}
          className={bookmarkButton}
          aria-label={t("B3.favouritesButtonText")}
          onClick={() => this.toggleFavourite(benefit.id)}
          onMouseOver={() => {
            this.props.setCookiesDisabled(areCookiesDisabled());
          }}
          size="small"
        >
          {isBookmarked ? (
            <Bookmark className={cx("bookmarked", bookmarkIcon)} />
          ) : (
            <BookmarkBorder className={cx("notBookmarked", bookmarkIcon)} />
          )}
          <span className={hideSmall}>{longButtonText}</span>
          <span className={hideBig}>{shortButtonText}</span>
        </HeaderButton>
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
