import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import { css } from "react-emotion";
import { globalTheme } from "../theme";
import AnchorLink from "./typography/anchor_link";

const outerDiv = css`
  padding: 12px;
`;

const breadcrumbCss = css`
  border-top: 1px solid ${globalTheme.colour.warmGrey};
  padding-bottom: 15px;
  padding-top: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 24px;
`;

const breadcrumbList = css`
  border-bottom: 1px solid ${globalTheme.colour.warmGrey};
  padding-left: 0;
  @media (max-width: 599px);
`;

export class GuidedExperienceSummary extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className={outerDiv}>
        <Grid container spacing={24}>
          <ul className={breadcrumbList}>
            <li className={breadcrumbCss}>
              <AnchorLink
                id={"breadcrumb1"}
                href="#"
                onClick={x => x}
                fontSize={24}
              >
                Benefits for Veterans PL
              </AnchorLink>
            </li>
            <li className={breadcrumbCss}>
              <AnchorLink
                id={"breadcrumb2"}
                href="#"
                onClick={x => x}
                fontSize={24}
              >
                Canadian Armed Forces PL
              </AnchorLink>
            </li>
            <li className={breadcrumbCss}>
              <AnchorLink
                id={"breadcrumb3"}
                href="#"
                onClick={x => x}
                fontSize={24}
              >
                Has a service related health issue PL
              </AnchorLink>
            </li>
          </ul>
        </Grid>
      </div>
    );
  }
}

GuidedExperienceSummary.propTypes = {
  t: PropTypes.func.isRequired,
  store: PropTypes.object
};

export default GuidedExperienceSummary;
