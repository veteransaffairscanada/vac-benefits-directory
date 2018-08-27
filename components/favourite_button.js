import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Bookmark from "@material-ui/icons/Bookmark";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import { withStyles } from "@material-ui/core/styles/index";
import { css } from "react-emotion";

 const hideSmall = css`
    @media (max-width: 700px): {
      display: none;
    }
`;
  const hideBig = css`
    @media (min-width: 400px): {
      display: "none"
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
    const { } = this.props;
    return (
      <Button
        style={{ color: "#3e57e2", marginLeft: "-20px", textTransform: "none" }}
        aria-label={this.props.t("B3.favouritesButtonText")}
        onClick={() => this.toggleFavourite(this.props.benefit.id)}
      >
        {this.props.favouriteBenefits.indexOf(this.props.benefit.id) > -1 ? (
          <Bookmark className={"bookmarked"} />
        ) : (
          <BookmarkBorder className={"notBookmarked"} />
        )}
        <div className={hideSmall}>
          {this.props.t("B3.favouritesButtonBText")}
        </div>
        <div className={hideBig}>
          {this.props.t("B3.favouritesButtonBTextMobile")}
        </div>
      </Button>
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
  t: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavouriteButton);
