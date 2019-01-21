import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import { Grid } from "@material-ui/core";
import EditIcon from "./icons/Edit";
import { globalTheme } from "../theme";
import { mutateUrl } from "../utils/common";
import AnchorLink from "./typography/anchor_link";

const rightAlign = css`
  text-align: right !important;
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

const SummaryRow = (content, section, key, t) => {
  return (
    <li className={breadcrumbCss} key={key}>
      <Grid container>
        <Grid item xs={9}>
          {content}
        </Grid>
        <Grid item xs={3} className={rightAlign}>
          <AnchorLink
            href={mutateUrl(this.props.url, "/index", { section: section })}
            fontSize={24}
          >
            <EditIcon
              focusable="true"
              aria-hidden="false"
              role="img"
              aria-label={t("alt_text.edit")}
            />
          </AnchorLink>
        </Grid>
      </Grid>
    </li>
  );
};

SummaryRow.propTypes = {
  content: PropTypes.object.isRequired,
  section: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  key: PropTypes.object
};

export default SummaryRow;
