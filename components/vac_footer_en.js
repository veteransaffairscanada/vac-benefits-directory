import React, { Component } from "react";

const path = "https://veterans.gc.ca";

class VacFooterEn extends Component {
  render() {
    return (
      <footer id="wb-info">
        <div className="container mrgn-bttm-xl">
          <div className="row">
            <div className="col-xs-12 col-sm-4">
              <nav className="col-x-12 wb-navcurr">
                <h3>
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
                <h3>Follow us</h3>
                <div className="row">
                  <div className="col-xs-12">
                    <a
                      href={path + "/eng/resources/stay-connected/social-media"}
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
                <a href="#wb-bnr">
                  <div className="tp-pg-flt" id="top">
                    <span className="wb-inv">Top of page</span>
                    <ul className="list-unstyled">
                      <li>
                        <span className="fas fa-chevron-up" />
                      </li>
                    </ul>
                  </div>
                </a>
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
                    Confidential and available 24/7, there is no cost for{" "}
                    <a href={path + "/eng/contact/talk-to-a-professional"}>
                      VAC Assistance Service
                    </a>
                    , and you don’t need to be registered with Veterans Affairs
                    Canada (VAC) to call. You can have up to 20 hours of
                    psychological support.
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
                          href={path + "/eng/e_services/create-my-vac-account"}
                          className="btn btn-default btn-block"
                        >
                          Register
                        </a>
                      </p>
                    </div>
                    <div className="col-xs-12 col-sm-6">
                      <p>
                        <a
                          href="https://mva-mda.vac-acc.gc.ca/pub/MVA_7_24_1?request_locale=en_CA"
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
              <nav className="col-md-9 col-lg-10 ftr-urlt-lnk">
                <h2 className="wb-inv">About this site</h2>
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
