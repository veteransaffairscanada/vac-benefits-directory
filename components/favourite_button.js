import React, { Component } from "react";
import PropTypes from "prop-types";
import { IconButton } from "@material-ui/core";
import Bookmark from "@material-ui/icons/Bookmark";
import BookmarkBorder from "@material-ui/icons/BookmarkBorder";
import { connect } from "react-redux";
import Cookies from "universal-cookie";

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
    console.log("toggle");
  };

  render() {
    return (
      <IconButton
        style={{ marginLeft: "-15px" }}
        aria-label="Favorite Button"
        id={"FavoriteButton" + this.props.benefit.id}
        onClick={() => this.toggleFavourite(this.props.benefit.id)}
      >
        {this.props.favouriteBenefits.indexOf(this.props.benefit.id) > -1 ? (
          <Bookmark />
        ) : (
          <BookmarkBorder />
        )}
      </IconButton>
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
  toggleOpenState: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteButton);
