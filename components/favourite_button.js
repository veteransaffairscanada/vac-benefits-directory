import React, { Component } from "react";
import PropTypes from "prop-types";
import Bookmark from "@material-ui/icons/Bookmark";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { css } from "react-emotion";
import { globalTheme } from "../theme";
import HeaderAnchorLink from "./header_anchor_link";

const bookmarkButton = css`
  margin-left: -5px !important;
  padding-left: 0px !important;
  padding-right: 0px !important;
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
    const isBookmarked =
      this.props.favouriteBenefits.indexOf(this.props.benefit.id) > -1;
    return (
      <HeaderAnchorLink
        id={"favourite-" + this.props.benefit.id}
        className={bookmarkButton}
        aria-label={this.props.t("B3.favouritesButtonText")}
        onClick={() => this.toggleFavourite(this.props.benefit.id)}
        size="small"
      >
        {isBookmarked ? (
          <Bookmark className={"bookmarked"} />
        ) : (
          <BookmarkBorder className={"notBookmarked"} />
        )}
        <span className={hideSmall}>
          {this.props.t(
            isBookmarked
              ? "B3.favouritesButtonTextRemove"
              : "B3.favouritesButtonBText"
          )}
        </span>
        <span className={hideBig}>
          {this.props.t(
            isBookmarked
              ? "B3.favouritesButtonTextRemove"
              : "B3.favouritesButtonBTextMobile"
          )}
        </span>
      </HeaderAnchorLink>
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
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    favouriteBenefits: reduxState.favouriteBenefits
  };
};

FavouriteButton.propTypes = {
  favouriteBenefits: PropTypes.array.isRequired,
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
