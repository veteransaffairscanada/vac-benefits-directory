import React, { Component } from "react";
import styles from "../styles/styles.scss";
import { WordMark } from "@cdssnc/gcui";
import { AppBar, Button, Grid, Toolbar, Typography } from "material-ui";

type Props = {
  t: mixed
};

class Footer extends Component<Props> {
  props: Props;

  render() {
    const envDetails = process.env.CIRCLE_SHA1
      ? process.env.CIRCLE_SHA1
      : process.env.NODE_ENV;

    return (
      <div className={styles.footer}>
        <AppBar style={{ backgroundColor: "#DDD" }} position="static">
          <Toolbar>
            <Button>{this.props.t("Privacy")}</Button>
            <Typography style={{ flex: 1 }} />
            version: {envDetails}
            <Typography style={{ flex: 1 }} />
            <WordMark />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Footer;
