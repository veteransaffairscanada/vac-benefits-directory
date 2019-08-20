import { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Highlighter from "react-highlight-words";
import Paper from "./paper";
import { connect } from "react-redux";
import NeedTag from "./need_tag";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import BenefitExpansion from "./benefit_expansion";
import BenefitCardHeader from "./benefit_card_header";
import OneLiner from "./typography/one_liner";
import Header from "./typography/header";
import Icon from "./icon";
import { globalTheme } from "../theme";
import LearnMoreButton from "./learn_more_button";

const cardBody = css`
  padding-top: 0px;
  border-top: none;
  border: 1px solid ${globalTheme.colour.darkPaleGrey};
  box-shadow: none;
`;
const cardDescriptionText = css`
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 10px;
  @media only screen and (max-width: ${globalTheme.max.xs}) {
    padding-top: 14px;
  }
`;
const buttonRow = css`
  padding-left: 35px;
  padding-right: 35px;
  padding-bottom: 25px;
`;
const root = css`
  width: 100%;
  display: block;
`;
const benefitName = css`
  padding-top: 35px;
  padding-left: 35px;
  padding-right: 35px;
  padding-bottom: 10px;
  display: flex;
`;

const padding = css`
  padding-left: 35px;
  padding-right: 35px;
`;
const flex = css`
  align-items: center;
  padding-top: 5px;
`;

const tagStyle = css`
  font-size: 12px !important;
  color: ${globalTheme.colour.slateGrey} !important;
  margin-right: 8px;
  margin-bottom: 2px;
  vertical-align: middle;
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
    const language = t("current-language-code");
    const searchWords = this.props.searchString.split(/\s+/);
    return (
      <Grid item xs={12}>
        <div css={root}>
          <Paper styles={cardBody}>
            <BenefitCardHeader
              benefit={benefit}
              t={t}
              store={this.props.store}
              language={language}
            />
            <Header styles={benefitName} size="md" headingLevel="h2">
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
            <div css={padding}>
              {needsMet.length > 0 ? (
                <span css={tagStyle}>
                  <Icon
                    icon="needsTag"
                    size={10}
                    color={`${globalTheme.colour.slateGrey}`}
                  />
                </span>
              ) : null}
              {needsMet.map(need => (
                <NeedTag
                  key={benefit.id + need.id}
                  t={t}
                  need={need}
                  last={needsMet.indexOf(need) === needsMet.length - 1}
                />
              ))}
            </div>
            <OneLiner
              className={"cardDescription"}
              styles={cardDescriptionText}
            >
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

            <Grid container css={buttonRow}>
              <Grid item xs={12}>
                <BenefitExpansion
                  css={padding}
                  benefit={benefit}
                  t={t}
                  store={store}
                />
              </Grid>
              <Grid item xs={12}>
                <div css={flex}>
                  <LearnMoreButton benefit={benefit} t={t} />
                </div>
              </Grid>
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
  savedList: PropTypes.bool.isRequired,
  searchString: PropTypes.string.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(BenefitCard);
