import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Button } from "@material-ui/core";
import { KeyboardBackspace } from "@material-ui/icons";
import Highlighter from "react-highlight-words";
import FavouriteButton from "./favourite_button";
import Paper from "@material-ui/core/Paper";
import { logEvent } from "../utils/analytics";
import { connect } from "react-redux";
import NeedTag from "./need_tag";
import { css } from "react-emotion";
import CardFooter from "./card_footer";
import BenefitCardHeader from "./benefit_card_header";

const button = css`
  background-color: #3e57e2 !important;
  color: white !important;
  text-align: right !important;
  text-transform: none !important;
`;
const cardBody = css`
  padding: 25px !important;
  padding-top: 15px !important;
`;
const cardDescriptionText = css`
  font-size: 18px;
  padding: 10px 0px;
  padding-bottom: 15px;
`;
const root = css`
  width: 100%;
`;
const benefitName = css`
  font-size: 24px;
  font-weight: 600;
  padding: 10px 0;
`;
const rightArrowIcon = css`
  -moz-transform: scaleX(-1);
  -o-transform: scaleX(-1);
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
  float: left;
  filter: FlipH;
  -ms-filter: fliph;
  padding-right: 10px;
`;
const alignRight = css`
  text-align: right;
`;
export class BenefitCard extends Component {
  logExit = url => {
    logEvent("Exit", url);
  };

  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const { t, benefit } = this.props;

    const needsMet = benefit.needs
      ? this.props.needs.filter(
          need =>
            benefit.needs.indexOf(need.id) > -1 &&
            this.props.selectedNeeds[need.id]
        )
      : [];

    return (
      <Grid item xs={12}>
        <div className={root}>
          <BenefitCardHeader benefit={benefit} t={t} store={this.props.store} />
          <Paper className={cardBody}>
            <div component="p" className={benefitName}>
              <Highlighter
                searchWords={this.props.searchString.split(",")}
                autoEscape={true}
                textToHighlight={
                  t("current-language-code") === "en"
                    ? benefit.vacNameEn
                    : benefit.vacNameFr
                }
              />
            </div>

            <h2 className={"cardDescription " + cardDescriptionText}>
              <Highlighter
                searchWords={this.props.searchString.split(",")}
                autoEscape={true}
                textToHighlight={
                  t("current-language-code") === "en"
                    ? benefit.oneLineDescriptionEn
                    : benefit.oneLineDescriptionFr
                }
              />
            </h2>
            <div>
              {needsMet.map(need => (
                <NeedTag key={benefit.id + need.id} t={t} need={need} />
              ))}
            </div>

            <Grid container>
              {this.props.showFavourite ? (
                <Grid item xs={4}>
                  <FavouriteButton
                    benefit={benefit}
                    toggleOpenState={() => {}}
                    store={this.props.store}
                    t={t}
                  />
                </Grid>
              ) : null}
              <Grid item xs={8} className={alignRight}>
                <Button
                  className={button}
                  target="_blank"
                  variant="raised"
                  onClick={() =>
                    this.logExit(
                      t("current-language-code") === "en"
                        ? benefit.benefitPageEn
                        : benefit.benefitPageFr
                    )
                  }
                  href={
                    t("current-language-code") === "en"
                      ? benefit.benefitPageEn
                      : benefit.benefitPageFr
                  }
                  rel="noopener noreferrer"
                >
                  {t("Find out more")}
                  <KeyboardBackspace className={rightArrowIcon} />
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <CardFooter
            showFavourite={this.props.showFavourite}
            benefit={benefit}
            t={t}
            store={this.props.store}
          />
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    needs: reduxState.needs,
    selectedNeeds: reduxState.selectedNeeds,
    benefits: reduxState.benefits
  };
};

BenefitCard.propTypes = {
  benefits: PropTypes.array.isRequired,
  benefit: PropTypes.object.isRequired,
  needs: PropTypes.array.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  showFavourite: PropTypes.bool.isRequired,
  searchString: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(BenefitCard);
