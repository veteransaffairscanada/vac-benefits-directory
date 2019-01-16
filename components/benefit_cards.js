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
import HeaderButton from "./header_button";
import { globalTheme } from "../theme";

const cardBody = css`
  padding-top: 0px;
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
  state = {
    expanded: false
  };

  componentDidMount() {
    this.forceUpdate();
  }

  toggleExpanded = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const { t, benefit } = this.props;

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
            <BenefitCardHeader
              benefit={benefit}
              t={t}
              store={this.props.store}
            />
            <Header className={benefitName} size="sm" headingLevel="h2">
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
            {this.state.expanded ? (
              <BenefitExpansion
                className={padding}
                benefit={benefit}
                t={t}
                store={this.props.store}
              />
            ) : null}

            <Grid container className={buttonRow}>
              <Grid item xs={4}>
                <HeaderButton
                  id={"see-more-less" + benefit.id}
                  onClick={this.toggleExpanded}
                  size="small"
                >
                  {this.state.expanded ? t("B3.see_less") : t("B3.see_more")}
                </HeaderButton>
              </Grid>
              {this.props.showFavourite ? (
                <Grid item xs={8} className={alignRight}>
                  <FavouriteButton
                    benefit={benefit}
                    toggleOpenState={() => {}}
                    store={this.props.store}
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
