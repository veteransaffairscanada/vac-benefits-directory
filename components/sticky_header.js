import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import ShareBox from "../components/share_box";
import EditIcon from "./icons/Edit";
import HeaderLink from "./header_link";
import SaveChecked from "./icons/SaveChecked";
import { css } from "emotion";
import { globalTheme } from "../theme";
import { connect } from "react-redux";
import {
  getFavouritesUrl,
  getPrintUrl,
  getSummaryUrl
} from "../selectors/urls";

const sticky = css`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: ${globalTheme.colour.white};
  z-index: 10;
`;

// if screen size is max.xs or smaller, hide long text
const longText = css`
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    display: none !important;
  }
`;
// if screen size is min.xs or larger, hide short text
const shortText = css`
  @media only screen and (min-width: ${globalTheme.min.xs}) {
    display: none !important;
  }
`;
const alignRight = css`
  text-align: right;
`;
const savedListStyle = css`
  margin-left: 50px;
`;

export class StickyHeader extends Component {
  render() {
    const { t, url, summaryUrl, favouriteBenefits, showShareLink } = this.props;

    const longFavouritesText = t("favourites.saved_benefits", {
      x: favouriteBenefits.length
    });
    const shortFavouritesText = t("favourites.saved_benefits_mobile", {
      x: favouriteBenefits.length
    });

    return (
      <Grid item xs={12} className={sticky}>
        <Grid container spacing={8}>
          <Grid item xs={4}>
            <ShareBox
              t={t}
              printUrl={this.props.printUrl}
              url={url}
              showShareLink={showShareLink}
            />
          </Grid>
          <Grid item xs={8} className={alignRight}>
            <HeaderLink id="editSelections" href={summaryUrl}>
              <EditIcon />
              <span className={longText}>{t("directory.edit_selections")}</span>
              <span className={shortText}>
                {t("directory.edit_selections_mobile")}
              </span>
            </HeaderLink>
            <HeaderLink
              className={savedListStyle}
              id="savedBenefits"
              href={this.props.favouritesUrl}
            >
              <SaveChecked />
              <span className={longText}>{longFavouritesText}</span>
              <span className={shortText}>{shortFavouritesText}</span>
            </HeaderLink>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (reduxState, props) => {
  return {
    favouriteBenefits: reduxState.favouriteBenefits,
    favouritesUrl: getFavouritesUrl(reduxState, props),
    summaryUrl: getSummaryUrl(reduxState, props),
    printUrl: getPrintUrl(reduxState, props, {})
  };
};

StickyHeader.propTypes = {
  url: PropTypes.object.isRequired,
  favouritesUrl: PropTypes.string,
  summaryUrl: PropTypes.string.isRequired,
  printUrl: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object,
  showShareLink: PropTypes.bool,
  favouriteBenefits: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(StickyHeader);
