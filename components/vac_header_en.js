import React, { Component } from "react";
import PropTypes from "prop-types";
import { mutateUrl } from "../utils/common";
import { logEvent } from "../utils/analytics";

const path = "https://veterans.gc.ca";

class VacHeaderEn extends Component {
  render() {
    const { t, url } = this.props;
    const utm = "?utm_source=fbas&utm_medium=referral&utm_campaign=header";
    return (
      <header className="bg-black">
        <div id="wb-bnr" className="container">
          <div className="row wb-eqht">
            <div className="brand col-xs-12 col-sm-6 col-md-4">
              <a href={path + "/eng"}>
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
                    <span>Canada.ca</span>
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
                    lang="fr"
                    id="changeLanguage"
                    title={t("other-language-in-current-language")}
                    href={mutateUrl(url, "", { lng: t("other-language-code") })}
                    onClick={() => {
                      logEvent("Language change", t("other-language"));
                    }}
                    className="h6 light-grey"
                  >
                    <span>Français</span>
                    <img
                      id="language-globe"
                      src={
                        path + "/GCWeb/assets/2018-redesign/vector-globe.svg"
                      }
                      alt=""
                    />
                  </a>
                </li>
                &nbsp; &nbsp;
                <li id="vac-mva">
                  <h2 className="wb-inv">My VAC Account / Mon dossier ACC</h2>
                  <a
                    href={path + "/eng/e_services/" + utm}
                    className="h6 light-grey"
                  >
                    <span>
                      My <abbr title="Veterans Affairs Canada">VAC</abbr>{" "}
                      Account&nbsp;
                    </span>
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

VacHeaderEn.propTypes = {
  t: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired
};

export default VacHeaderEn;
