import React, { Component } from "react";

const path = "https://veterans.gc.ca";

class VacFooterFr extends Component {
  render() {
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
                <h3>Suivez-nous</h3>
                <div className="row">
                  <div className="col-xs-12">
                    <a
                      href={path + "/fra/resources/stay-connected/social-media"}
                      style={{ textDecoration: "none" }}
                    >
                      <ul className="list-inline">
                        <li>
                          <img
                            src={
                              path +
                              "/2018-redesign-assets/images/vector-facebook.svg"
                            }
                            alt=""
                          />
                          <span className="wb-inv">Facebook</span>
                        </li>
                        <li>
                          <img
                            src={
                              path +
                              "/2018-redesign-assets/images/vector-twitter.svg"
                            }
                            alt=""
                          />
                          <span className="wb-inv">Twitter</span>
                        </li>
                        <li>
                          <img
                            src={
                              path +
                              "/2018-redesign-assets/images/vector-instagram.svg"
                            }
                            alt=""
                          />
                          <span className="wb-inv">Instagram</span>
                        </li>
                        <li>
                          <img
                            src={
                              path +
                              "/2018-redesign-assets/images/vector-flickr.svg"
                            }
                            alt=""
                          />
                          <span className="wb-inv">Flickr</span>
                        </li>
                        <li>
                          <img
                            src={
                              path +
                              "/2018-redesign-assets/images/vector-linkedin.svg"
                            }
                            alt=""
                          />
                          <span className="wb-inv">LinkedIn</span>
                        </li>
                        <li>
                          <img
                            src={
                              path +
                              "/2018-redesign-assets/images/vector-youtube.svg"
                            }
                            alt=""
                          />
                          <span className="wb-inv">Youtube</span>
                        </li>
                      </ul>
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
                  <h3>Le Service d'aide d'ACC</h3>
                  <p className="mrgn-bttm-lg text-off-white">
                    <a href={path + "/fra/contact/talk-to-a-professional"}>
                      Le Service d'aide d'ACC
                    </a>{" "}
                    offre un soutien psychologique gratuit et confidentiel, 24
                    heures par jour, 365 jours par année. Le service est offert
                    à tous les vétérans, les anciens membres de la GRC, leur
                    famille et les aidants. Il n'est pas nécessaire d'être
                    inscrit auprès d'ACC pour appeler.
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
                          href={path + "/fra/e_services/create-my-vac-account"}
                          className="btn btn-default btn-block"
                        >
                          Inscription
                        </a>
                      </p>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <p>
                        <a
                          href="https://mva-mda.vac-acc.gc.ca/pub/MVA_7_24_1?request_locale=fr_CA"
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
                  <li>
                    <a
                      href={path + "/fra/resources/stay-connected/social-media"}
                    >
                      Médias sociaux
                    </a>
                  </li>
                  <li>
                    <a href={path + "/fra/resources/stay-connected/mobile-app"}>
                      Applications mobiles
                    </a>
                  </li>
                  <li>
                    <a href={path + "/fra/copyright"}>Avis</a>
                  </li>
                  <li>
                    <a href={path + "/fra/copyright#privacy_notice"}>
                      Confidentialité
                    </a>
                  </li>
                </ul>
              </nav>
              <div className="col-xs-6 visible-sm visible-xs tofpg">
                <a href="#wb-cont">
                  Haut de la page{" "}
                  <span className="glyphicon glyphicon-chevron-up" />
                </a>
              </div>
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
