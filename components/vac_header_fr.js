import React, { Component } from "react";
import PropTypes from "prop-types";
import { mutateUrl } from "../utils/common";
import { logEvent } from "../utils/analytics";

const path = "https://veterans.gc.ca";

class VacHeaderFr extends Component {
  render() {
    const { t, url } = this.props;
    const utm = "?utm_source=fbas&utm_medium=referral&utm_content=header";

    return (
      <header className="bg-black">
        <div id="wb-bnr" className="container">
          <div className="row">
            <div className="brand col-xs-12 col-sm-6 col-md-4">
              <a href={path + "/fra"}>
                <img
                  src={
                    path + "/GCWeb/assets/2018-redesign/vac-sig-fra-white.svg"
                  }
                  alt=""
                />
                <span className="wb-inv">
                  Anciens Combattants Canada /{" "}
                  <span lang="en">Veterans Affairs Canada</span>
                </span>
              </a>
            </div>
            <div className="col-xs-12 visible-xs">
              <hr className="brdr-med-dark-grey mrgn-tp-0 mrgn-bttm-0" />
            </div>
            <section className="utility-links col-xs-12 col-sm-6 col-md-8 mrgn-tp-0">
              <h2 className="wb-inv">Sélection de la langue</h2>
              <ul className="list-inline mrgn-tp-sm text-right letter-spacing-md mrgn-tp-md">
                <li>
                  <a
                    href="https://www.canada.ca/fr.html"
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
                &nbsp;
                <li>
                  <a
                    id="changeLanguage"
                    title={t("other-language-in-current-language")}
                    href={mutateUrl(url, "", { lng: t("other-language-code") })}
                    onClick={() => {
                      logEvent("Language change", t("other-language"));
                    }}
                    lang="fr"
                    className="h6 light-grey"
                  >
                    English
                    <img
                      id="language-globe"
                      src={
                        path + "/GCWeb/assets/2018-redesign/vector-globe.svg"
                      }
                      alt=""
                    />
                  </a>
                </li>
                &nbsp;
                <li id="vac-mva">
                  <h2 className="wb-inv">Mon dossier ACC / My VAC Account</h2>
                  <a
                    href={path + "/fra/e_services/" + utm}
                    className="h6 light-grey"
                  >
                    Mon dossier{" "}
                    <abbr title="Anciens Combattants Canada">ACC</abbr>&nbsp;
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

VacHeaderFr.propTypes = {
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired
};

export default VacHeaderFr;
