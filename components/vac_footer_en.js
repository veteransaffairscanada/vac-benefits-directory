import React, { Component } from "react";

const path = "https://veterans.gc.ca";

class VacFooterEn extends Component {
  render() {
    const utm = "?utm_source=fbas&utm_medium=referral&utm_campaign=footer";
    return (
      <footer id="wb-info">
        <div className="container mrgn-bttm-xl">
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <nav
                className="col-x-12 wb-navcurr"
                aria-labelledby="aboutvacnav"
              >
                <h3 id="aboutvacnav">
                  About <abbr title="Veterans Affairs Canada">VAC</abbr>
                </h3>
                <ul className="list-unstyled mrgn-bttm-xl">
                  <li>
                    <a href={path + "/eng/about-vac/news-media"}>
                      News and media
                    </a>
                  </li>
                  <li>
                    <a href={path + "/eng/about-vac/legislation-policies"}>
                      Legislation and Policies
                    </a>
                  </li>
                  <li>
                    <a href={path + "/eng/about-vac/who-we-are"}>Who we are</a>
                  </li>
                  <li>
                    <a href={path + "/eng/about-vac/what-we-do"}>What we do</a>
                  </li>
                  <li>
                    <a href={path + "/eng/about-vac/publications-reports"}>
                      Publications and reports
                    </a>
                  </li>
                  <li>
                    <a href={path + "/eng/about-vac/research"}>Research</a>
                  </li>
                  <li>
                    <a href={path + "/eng/resources"}>Resources</a>
                  </li>
                </ul>
                <h3>Contact us</h3>
                <ul className="list-unstyled mrgn-bttm-xl">
                  <li>
                    <a href={path + "/eng/contact#office"}>Locations</a>
                  </li>
                  <li>
                    <a href={path + "/eng/resources/stay-connected"}>
                      Stay connected
                    </a>
                  </li>
                </ul>
                <div className="row">
                  <div className="col-xs-12">
                    <a
                      href={path + "/eng/resources/stay-connected/social-media"}
                      className="btn btn-default"
                    >
                      {"Follow Us "}
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
                  <h3>Questions? Call us.</h3>
                  <p>
                    <a
                      href="tel:18665222022"
                      className="btn btn-default btn-block"
                    >
                      Toll-free: 1-866-522-2122
                    </a>
                  </p>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <h3>Have feedback for VAC?</h3>
                  <p>
                    <a
                      href={path + "/eng/contact/have-your-say"}
                      className="btn btn-default btn-block"
                    >
                      Have your say!
                    </a>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <h3>VAC Assistance Service</h3>
                  <p className="mrgn-bttm-lg text-off-white">
                    The{" "}
                    <a href={path + "/eng/contact/talk-to-a-professional"}>
                      VAC Assistance Service
                    </a>{" "}
                    can provide you with psychological support. It is available
                    24 hours a day, 365 days a year. The service is for
                    Veterans, former RCMP members, their families, and
                    caregivers and is provided at no cost. You do not need to be
                    a client of VAC to receive services.
                  </p>
                  <div className="row">
                    <div className="col-xs-12 col-sm-6">
                      <p>
                        <a
                          href="tel:18002687708"
                          className="btn btn-default btn-block"
                        >
                          Toll-free: 1-800-268-7708
                        </a>
                      </p>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <p>
                        <a
                          href="tel:18005675803"
                          className="btn btn-default btn-block"
                        >
                          TDD/TTY: 1-800-567-5803
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <h3>My VAC Account</h3>
                  <p className="mrgn-bttm-lg text-off-white">
                    A simple and secure way to do business online with Veterans
                    Affairs Canada.
                  </p>
                  <div className="row">
                    <div className="col-xs-12 col-sm-6">
                      <p>
                        <a
                          href={
                            path + "/eng/e_services/create-my-vac-account" + utm
                          }
                          className="btn btn-default btn-block"
                        >
                          Register
                        </a>
                      </p>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <p>
                        <a
                          href={
                            "https://mva-mda.vac-acc.gc.ca/pub/MVA_7_24_1?request_locale=en_CA" +
                            utm
                          }
                          className="btn btn-default-outline btn-block"
                        >
                          Sign in
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
              <nav
                className="col-md-9 col-lg-10 ftr-urlt-lnk"
                aria-labelledby="aboutnav"
              >
                <h2 id="aboutnav" className="wb-inv">
                  About this site
                </h2>
                <ul>
                  <li>
                    <a href={path + "/eng/help"}>Help</a>
                  </li>
                  <li>
                    <a
                      href={path + "/eng/resources/stay-connected/social-media"}
                    >
                      Social media
                    </a>
                  </li>
                  <li>
                    <a href={path + "/eng/resources/stay-connected/mobile-app"}>
                      Mobile applications
                    </a>
                  </li>
                  <li>
                    <a href={path + "/eng/copyright"}>Terms and conditions</a>
                  </li>
                  <li>
                    <a href={path + "/eng/copyright#privacy_notice"}>Privacy</a>
                  </li>
                </ul>
              </nav>
              <div className="col-xs-6 visible-xs text-left mrgn-tp-sm">
                <img
                  src={path + "/GCWeb/assets/2018-redesign/Canada_wordmark.svg"}
                  alt="Symbol of the Government of Canada"
                />
              </div>
              <div className="hidden-xs col-md-3 col-lg-2 text-right mrgn-tp-sm">
                <img
                  src={path + "/GCWeb/assets/2018-redesign/Canada_wordmark.svg"}
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

export default VacFooterEn;
