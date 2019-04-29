import React from "react";
import { Component } from "react";
import Layout from "../components/layout";
import PropTypes from "prop-types";
import withI18N from "../lib/i18nHOC";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
import { css, jsx } from "@emotion/core";

const outerDiv = css`
  padding-top: 24px;
`;
export class Error extends Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    const { t, i18n, url } = this.props;
    return (
      <Layout
        i18n={i18n}
        t={t}
        hideNoscript={true}
        title={t("titles.all_benefits")}
        skipLink="#mainContent"
        url={url}
      >
        <div css={outerDiv}>
          <Grid id="mainContent" item md={6} xs={12}>
            <div className="alert-icon alert-warning" role="alert">
              <div className="icon" aria-hidden="true">
                <i className="far fa-times-circle" />
              </div>
              <div className="message">
                <h3>We couldn't find that Web page</h3>
                <h4>Error 404</h4>
                <p>
                  We're sorry you ended up here. Sometimes a page gets moved or
                  deleted, but hopefully we can help you find what you're
                  looking for. What next?
                </p>
                <ul>
                  <li>
                    Return to the Find Benefits and Services{" "}
                    <a href="/?">home page</a>;
                  </li>
                  <li>
                    Consult the{" "}
                    <a href="https://www.veterans.gc.ca/eng/sitemap">
                      site map
                    </a>
                    ;
                  </li>
                  <li>
                    <a href="https://www.veterans.gc.ca/eng/contact">
                      Contact us
                    </a>{" "}
                    and we'll help you out.
                  </li>
                </ul>
              </div>
            </div>
          </Grid>

          <Grid item md={6} xs={12}>
            <div className="alert-icon alert-warning" role="alert">
              <div className="icon" aria-hidden="true">
                <i className="far fa-times-circle" />
              </div>
              <div className="message">
                <h3>Nous ne pouvons trouver cette page Web</h3>
                <h4>Erreur 404</h4>
                <p>
                  Nous sommes désolés que vous ayez abouti ici. Il arrive
                  parfois qu'une page ait été déplacée ou supprimée.
                  Heureusement, nous pouvons vous aider à trouver ce que vous
                  cherchez. Que faire?
                </p>
                <ul>
                  <li>
                    Retournez à la <a href="/?lng=fr">page d'accueil</a>;
                  </li>
                  <li>
                    Consultez le{" "}
                    <a href="https://www.veterans.gc.ca/fra/plansite">
                      plan du site
                    </a>
                    ;
                  </li>
                  <li>
                    <a href="https://www.veterans.gc.ca/fra/contactez">
                      Communiquez avec nous
                    </a>{" "}
                    pour obtenir de l'aide.
                  </li>
                </ul>
              </div>
            </div>
          </Grid>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    reduxState: reduxState
  };
};

Error.propTypes = {
  reduxState: PropTypes.object,
  i18n: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  store: PropTypes.object
};

export default connect(mapStateToProps)(withI18N(Error));
