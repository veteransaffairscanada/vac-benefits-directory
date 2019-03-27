import React, { Component } from "react";

const path = "https://veterans.gc.ca";

class VacFooterFr extends Component {
  render() {
    const utm = "?utm_source=footer&utm_medium=fbas";
    return (
      <footer id="wb-info">
        <div className="container mrgn-bttm-xl">
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <nav className="col-x-12 wb-navcurr">
                <h3>À propos de nous</h3>
                <ul className="list-unstyled mrgn-bttm-xl">
                  <li>
                    <a href={path + "/fra/about-vac/news-media"}>
                      Nouvelles et médias
                    </a>
                  </li>
                  <li>
                    <a href={path + "/fra/about-vac/legislation-policies"}>
                      Lois et politiques
                    </a>
                  </li>
                  <li>
                    <a href={path + "/fra/about-vac/who-we-are"}>
                      Qui nous sommes
                    </a>
                  </li>
                  <li>
                    <a href={path + "/fra/about-vac/what-we-do"}>
                      Ce que nous faisons
                    </a>
                  </li>
                  <li>
                    <a href={path + "/fra/about-vac/publications-reports"}>
                      Publications et rapports
                    </a>
                  </li>
                  <li>
                    <a href={path + "/fra/about-vac/research"}>Recherche</a>
                  </li>
                  <li>
                    <a href={path + "/fra/resources"}>Ressources</a>
                  </li>
                </ul>
                <h3>Contactez-nous</h3>
                <ul className="list-unstyled mrgn-bttm-xl">
                  <li>
                    <a href={path + "/fra/contact#office"}>Emplacements</a>
                  </li>
                  <li>
                    <a href={path + "/fra/resources/stay-connected"}>
                      Restez branchés
                    </a>
                  </li>
                </ul>
                <div className="row">
                  <div className="col-xs-12">
                    <a
                      href={path + "/fra/resources/stay-connected/social-media"}
                      className="btn btn-default"
                    >
                      {"Suivez-nous "}
                      <svg
                        className="svg-inline--fa fa-share-alt fa-w-14 mrgn-lft-sm"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="share-alt"
                        role="presentation"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        data-fa-i2svg=""
                      >
                        <path
                          fill="currentColor"
                          d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </nav>
            </div>
            <div className="col-xs-12 col-sm-8">
              <div className="row mrgn-tp-lg">
                <div className="col-xs-12 col-sm-6">
                  <h3>Des questions? Appelez-nous.</h3>
                  <p>
                    <a
                      href="tel:18665222022"
                      className="btn btn-default btn-block"
                    >
                      Téléphonez sans frais&nbsp;:&nbsp;
                      <br /> 1-866-522-2022
                    </a>
                  </p>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <h3>Des commentaires pour ACC?</h3>
                  <p>
                    <a
                      href={path + "/fra/contact/have-your-say"}
                      className="btn btn-default btn-block"
                    >
                      {" "}
                      À vous la parole!
                    </a>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <h3>{"Le Service d'aide d'ACC"}</h3>
                  <p className="mrgn-bttm-lg text-off-white">
                    Le{" "}
                    <a href={path + "/fra/contact/talk-to-a-professional"}>
                      {"Service d'aide d'ACC"}
                    </a>
                    {
                      " vous offre de soutien psychologique, disponible 24 heures par jour, 365 jours par année. Le Service d’aide d’ACC est offert gratuitement aux vétérans, aux anciens membres de la GRC, ainsi qu’à leur famille et aux aidants.  Il n’est pas nécessaire d’être un client d’ACC pour bénéficier des services."
                    }
                  </p>
                  <div className="row">
                    <div className="col-xs-12 col-sm-6">
                      <p>
                        <a
                          href="tel:1-800-268-7708"
                          className="btn btn-default btn-block"
                        >
                          Téléphonez sans frais&nbsp;:&nbsp;
                          <br /> 1-800-268-7708
                        </a>
                      </p>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <p>
                        <a
                          href="tel:1-800-567-5803"
                          className="btn btn-default btn-block"
                        >
                          Appareil téléscripteur
                          (ATS)&nbsp;:&nbsp;1-800-567-5803
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <h3>Mon dossier ACC</h3>
                  <p className="mrgn-bttm-lg text-off-white">
                    Une façon simple et sécuritaire de faire affaire en ligne.
                  </p>
                  <div className="row">
                    <div className="col-xs-12 col-sm-6">
                      <p>
                        <a
                          href={
                            path + "/fra/e_services/create-my-vac-account" + utm
                          }
                          className="btn btn-default btn-block"
                        >
                          Inscription
                        </a>
                      </p>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <p>
                        <a
                          href={
                            "https://mva-mda.vac-acc.gc.ca/pub/MVA_7_24_1?request_locale=fr_CA" +
                            utm
                          }
                          className="btn btn-default-outline btn-block"
                        >
                          Connexion
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="brand">
          <div className="container">
            <div className="row">
              <nav className="col-md-9 col-lg-10 ftr-urlt-lnk">
                <h2 className="wb-inv">À propos de ce site</h2>
                <ul>
                  <li>
                    <a href={path + "/fra/help"}>Aide</a>
                  </li>
                  &nbsp;
                  <li>
                    <a
                      href={path + "/fra/resources/stay-connected/social-media"}
                    >
                      Médias sociaux
                    </a>
                  </li>
                  &nbsp;
                  <li>
                    <a href={path + "/fra/resources/stay-connected/mobile-app"}>
                      Applications mobiles
                    </a>
                  </li>
                  &nbsp;
                  <li>
                    <a href={path + "/fra/copyright"}>Avis</a>
                  </li>
                  &nbsp;
                  <li>
                    <a href={path + "/fra/copyright#privacy_notice"}>
                      Confidentialité
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="col-xs-6 col-md-3 col-lg-2 text-right mrgn-tp-sm">
                <img
                  src={
                    path + "/2018-redesign-assets/images/Canada_wordmark.svg"
                  }
                  alt="Symbol of the Government of Canada"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default VacFooterFr;
