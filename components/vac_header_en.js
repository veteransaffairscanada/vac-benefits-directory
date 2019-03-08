import React, { Component } from "react";

const path = "https://veterans.gc.ca";

class VacHeaderEn extends Component {
  render() {
    return (
      <header className="bg-black">
        <div id="wb-bnr" className="container">
          <div className="row wb-eqht">
            <div className="brand col-xs-12 col-sm-6 col-md-4">
              <a href="/eng">
                <img
                  src={
                    path + "/GCWeb/assets/2018-redesign/vac-fip-en-white.svg"
                  }
                  alt=""
                />
                <span className="wb-inv">
                  Veterans Affairs Canada /{" "}
                  <span lang="fr">Anciens Combattants Canada</span>
                </span>
              </a>
            </div>
            <div className="col-xs-12 visible-xs">
              <hr className="brdr-med-dark-grey mrgn-tp-0 mrgn-bttm-0" />
            </div>
            <section className="utility-links col-xs-12 col-sm-6 col-md-8 mrgn-tp-0">
              <h2 className="wb-inv">Language selection</h2>
              <ul className="list-inline mrgn-tp-sm text-right letter-spacing-md mrgn-tp-md">
                <li>
                  <a
                    href="https://www.canada.ca/en.html"
                    className="h6 light-grey"
                  >
                    Canada.ca
                    <img
                      id="maple-leaf"
                      src={
                        path +
                        "/GCWeb/assets/2018-redesign/vector-maple-leaf.svg"
                      }
                      alt=""
                    />
                  </a>
                </li>

                <li>
                  <a href="/fra" lang="fr" className="h6 light-grey">
                    Français
                    <img
                      id="language-globe"
                      src={
                        path + "/GCWeb/assets/2018-redesign/vector-globe.svg"
                      }
                      alt=""
                    />
                  </a>
                </li>

                <li id="vac-mva">
                  <h2 className="wb-inv">My VAC Account / Mon dossier ACC</h2>
                  <a href="/eng/e_services/" className="h6 light-grey">
                    My <abbr title="Veterans Affairs Canada">VAC</abbr> Account
                    <img
                      id="mva-logo"
                      className="mrgn-lft-sm"
                      src={
                        path + "/GCWeb/assets/2018-redesign/vector-mva-logo.svg"
                      }
                      alt=""
                    />
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </header>
    );
  }
}

export default VacHeaderEn;
