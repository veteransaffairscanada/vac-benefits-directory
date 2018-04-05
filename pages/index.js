// @flow

// for IE 9 and 10 compatibility
import "core-js/es6/map";
import "core-js/es6/set";
import "raf/polyfill";

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
import { GoCSignature, Button } from "@cdssnc/gcui";
import Head from "../components/head";
import styles from "../styles/styles.scss";

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
                onClick={() => i18n.changeLanguage(t("other-language-code"))}
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

export default withI18next(["home"])(App);
