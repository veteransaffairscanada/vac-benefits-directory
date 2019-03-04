import { css } from "emotion";
const styles = css`
  /*! CSS Used from: Embedded */
  svg:not(:root).svg-inline--fa {
    overflow: visible;
  }
  .svg-inline--fa {
    display: inline-block;
    font-size: inherit;
    height: 1em;
    overflow: visible;
    vertical-align: -0.125em;
  }
  .svg-inline--fa.fa-w-14 {
    width: 0.875em;
  }
  /*! CSS Used from: https://www.veterans.gc.ca/GCWeb_5.0.1/GCWeb/css/theme.min.css */
  footer,
  nav {
    display: block;
  }
  a {
    background-color: transparent;
  }
  a:active,
  a:hover {
    outline: 0;
  }
  abbr[title] {
    border-bottom: none;
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  img {
    border: 0;
  }
  svg:not(:root) {
    overflow: hidden;
  }
  @media print {
    *,
    :after,
    :before {
      color: #000 !important;
      text-shadow: none !important;
      background: transparent !important;
      -webkit-box-shadow: none !important;
      box-shadow: none !important;
    }
    a,
    a:visited {
      text-decoration: underline;
    }
    a[href]:after {
      content: " (" attr(href) ")";
    }
    abbr[title]:after {
      content: " (" attr(title) ")";
    }
    a[href^="#"]:after {
      content: "";
    }
    img {
      page-break-inside: avoid;
    }
    img {
      max-width: 100% !important;
    }
    h2,
    h3,
    p {
      orphans: 3;
      widows: 3;
    }
    h2,
    h3 {
      page-break-after: avoid;
    }
  }
  *,
  :after,
  :before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  a:focus,
  a:hover {
    color: #0535d2;
    text-decoration: underline;
  }
  a:focus {
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }
  img {
    vertical-align: middle;
  }
  h2,
  h3 {
    line-height: 1.1;
    color: inherit;
  }
  h2,
  h3 {
    margin-top: 23px;
    margin-bottom: 11.5px;
  }
  p {
    margin: 0 0 11.5px;
  }
  .text-left {
    text-align: left;
  }
  .text-right {
    text-align: right;
  }
  ul {
    margin-top: 0;
    margin-bottom: 11.5px;
  }
  .list-unstyled {
    padding-left: 0;
    list-style: none;
  }
  .list-inline {
    padding-left: 0;
    list-style: none;
    margin-left: -5px;
  }
  .list-inline > li {
    display: inline-block;
    padding-right: 5px;
    padding-left: 5px;
  }
  abbr[title] {
    cursor: help;
  }
  .container {
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  .container:after,
  .container:before {
    display: table;
    content: " ";
  }
  .container:after {
    clear: both;
  }
  @media (min-width: 768px) {
    .container {
      width: 750px;
    }
  }
  @media (min-width: 992px) {
    .container {
      width: 970px;
    }
  }
  @media (min-width: 1200px) {
    .container {
      width: 1170px;
    }
  }
  .row {
    margin-right: -15px;
    margin-left: -15px;
  }
  .row:after,
  .row:before {
    display: table;
    content: " ";
  }
  .row:after {
    clear: both;
  }
  .col-lg-10,
  .col-lg-2,
  .col-md-3,
  .col-md-9,
  .col-sm-4,
  .col-sm-6,
  .col-sm-8,
  .col-xs-12,
  .col-xs-6 {
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }
  .col-xs-12,
  .col-xs-6 {
    float: left;
  }
  .col-xs-6 {
    width: 50%;
  }
  .col-xs-12 {
    width: 100%;
  }
  @media (min-width: 768px) {
    .col-sm-4,
    .col-sm-6,
    .col-sm-8 {
      float: left;
    }
    .col-sm-4 {
      width: 33.3333333333%;
    }
    .col-sm-6 {
      width: 50%;
    }
    .col-sm-8 {
      width: 66.6666666667%;
    }
  }
  @media (min-width: 992px) {
    .col-md-3,
    .col-md-9 {
      float: left;
    }
    .col-md-3 {
      width: 25%;
    }
    .col-md-9 {
      width: 75%;
    }
  }
  @media (min-width: 1200px) {
    .col-lg-10,
    .col-lg-2 {
      float: left;
    }
    .col-lg-2 {
      width: 16.6666666667%;
    }
    .col-lg-10 {
      width: 83.3333333333%;
    }
  }
  .btn {
    display: inline-block;
    margin-bottom: 0;
    font-weight: 400;
    text-align: center;
    vertical-align: middle;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
    cursor: pointer;
    background-image: none;
    border: 1px solid transparent;
    padding: 10px 14px;
    font-size: 16px;
    line-height: 1.4375;
    border-radius: 4px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .btn:active:focus,
  .btn:focus {
    outline: 5px auto -webkit-focus-ring-color;
    outline-offset: -2px;
  }
  .btn:focus,
  .btn:hover {
    color: #335075;
    text-decoration: none;
  }
  .btn:active {
    background-image: none;
    outline: 0;
    -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
    box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  }
  .btn-default {
    color: #335075;
    background-color: #eaebed;
    border-color: #dcdee1;
  }
  .btn-default:focus {
    color: #335075;
    background-color: #cfd1d5;
    border-color: #989da6;
  }
  .btn-default:hover {
    color: #335075;
    background-color: #cfd1d5;
    border-color: #bbbfc5;
  }
  .btn-default:active {
    color: #335075;
    background-color: #cfd1d5;
    background-image: none;
    border-color: #bbbfc5;
  }
  .btn-default:active:focus,
  .btn-default:active:hover {
    color: #335075;
    background-color: #bbbfc5;
    border-color: #989da6;
  }
  .btn-block {
    display: block;
    width: 100%;
  }
  .visible-xs {
    display: none !important;
  }
  @media (max-width: 767px) {
    .visible-xs {
      display: block !important;
    }
  }
  @media (max-width: 767px) {
    .hidden-xs {
      display: none !important;
    }
  }
  a.btn {
    text-decoration: none;
  }
  a {
    text-decoration: underline;
  }
  a:visited {
    color: #7834bc;
  }
  .btn-default:visited {
    color: #335075;
  }
  h2 {
    margin-top: 38px;
  }
  h3 {
    margin-top: 32px;
  }
  .btn {
    border-style: outset;
    height: auto;
    min-height: 36px;
    min-width: 36px;
    white-space: normal;
  }
  #wb-info h2,
  .wb-inv {
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px;
    margin: 0;
    overflow: hidden;
    position: absolute;
    width: 1px;
  }
  .mrgn-bttm-lg {
    margin-bottom: 30px;
  }
  .mrgn-bttm-xl {
    margin-bottom: 50px;
  }
  .mrgn-tp-sm {
    margin-top: 5px;
  }
  .mrgn-tp-lg {
    margin-top: 30px;
  }
  @media print {
    a[href]:after {
      content: none;
    }
  }
  a {
    color: #284162;
  }
  h2,
  h3 {
    font-family: Lato, sans-serif;
  }
  h2,
  h3 {
    -webkit-font-variant-ligatures: no-common-ligatures;
    font-variant-ligatures: no-common-ligatures;
    font-weight: 600;
  }
  .home h2 {
    font-size: 1.2em;
  }
  h2 {
    font-size: 1.8em;
  }
  h3 {
    font-size: 1.2em;
  }
  .btn {
    font-family: Lato, sans-serif;
  }
  #wb-info {
    background: #e1e4e7;
    position: relative;
    z-index: 5;
  }
  #wb-info a {
    font-size: 0.875em;
    text-decoration: none;
  }
  #wb-info .brand {
    background: #f8f8f8;
    line-height: 30px;
  }
  #wb-info .brand img {
    height: 40px;
    margin-bottom: 10px;
    margin-top: 20px;
    width: auto;
  }
  #wb-info .ftr-urlt-lnk ul {
    margin: 0;
    padding: 0;
  }
  #wb-info .ftr-urlt-lnk li:before {
    content: "\2022";
    margin-right: 0.7em;
  }
  #wb-info nav {
    padding-bottom: 2em;
    padding-top: 2em;
    position: relative;
  }
  #wb-info nav li {
    margin-bottom: 0.75em;
  }
  @media screen and (max-width: 991px) {
    h2 {
      font-size: 1.6em;
    }
    #wb-info .ftr-urlt-lnk ul {
      -webkit-column-count: 2;
      column-count: 2;
    }
    #wb-info .ftr-urlt-lnk li {
      display: block;
      margin-bottom: 0.2em;
    }
  }
  @media screen and (min-width: 992px) {
    #wb-info .ftr-urlt-lnk li {
      display: inline-block;
      float: left;
      margin-right: 0.7em;
    }
    #wb-info .ftr-urlt-lnk li:first-child:before {
      content: none;
    }
  }
  @media screen and (max-width: 479px) {
    #wb-info .ftr-urlt-lnk ul {
      -webkit-column-count: 1;
      column-count: 1;
    }
    #wb-info .brand img {
      height: 25px;
      margin-top: 15px;
      max-width: 100%;
      padding-right: 10px;
    }
  }
  @media print {
    #wb-info {
      display: none !important;
    }
  }
  /*! CSS Used from: https://www.veterans.gc.ca/css/2018-redesign/2018-redesign-custom.css */
  .tp-pg-flt {
    position: fixed;
    bottom: 0em;
    z-index: 999;
    right: 0em;
    background-color: #634f70;
    padding: 10px 20px 0px 20px;
  }
  .tp-pg-flt ul li {
    color: #ffffff;
  }
  .container {
    outline: none !important;
  }
  h2,
  h3 {
    color: #2f3437;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    margin-bottom: 16px;
  }
  h2,
  .home h2 {
    font-size: 28px;
    letter-spacing: -0.5px;
  }
  h3,
  .home h3 {
    font-size: 22px;
    font-family: "Montserrat", sans-serif;
    letter-spacing: -0.5px;
    font-weight: 700;
  }
  li {
    font-size: 16px;
    letter-spacing: -0.03em;
  }
  p {
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0;
    margin-bottom: 16px;
  }
  a,
  a:hover,
  a:focus,
  a:active {
    color: #2f3437;
    text-decoration: underline;
  }
  a:visited {
    color: #2f3437;
    text-decoration: underline;
  }
  abbr[title] {
    cursor: help;
    border-bottom: 1px dotted #434458;
    text-decoration: none;
  }
  #wb-info {
    color: #e6f0cb;
    background: #2e2e40;
  }
  #wb-info h2,
  #wb-info h3 {
    color: #ffffff;
  }
  #wb-info .brand {
    background: #2e2e40 url(https://www.veterans.gc.ca/assets/svg-leaf.svg)
      no-repeat 50px -205px;
    background-size: 150%;
    border-top: 1px solid #434458;
  }
  #wb-info .brand li a {
    font-family: "Montserrat", sans-serif;
    color: #d5e2e9;
  }
  footer#wb-info a,
  footer#wb-info a:link {
    font-size: 18px;
    color: #ffffff;
    text-decoration: underline;
  }
  footer#wb-info a:hover,
  footer#wb-info a:focus,
  footer#wb-info a:active {
    color: #ffffff;
    text-decoration: underline;
  }
  footer#wb-info a.btn,
  footer#wb-info a.btn:link {
    font-family: "Montserrat", sans-serif;
    color: #2f3437;
    text-decoration: none;
  }
  footer#wb-info a.btn:hover,
  footer#wb-info a.btn:focus,
  footer#wb-info a.btn:active,
  footer#wb-info a.btn-default-outline,
  footer#wb-info a.btn-default-outline:link {
    font-family: "Montserrat", sans-serif;
    color: #d5e2e9;
    text-decoration: none;
  }
  footer#wb-info li a,
  footer#wb-info li a:link,
  footer#wb-info li a:hover,
  footer#wb-info li a:focus,
  footer#wb-info li a:active {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    color: #ffffff;
    text-decoration: underline;
  }
  footer#wb-info li a:visited {
    color: #ffffff;
    text-decoration: underline;
  }
  .text-off-white {
    color: white;
  }
  .btn,
  a.btn {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    border-radius: 0px !important;
    -webkit-transition: color 0.1s;
    transition: color 0.1s;
    -webkit-transition: background-color 0.1s;
    transition: background-color 0.1s;
  }
  .btn-default,
  footer .btn-default,
  .btn-default:visited {
    background-color: #d5e2e9;
    color: #2f3437;
    border: 3px solid #d5e2e9;
  }
  .btn-default:hover,
  footer .btn-default:hover,
  .btn-default:focus,
  .btn-default:active {
    background-color: #434458;
    color: #fff;
    border: 3px solid #434458;
  }
  .btn-default-outline,
  footer .btn-default-outline,
  .btn-default-outline:visited {
    background: rgba(255, 255, 255, 0);
    color: #d5e2e9;
    border: 3px solid #d5e2e9;
  }
  .btn-default-outline:hover,
  footer .btn-default-outline:hover,
  .btn-default-outline:focus,
  .btn-default-outline:active {
    background: #434458;
    color: #d5e2e9;
    border: 3px solid #434458;
    text-decoration-color: #634f70;
  }
  @media only screen and (min-width: 768px) {
    a[href^="tel:"] {
      color: inherit;
      cursor: default;
      text-decoration: none;
    }
    a[href^="tel:"].btn-default:hover,
    a[href^="tel:"].btn-default:focus,
    a[href^="tel:"].btn-default:active,
    a[href^="tel:"].btn-default:visited {
      cursor: default;
      background-color: #d5e2e9;
      color: #2f3437 !important;
      border: 3px solid #d5e2e9;
    }
  }
  @media only screen and (max-width: 768px) {
    .btn {
      font-size: 16px;
      width: 100%;
      display: inline-block;
    }
  }
  /*! CSS Used fontfaces */
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 400;
    src: local("Lato Italic"), local("Lato-Italic"),
      url(https://fonts.gstatic.com/s/lato/v14/S6u8w4BMUTPHjxsAUi-qNiXg7eU0.woff2)
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 400;
    src: local("Lato Italic"), local("Lato-Italic"),
      url(https://fonts.gstatic.com/s/lato/v14/S6u8w4BMUTPHjxsAXC-qNiXg7Q.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 700;
    src: local("Lato Bold Italic"), local("Lato-BoldItalic"),
      url(https://fonts.gstatic.com/s/lato/v14/S6u_w4BMUTPHjxsI5wq_FQftx9897sxZ.woff2)
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 700;
    src: local("Lato Bold Italic"), local("Lato-BoldItalic"),
      url(https://fonts.gstatic.com/s/lato/v14/S6u_w4BMUTPHjxsI5wq_Gwftx9897g.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    src: local("Lato Regular"), local("Lato-Regular"),
      url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjxAwXiWtFCfQ7A.woff2)
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    src: local("Lato Regular"), local("Lato-Regular"),
      url(https://fonts.gstatic.com/s/lato/v14/S6uyw4BMUTPHjx4wXiWtFCc.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    src: local("Lato Bold"), local("Lato-Bold"),
      url(https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh6UVSwaPGQ3q5d0N7w.woff2)
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    src: local("Lato Bold"), local("Lato-Bold"),
      url(https://fonts.gstatic.com/s/lato/v14/S6u9w4BMUTPHh6UVSwiPGQ3q5d0.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    src: local("Montserrat Regular"), local("Montserrat-Regular"),
      url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459WRhyyTh89ZNpQ.woff2)
        format("woff2");
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  @font-face {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    src: local("Montserrat Regular"), local("Montserrat-Regular"),
      url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459W1hyyTh89ZNpQ.woff2)
        format("woff2");
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    src: local("Montserrat Regular"), local("Montserrat-Regular"),
      url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459WZhyyTh89ZNpQ.woff2)
        format("woff2");
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  @font-face {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    src: local("Montserrat Regular"), local("Montserrat-Regular"),
      url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459WdhyyTh89ZNpQ.woff2)
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 400;
    src: local("Montserrat Regular"), local("Montserrat-Regular"),
      url(https://fonts.gstatic.com/s/montserrat/v12/JTUSjIg1_i6t8kCHKm459WlhyyTh89Y.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
  @font-face {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    src: local("Montserrat Bold"), local("Montserrat-Bold"),
      url(https://fonts.gstatic.com/s/montserrat/v12/JTURjIg1_i6t8kCHKm45_dJE3gTD_vx3rCubqg.woff2)
        format("woff2");
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  @font-face {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    src: local("Montserrat Bold"), local("Montserrat-Bold"),
      url(https://fonts.gstatic.com/s/montserrat/v12/JTURjIg1_i6t8kCHKm45_dJE3g3D_vx3rCubqg.woff2)
        format("woff2");
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  @font-face {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    src: local("Montserrat Bold"), local("Montserrat-Bold"),
      url(https://fonts.gstatic.com/s/montserrat/v12/JTURjIg1_i6t8kCHKm45_dJE3gbD_vx3rCubqg.woff2)
        format("woff2");
    unicode-range: U+0102-0103, U+0110-0111, U+1EA0-1EF9, U+20AB;
  }
  @font-face {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    src: local("Montserrat Bold"), local("Montserrat-Bold"),
      url(https://fonts.gstatic.com/s/montserrat/v12/JTURjIg1_i6t8kCHKm45_dJE3gfD_vx3rCubqg.woff2)
        format("woff2");
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB,
      U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  @font-face {
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 700;
    src: local("Montserrat Bold"), local("Montserrat-Bold"),
      url(https://fonts.gstatic.com/s/montserrat/v12/JTURjIg1_i6t8kCHKm45_dJE3gnD_vx3rCs.woff2)
        format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212,
      U+2215, U+FEFF, U+FFFD;
  }
`;

export default styles;
