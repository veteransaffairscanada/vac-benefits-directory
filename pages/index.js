// @flow

import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

import { withI18next } from "../lib/withI18next";
import withSentry from "../lib/withSentry";
import { GoCSignature, Button } from "@cdssnc/gcui";
import Head from "../components/head";
import styles from "../styles/styles.scss";
import { logEvent } from "../utils/analytics";

type Props = {
  i18n: mixed,
  t: mixed
};

class App extends Component<Props> {
  props: Props;

  render() {
    const { i18n, t } = this.props; // eslint-disable-line no-unused-vars

    return (
      <div>
        <Head />
        <Navbar color="light" light>
          <NavbarBrand href="/">
            <GoCSignature width="20em" />
          </NavbarBrand>
          <Nav>
            <NavItem>
              <Button
                name="BtnLanguage"
                className={styles.button}
                onClick={() => {
                  i18n.changeLanguage(t("other-language-code"));
                  logEvent("Language change", t("other-language"));
                }}
              >
                {t("other-language")}
              </Button>
            </NavItem>
          </Nav>
        </Navbar>
        <Container>
          <Row>
            <Col xs="12">
              <p name="TextDescription" className={styles.example}>
                {t("poc-description")}
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default withSentry(withI18next(["home"])(App));
