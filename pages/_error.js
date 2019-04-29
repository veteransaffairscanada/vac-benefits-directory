import React from "react";

class Error extends React.Component {
  static getInitialProps({ res, err }) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <div>
        <div className="alert-icon alert-warning" role="alert">
          <div className="icon" aria-hidden="true">
            <i className="far fa-times-circle" />
          </div>
          <div className="message">
            <h3>We couldn't find that Web page</h3>
            <h4>Error 404</h4>
            <p>
              We're sorry you ended up here. Sometimes a page gets moved or
              deleted, but hopefully we can help you find what you're looking
              for. What next?
            </p>
            <ul>
              <li>
                Return to the Find Benefits and Services
                <a href="">home page</a>;
              </li>
              <li>
                Consult the <a href="">site map</a>;
              </li>
              <li>
                <a href="">Contact us</a> and we'll help you out.
              </li>
            </ul>
          </div>
        </div>

        <div className="alert-icon alert-warning" role="alert">
          <div className="icon" aria-hidden="true">
            <i className="far fa-times-circle" />
          </div>
          <div className="message">
            <h3>Nous ne pouvons trouver cette page Web</h3>
            <h4>Erreur 404</h4>
            <p>
              Nous sommes désolés que vous ayez abouti ici. Il arrive parfois
              qu'une page ait été déplacée ou supprimée. Heureusement, nous
              pouvons vous aider à trouver ce que vous cherchez. Que faire?
            </p>
            <ul>
              <li>
                Retournez à la <a href="">page d'accueil</a>;
              </li>
              <li>
                Consultez le <a href="">plan du site</a>;
              </li>
              <li>
                <a href="">Communiquez avec nous</a> pour obtenir de l'aide.
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
