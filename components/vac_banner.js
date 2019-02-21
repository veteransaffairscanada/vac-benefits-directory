import React, { Component } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";
import LanguageButton from "./language_button";

class VacBanner extends Component {
  render() {
    return (
      <div id="wb-bnr" className="container">
        <div className="row">
          <div className="brand col-xs-12 col-sm-4">
            <a href="/eng">
              <img
                src="https://www.veterans.gc.ca/GCWeb/assets/2018-redesign/vac-fip-en-white.svg"
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
          <section className="utility-links col-xs-12 col-sm-8 mrgn-tp-0">
            <h2 className="wb-inv">Language selection</h2>
            <ul className="list-inline mrgn-tp-sm text-right letter-spacing-md">
              <li id="wb-lng">
                <a
                  href="https://www.veterans.gc.ca/fra/health-support/hearing-loss-and-tinnitus"
                  lang="fr"
                  className="h6 light-grey"
                >
                  Français
                  <img
                    id="language-globe"
                    src="https://www.veterans.gc.ca/GCWeb/assets/2018-redesign/vector-globe.svg"
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
                    src="https://www.veterans.gc.ca/GCWeb/assets/2018-redesign/vector-mva-logo.svg"
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    );
  }
}

VacBanner.propTypes = {
  url: PropTypes.object.isRequired
};

export default VacBanner;
