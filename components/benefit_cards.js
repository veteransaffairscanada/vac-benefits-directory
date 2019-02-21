import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Highlighter from "react-highlight-words";
import FavouriteButton from "./favourite_button";
import Paper from "./paper";
import { connect } from "react-redux";
import NeedTag from "./need_tag";
import { css } from "emotion";
import BenefitExpansion from "./benefit_expansion";
import BenefitCardHeader from "./benefit_card_header";
import OneLiner from "./typography/one_liner";
import Header from "./typography/header";
import { globalTheme } from "../theme";
import LearnMoreButton from "./learn_more_button";

const cardBody = css`
  padding-top: 0px;
  border-top: none;
  border: thin solid ${globalTheme.colour.paleGrey};
`;
const cardDescriptionText = css`
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 26px;
  padding-bottom: 30px;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    padding-top: 14px;
    padding-bottom: 20px;
  }
`;
const buttonRow = css`
  padding-left: 35px;
  padding-right: 35px;
  padding-bottom: 35px;
`;
const root = css`
  width: 100%;
  display: block;
`;
const benefitName = css`
  padding-top: 35px;
  padding-left: 35px;
  padding-right: 35px;
`;

const padding = css`
  padding-left: 35px;
  padding-right: 35px;
`;
const alignRight = css`
  text-align: right;
`;

export class BenefitCard extends Component {
  componentDidMount() {
    this.forceUpdate();
  }

  render() {
    const { t, benefit, store } = this.props;

    const needsMet = benefit.needs
      ? this.props.needs.filter(
          need =>
            benefit.needs.indexOf(need.id) > -1 &&
            this.props.selectedNeeds[need.id]
        )
      : [];

    const searchWords = this.props.searchString.split(/\s+/);
    return (
      <Grid item xs={12}>
        <div className={root}>
          <Paper className={cardBody}>
            <BenefitCardHeader benefit={benefit} t={t} store={store} />
            <Header className={benefitName} size="md" headingLevel="h2">
              <Highlighter
                searchWords={searchWords}
                autoEscape={true}
                textToHighlight={
                  this.props.currentLanguage === "en"
                    ? benefit.vacNameEn
                    : benefit.vacNameFr
                }
              />
            </Header>

            <OneLiner className={"cardDescription " + cardDescriptionText}>
              <Highlighter
                searchWords={searchWords}
                autoEscape={true}
                textToHighlight={
                  this.props.currentLanguage === "en"
                    ? benefit.oneLineDescriptionEn
                    : benefit.oneLineDescriptionFr
                }
              />
            </OneLiner>
            <div className={padding}>
              {needsMet.map(need => (
                <NeedTag key={benefit.id + need.id} t={t} need={need} />
              ))}
            </div>
            <Grid container className={buttonRow}>
              <Grid item xs={12}>
                <BenefitExpansion
                  className={padding}
                  benefit={benefit}
                  t={t}
                  store={store}
                />
              </Grid>
              <Grid item xs={4}>
                <LearnMoreButton benefit={benefit} t={t} />
              </Grid>
              {this.props.showFavourite ? (
                <Grid item xs={8} className={alignRight}>
                  <FavouriteButton
                    benefit={benefit}
                    toggleOpenState={() => {}}
                    store={store}
                    t={t}
                  />
                </Grid>
              ) : null}
            </Grid>
          </Paper>
        </div>
      </Grid>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    needs: reduxState.needs,
    selectedNeeds: reduxState.selectedNeeds,
    searchString: reduxState.searchString,
    benefits: reduxState.benefits
  };
};

BenefitCard.propTypes = {
  benefits: PropTypes.array.isRequired,
  benefit: PropTypes.object.isRequired,
  needs: PropTypes.array.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  showFavourite: PropTypes.bool.isRequired,
  searchString: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(BenefitCard);
