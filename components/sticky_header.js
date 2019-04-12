import { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import ShareBox from "../components/share_box";
//import EditIcon from "./icons/Edit";
import HeaderLink from "./header_link";
import SaveChecked from "./icons/SaveChecked";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { globalTheme } from "../theme";
import { connect } from "react-redux";
import { getFavouritesUrl, getSummaryUrl } from "../selectors/urls";

const sticky = css`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: ${globalTheme.colour.white};
  z-index: 10;
`;

// if screen size is max.sm or smaller, hide long text
const longText = css`
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    display: none !important;
  }
`;
// if screen size is min.sm or larger, hide short text
const shortText = css`
  @media only screen and (min-width: ${globalTheme.min.sm}) {
    display: none !important;
  }
`;
const alignRight = css`
  text-align: right;
`;
const savedListStyle = css`
  margin-left: 50px;
  padding: 0px;
  font-size: 20px;
  color: ${globalTheme.colour.navy};
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    font-size: 12px !important;
    margin-left: 25px;
  }
`;
/*
const editStyle = css`
  padding: 0;
  font-size: 20px;
  color: ${globalTheme.colour.navy};
  @media only screen and (max-width: ${globalTheme.max.sm}) {
    font-size: 12px !important;
  }
`;
*/
export class StickyHeader extends Component {
  render() {
    const { t, url, favouriteBenefits, showShareLink } = this.props;

    const longFavouritesText = t("favourites.saved_benefits", {
      x: favouriteBenefits.length
    });
    const shortFavouritesText = t("favourites.saved_benefits_mobile", {
      x: favouriteBenefits.length
    });

    return (
      <Grid item xs={12} css={sticky}>
        <Grid container spacing={8}>
          <Grid item xs={6}>
            <ShareBox
              t={t}
              printUrl={this.props.printUrl}
              url={url}
              showShareLink={showShareLink}
            />
          </Grid>
          <Grid item xs={6} css={alignRight}>
            {/* <HeaderLink
              id="editSelections"
              href={this.props.summaryUrl}
              className={editStyle}
            >
              <EditIcon />
              <span css={longText}>{t("directory.edit_selections")}</span>
              <span css={shortText}>
                {t("directory.edit_selections_mobile")}
              </span>
            </HeaderLink> */}
            <HeaderLink
              css={savedListStyle}
              id="savedBenefits"
              href={this.props.favouritesUrl}
            >
              <SaveChecked />
              <span css={longText}>{longFavouritesText}</span>
              <span css={shortText}>{shortFavouritesText}</span>
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
    summaryUrl: getSummaryUrl(reduxState, props)
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
