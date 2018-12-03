import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Highlighter from "react-highlight-words";
import FavouriteButton from "./favourite_button";
import Paper from "./paper";
import { connect } from "react-redux";
import NeedTag from "./need_tag";
import { css } from "react-emotion";
import RelatedBenefits from "./related_benefits_list";
import BenefitCardHeader from "./benefit_card_header";
import OneLiner from "./typography/one_liner";
import Header from "./typography/header";
import HeaderButton from "./header_button";
import { globalTheme } from "../theme";

const cardBody = css`
  padding-top: 20px;
`;
const cardDescriptionText = css`
  padding-top: 26px;
  padding-bottom: 30px;
  @media only screen and (max-width: ${globalTheme.max.mobile}) {
    padding-top: 14px;
    padding-bottom: 20px;
  }
`;
const buttonRow = css`
  margin-top: 18px;
`;
const root = css`
  width: 100%;
`;
const benefitName = css`
  padding-top: 10px;
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
          <Paper padding="md" className={cardBody}>
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
                  t("current-language-code") === "en"
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
            {this.state.expanded ? (
              <RelatedBenefits
                benefit={benefit}
                t={t}
                store={this.props.store}
              />
            ) : null}
            <Grid container className={buttonRow}>
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
              <HeaderButton onClick={this.toggleExpanded}>
                See More
              </HeaderButton>
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
