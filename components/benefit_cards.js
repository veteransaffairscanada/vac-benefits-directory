/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Highlighter from "react-highlight-words";
import FavouriteButton from "./favourite_button";
import Paper from "./paper";
import { logEvent } from "../utils/analytics";
import { connect } from "react-redux";
import NeedTag from "./need_tag";
import { css } from "emotion";
import { jsx } from "@emotion/core";
import CardFooter from "./card_footer";
import BenefitCardHeader from "./benefit_card_header";
import OneLiner from "./typography/one_liner";
import Header from "./typography/header";
import Button from "./button";
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
  margin-top: 18px;
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

    const searchWords = this.props.searchString.split(/\s+/);
    return (
      <Grid item xs={12}>
        <div css={root}>
          <Paper css={cardBody}>
            <BenefitCardHeader
              benefit={benefit}
              t={t}
              store={this.props.store}
            />
            <Header css={benefitName} size="sm" headingLevel="h2">
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

            <OneLiner css={"cardDescription " + cardDescriptionText}>
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
            <div css={padding}>
              {needsMet.map(need => (
                <NeedTag key={benefit.id + need.id} t={t} need={need} />
              ))}
            </div>

            <Grid container css={buttonRow}>
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
              <Grid item xs={8} css={alignRight}>
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
          <CardFooter benefit={benefit} t={t} store={this.props.store} />
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
