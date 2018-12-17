/** @jsx jsx */
import { Component } from "react";
import PropTypes from "prop-types";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "./icons/ExpandMore";
import NeedsSelector from "./needs_selector";
import ProfileSelector from "./profile_selector";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { globalTheme } from "../theme";
import { css, jsx } from "@emotion/core";
import HeaderButton from "./header_button";
import Header from "./typography/header";
import CloseIcon from "./icons/Close";
import EditIcon from "./icons/Edit";

const root = css`
  background-color: ${globalTheme.colour.white} !important;
  border: thin solid ${globalTheme.colour.cerulean} !important;
  box-shadow: none !important;
`;
const summary = css`
  opacity: 1 !important;
  user-select: inherit;
  color: ${globalTheme.colour.cerulean} !important;
`;
const clearButton = css`
  font-size: 16px !important;
`;
const filterTitle = css`
  padding-right: 0px;
  padding-left: 10px;
  color: ${globalTheme.colour.cerulean};
`;
const closeIcon = css`
  font-size: 100% !important;
  margin-left ${globalTheme.unit};
  font-weight: bold;
`;
const cerulean = css`
  color: ${globalTheme.colour.cerulean};
`;

export class SelectionsEditor extends Component {
  state = {
    open: false
  };

  countSelected = () => {
    let selectedProfileFilters = 0;
    this.props.profileQuestions.forEach(question => {
      if (this.props.responses[question.variable_name]) {
        selectedProfileFilters = 1;
      }
    });
    return (
      selectedProfileFilters + Object.values(this.props.selectedNeeds).length
    );
  };

  clearFilters = () => {
    this.props.profileQuestions.forEach(q => {
      this.props.saveQuestionResponse(q.variable_name, "");
    });
    this.props.saveQuestionResponse("selectedNeeds", {});
  };

  toggleOpenState = () => {
    let newState = !this.state.open;
    this.setState({ open: newState });
  };

  render() {
    const { t, store } = this.props;
    return (
      <ExpansionPanel css={root} defaultExpanded expanded={this.state.open}>
        <ExpansionPanelSummary
          css={summary}
          expandIcon={<ExpandMoreIcon css={cerulean} />}
          onClick={() => this.toggleOpenState()}
        >
          <EditIcon t={t} />
          <Header headingLevel="h2" size="sm_md" css={filterTitle}>
            {t("directory.edit_selections")}
          </Header>{" "}
        </ExpansionPanelSummary>

        <ExpansionPanelDetails>
          <Grid container>
            <Grid item xs={12}>
              {this.countSelected() > 0 ? (
                <HeaderButton
                  id="ClearFilters"
                  css={clearButton}
                  onClick={() => {
                    this.clearFilters();
                  }}
                >
                  {t("reset filters")} {"(" + this.countSelected() + ")"}
                  <CloseIcon css={closeIcon} />
                </HeaderButton>
              ) : null}
            </Grid>

            <Grid item xs={12}>
              <ProfileSelector t={t} store={store} />
            </Grid>
            <Grid item xs={12}>
              <NeedsSelector t={t} store={store} />
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveQuestionResponse: (question, response) => {
      dispatch({
        type: "SAVE_QUESTION_RESPONSE",
        data: { [question]: response }
      });
    }
  };
};

const mapStateToProps = reduxState => {
  return {
    profileQuestions: reduxState.questions.filter(
      q => q.variable_name !== "needs"
    ),
    responses: reduxState,
    selectedNeeds: reduxState.selectedNeeds
  };
};

SelectionsEditor.propTypes = {
  profileQuestions: PropTypes.array.isRequired,
  responses: PropTypes.object.isRequired,
  saveQuestionResponse: PropTypes.func.isRequired,
  selectedNeeds: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectionsEditor);
