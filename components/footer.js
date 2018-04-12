import React, { Component } from "react";
import styles from "../styles/styles.scss";
import { WordMark } from "@cdssnc/gcui";
import { AppBar, Button, Grid, Toolbar, Typography } from "material-ui";

type CardProps = {
  benefit: mixed,
  t: mixed
};

type Props = {
  benefitList: mixed,
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
            {/*<Button>{this.props.t("Privacy")}</Button>*/}
            <Button>Privacy</Button>
            version {envDetails}
            {/*<GoCSignature width="20em" text="#fff" flag="#fff" />*/}
            <Typography style={{ flex: 1 }} />
            <WordMark />
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Footer;
