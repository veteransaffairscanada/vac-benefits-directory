import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Highlighter from "react-highlight-words";
import FavouriteButton from "./favourite_button";
import Paper from "@material-ui/core/Paper";
import { logEvent } from "../utils/analytics";
import { connect } from "react-redux";
import NeedTag from "./need_tag";
import { css } from "react-emotion";
import CardFooter from "./card_footer";
import BenefitCardHeader from "./benefit_card_header";
import BenefitCardHeaderMoreInfo from "./benefit_card_additional_info";
import OneLiner from "./typography/one_liner";
import Header4 from "./typography/header4";
import Button from "./button";
import { globalTheme } from "../theme";

const cardBody = css`
  padding: ${globalTheme.cardPadding} !important;
  padding-top: 20px !important;
  border-radius: 0px !important;
`;
const cardDescriptionText = css`
  padding-top: 26px;
  padding-bottom: 30px;
`;
const root = css`
  width: 100%;
`;
const benefitName = css`
  padding-top: 10px;
`;

const alignRight = css`
  text-align: right !important;
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
          <Paper className={cardBody}>
            <BenefitCardHeader
              benefit={benefit}
              t={t}
              store={this.props.store}
            />
            <BenefitCardHeaderMoreInfo
              benefit={benefit}
              t={t}
              store={this.props.store}
            />
            <Header4 className={benefitName}>
              <Highlighter
                searchWords={this.props.searchString.split(",")}
                autoEscape={true}
                textToHighlight={
                  t("current-language-code") === "en"
                    ? benefit.vacNameEn
                    : benefit.vacNameFr
                }
              />
            </Header4>

            <OneLiner className={"cardDescription " + cardDescriptionText}>
              <Highlighter
                searchWords={this.props.searchString.split(",")}
                autoEscape={true}
                textToHighlight={
                  t("current-language-code") === "en"
                    ? benefit.oneLineDescriptionEn
                    : benefit.oneLineDescriptionFr
                }
              />
            </OneLiner>
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
                  arrow={true}
                  onClick={() => {
                    this.logExit(
                      t("current-language-code") === "en"
                        ? benefit.benefitPageEn
                        : benefit.benefitPageFr
                    );
                    const url =
                      t("current-language-code") === "en"
                        ? benefit.benefitPageEn
                        : benefit.benefitPageFr;
                    const win = window.open(url, "_blank");
                    win.focus();
                  }}
                >
                  {t("Find out more")}
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
