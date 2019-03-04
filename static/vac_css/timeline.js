import { css } from "emotion";
const styles = css`
  /* VAC style guide colors */
  /* info/mediumblue - #434458 > Contrast safe #6E6F91
/* primary/darkblue - #2e2e40 > Contrast safe #717198
/* success/jade - #1ca56f > Contrast safe #168357 >
/* darkgrey - #2f3437
/* default/lightgrey - #d5e2e9
/* lightgold - #e6f0cb
/* purple - #634f70
/* lightpurple - #d7ccdc
/* warning/orange - #fbad1d
/* lightorange - #e5d2c7
*/

  /* Miscellaneous */
  .wrap-none {
    white-space: nowrap;
  }
  .wrap-normal {
    white-space: normal;
  }
  .align-middle {
    vertical-align: middle !important;
  }
  .text-capitalize {
    text-transform: capitalize;
  }
  .width-5 {
    width: 5%;
  }
  .width-10 {
    width: 10%;
  }
  .width-15 {
    width: 15%;
  }
  .width-20 {
    width: 20%;
  }
  .width-25 {
    width: 25%;
  }
  .width-30 {
    width: 30%;
  }
  .width-35 {
    width: 35%;
  }
  .width-33 {
    width: 33%;
  }
  .width-35 {
    width: 35%;
  }
  .width-40 {
    width: 40%;
  }
  .width-45 {
    width: 45%;
  }
  .width-50 {
    width: 50%;
  }
  .width-55 {
    width: 55%;
  }
  .width-60 {
    width: 60%;
  }
  .width-65 {
    width: 65%;
  }
  .width-70 {
    width: 70%;
  }
  .width-75 {
    width: 75%;
  }
  .width-80 {
    width: 80%;
  }
  .width-85 {
    width: 85%;
  }
  .width-90 {
    width: 90%;
  }
  .width-95 {
    width: 95%;
  }
  .width-100 {
    width: 100%;
  }
  .width-auto {
    width: auto;
  }
  .auto-truncate {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .pddng-lft-0 {
    padding-left: 0px;
  }

  /* slick */
  .slick-slide {
    height: auto !important;
  }

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

  /* Canada.ca theme overides */

  body {
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
  }

  .font-primary-bold {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
  }

  .font-primary,
  .ui-menu {
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
  }

  .font-secondary-bold {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-weight: bold;
  }

  .font-secondary {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-weight: normal;
  }

  .font-tertiary-bold {
    font-family: "Barlow", sans-serif;
  }

  h2,
  h3,
  h4,
  h5,
  h6,
  .h2,
  .h3,
  .h4,
  .h5,
  .h6 {
    color: #2f3437;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    margin-bottom: 16px;
  }

  h1 a,
  h2 a,
  h3 a,
  h4 a,
  h5 a,
  h6 a,
  .h1 a,
  .h2 a,
  .h3 a,
  .h4 a,
  .h5 a,
  .h6 a {
    text-decoration: underline;
    color: #2f3437;
  }

  h1 a:hover,
  h2 a:hover,
  h3 a:hover,
  h4 a:hover,
  h5 a:hover,
  h6 a:hover,
  .h1 a:hover,
  .h2 a:hover,
  .h3 a:hover,
  .h4 a:hover,
  .h5 a:hover,
  .h6 a:hover {
    color: #2f3437;
    text-decoration: underline;
  }

  h1 a:visited,
  h2 a:visited,
  h3 a:visited,
  h4 a:visited,
  h5 a:visited,
  h6 a:visited,
  .h1 a:visited,
  .h2 a:visited,
  .h3 a:visited,
  .h4 a:visited,
  .h5 a:visited,
  .h6 a:visited {
    text-decoration: underline;
    color: #2f3437;
  }

  h1 a:visited:hover,
  h2 a:visited:hover,
  h3 a:visited:hover,
  h4 a:visited:hover,
  h5 a:visited:hover,
  h6 a:visited:hover,
  .h1 a:visited:hover,
  .h2 a:visited:hover,
  .h3 a:visited:hover,
  .h4 a:visited:hover,
  .h5 a:visited:hover,
  .h6 a:visited:hover {
    text-decoration: underline;
    color: #2f3437;
  }

  .h1,
  h1 {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-weight: normal;
    font-size: 58px;
    border-bottom: none;
    letter-spacing: -1px;
    font-weight: normal;
    margin: 32px 0 0 0;
  }

  h2,
  .h2,
  main h2,
  main .h2,
  .home h2,
  .home .h2 {
    font-size: 28px;
    letter-spacing: -0.5px;
  }

  h3,
  .h3,
  main h3,
  main .h3,
  .home h3,
  .home .h3 {
    font-size: 22px;
    font-family: "Montserrat", sans-serif;
    letter-spacing: -0.5px;
    font-weight: 700;
  }

  h4,
  .h4,
  main h4,
  main .h4,
  .home h4,
  .home .h4 {
    font-size: 18px;
  }

  h5,
  .h5,
  main h5,
  main .h5,
  .home h5,
  .home .h5 {
    font-size: 14px;
  }

  h6,
  .h6,
  main h6,
  main .h6,
  .home h6,
  .home .h6 {
    line-height: normal;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
  }

  .lead {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 24px;
    color: #434458;
  }

  .bold {
    font-weight: bold;
  }

  .em,
  em {
    font-style: italic;
  }

  .small,
  small,
  p.small,
  ul.small li,
  ol.small li,
  summary.small {
    font-size: 14px;
    line-height: 20px;
  }

  .small-em {
    font-style: italic;
    margin: 0;
    line-height: 22px;
    font-size: 14px;
    letter-spacing: -0.03em;
  }

  .li,
  li {
    font-size: 16px;
    letter-spacing: -0.03em;
  }

  main .li,
  main li {
    line-height: 28px;
  }

  .p,
  p,
  main p {
    font-size: 16px;
    line-height: 26px;
    letter-spacing: 0;
    margin-bottom: 16px;
  }

  dl dd {
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
  }

  .pagination .active a,
  .pagination .active span,
  .pagination .active a:hover,
  .pagination .active span:hover,
  .pagination .active a:focus,
  .pagination .active span:focus {
    background-color: #434458;
    border-color: #434458;
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

  hr {
    border-top-color: #d5e2e9;
  }

  table {
    font-style: normal;
    font-weight: normal;
    line-height: normal;
    font-size: 16px;
    line-height: 1.5em;
    border-color: #d5e2e9;
  }

  table th {
    color: #2f3437;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
  }

  .table > tbody > tr > td,
  .table > tbody > tr > th,
  .table > tfoot > tr > td,
  .table > tfoot > tr > th,
  .table > thead > tr > td,
  .table > thead > tr > th {
    padding-top: 1em;
    padding-bottom: 1em;
    color: #434458;
    border-top: 1px solid #d5e2e9;
    border-bottom: #d5e2e9;
  }

  #errors-form {
    margin-top: 14px;
  }

  span.label.label-danger {
    margin-top: 10px;
    display: block;
    text-align: left;
  }

  .checkbox label,
  .radio label {
    min-height: 23px;
    padding-left: 20px;
    margin-bottom: 0;
    font-weight: normal;
    cursor: pointer;
  }

  figcaption {
    background-color: #f4f7f9;
    padding: 9px 18px;
  }

  blockquote {
    padding: 11.5px 23px;
    margin: 0 0 23px;
    border-left: 5px solid #1ca56f;
  }

  .share-button {
    font-size: 16px;
    color: #434458;
    margin-right: 16px;
  }

  .share-button:hover,
  .share-button:focus,
  .share-button:active {
    color: #2e2e40;
  }

  .shr-pg .shr-lnk {
    font-size: 100%;
    line-height: 32px;
    margin-bottom: 8px;
    min-height: 32px;
    text-align: left;
    text-decoration: none;
    width: 100%;
    background: white;
    border: 1px solid #d5e2e9;
  }

  a.shr-opn {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 14px;
  }

  abbr[title],
  acronym[title],
  abbr[data-original-title],
  abbr[title] {
    cursor: help;
    border-bottom: 1px dotted #434458;
    text-decoration: none;
  }

  .first-character {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-weight: normal;
    color: #2f3437;
    float: left;
    font-size: 92px;
    font-weight: 500;
    line-height: 60px;
    padding-top: 8px;
    padding-right: 12px;
    padding-left: 8px;
  }

  .hub-rght-box {
    background-color: white;
    border: 1px solid #d5e2e9;
  }

  .well {
    background-color: #dbe6eb;
    border: 1px solid #d5e2e9;
    border-radius: 0;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .well p {
    margin-bottom: 0px;
  }

  .wb-tabs > .tabpanels > details,
  .wb-tabs > details {
    padding: 24px 24px 0px 24px;
  }

  .wb-tabs figcaption,
  .wb-tabs figcaption {
    background-color: #2f3437;
  }

  #wb-dtmd {
    margin: 0;
  }

  /* Program panel */

  .program-panel {
    background-color: #f4f7f9;
    padding-top: 15px;
    padding-bottom: 20px;
    padding-left: 10px;
    margin-left: 1px;
    margin-right: 1px;
  }

  .program-panel ol li {
    margin-bottom: 4px;
  }

  .program-panel blockquote {
    padding: 11.5px 23px;
    border-left: 5px solid #d5e2e9;
  }

  .program-panel h2 {
    font-style: normal;
    font-weight: bold;
    line-height: normal;
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
  }

  /* Modals */

  .overlay-def .modal-header {
    color: white;
    background: #2f3437;
  }

  .overlay-def .modal-title {
    font-size: 1.15em;
    padding: 10px 0;
    color: white;
  }

  .overlay-def .mfp-close {
    color: #d5e2e9;
  }

  .modal-header {
    padding: 15px;
    border-bottom: 1px solid #d5e2e9;
  }

  .modal-body {
    background: white;
  }

  .modal-footer {
    padding: 15px;
    text-align: right;
    border-top: 1px solid #d5e2e9;
    background: #d5e2e9;
  }

  .wb-modal .mfp-bg.mfp-ready {
    background: rgba(0, 0, 0, 0.9);
  }

  .modal-content {
    border-radius: 0px;
    border: none;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.5);
  }

  body.wb-modal summary,
  body.wb-modal > #wb-tphp,
  body.wb-modal > footer,
  body.wb-modal > header,
  body.wb-modal > main {
    visibility: visible !important;
  }

  .modal-footer .btn-primary {
    color: #fff;
    background-color: #2f3437;
  }

  .modal-footer .btn-primary:hover,
  .modal-footer .btn-primary:focus,
  .modal-footer .btn-primary:active {
    color: #fff;
  }

  /* main menu*/

  nav.gcweb-menu [role="menu"] [role="menu"] li:not(:first-child) {
    width: 50%;
  }

  nav.gcweb-menu [role="menu"] [role="menu"] li[role="separator"] {
    width: 100%;
  }

  nav.gcweb-menu [role="menu"] [role="menu"] li:last-child {
    position: static;
    top: auto;
    left: auto;
  }

  nav.gcweb-menu [role="menu"] [role="menu"] li:first-child {
    margin-bottom: auto;
  }

  nav.gcweb-menu button[aria-haspopup="true"] {
    background-color: #fff;
    border: none;
    color: #2f3437;
  }

  nav.gcweb-menu button[aria-haspopup="true"]:hover,
  nav.gcweb-menu button[aria-haspopup="true"][aria-expanded="true"],
  .home nav.gcweb-menu button[aria-haspopup="true"][aria-expanded="true"] {
    color: white;
    background-color: #2f3437;
    border: 0px;
  }

  nav.gcweb-menu button {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
  }

  nav.gcweb-menu button#menu-button:hover,
  nav.gcweb-menu button#menu-button:active,
  nav.gcweb-menu button#menu-button:focus {
    background-color: #2f3437;
    color: #fff;
  }

  nav.gcweb-menu [role="menuitem"]:hover,
  nav.gcweb-menu [role="menuitem"][aria-expanded="true"],
  nav.gcweb-menu
    [role="menuitem"][aria-expanded="true"]
    + [role="menu"]
    [role="menuitem"]:focus {
    background-color: #2f3437;
    color: #fff;
  }

  nav.gcweb-menu ul#menu-pnl {
    background: #2f3437;
  }

  nav.gcweb-menu ul#menu-pnl > li {
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    color: #fff;
    background-color: #2f3437;
  }

  nav.gcweb-menu ul#menu-pnl > li a:hover,
  nav.gcweb-menu ul#menu-pnl > li a:focus {
    background-color: #fff;
  }

  nav.gcweb-menu ul#menu-pnl > li [aria-haspopup="true"]:hover,
  nav.gcweb-menu ul#menu-pnl > li [aria-haspopup="true"]:focus,
  nav.gcweb-menu ul#menu-pnl > li [aria-haspopup="true"][aria-expanded="true"] {
    background-color: #fff;
    color: #2f3437;
  }

  nav.gcweb-menu ul#menu-pnl ul {
    /* margin-top: -1px;*/
    background: #fff;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.05);
    width: 620px;
    border: 1px solid #d5e2e9;
  }

  nav.gcweb-menu ul#menu-pnl li li {
    background: #fff;
  }

  nav.gcweb-menu ul#menu-pnl a {
    font-size: 18px;
    color: #fff;
  }

  nav.gcweb-menu ul#menu-pnl p {
    font-size: 16px;
    line-height: 1.25;
    color: #2f3437;
    margin: 5px 0 10px 0;
  }

  nav.gcweb-menu ul#menu-pnl h2 > a,
  nav.gcweb-menu ul#menu-pnl a.h2 {
    font-size: 24px;
    line-height: 1.25;
    color: #2f3437;
    margin: 25px 0 5px 0;
  }

  nav.gcweb-menu ul#menu-pnl h3 > a,
  nav.gcweb-menu ul#menu-pnl a.h3 {
    font-size: 18px;
    line-height: 1.25;
    color: #2f3437;
    margin: 5px 0;
  }

  .hr-menu {
    border: none;
    border-top: 1px solid #838d9b;
    margin: 5px 0;
  }

  nav.gcweb-menu ul#menu-pnl li a.alert-link {
    color: #2e2e40;
    text-decoration: underline;
  }

  @media screen and (max-width: 991px) {
    nav.gcweb-menu ul#menu-pnl ul {
      width: 100%;
      position: relative;
      left: 15px;
    }

    .gcweb-menu
      [aria-expanded="true"]:not(button)
      + [role="menu"]
      li:first-child
      [role="menuitem"],
    .gcweb-menu
      [aria-expanded="true"]:not(button)
      + [role="menu"]
      li:last-child
      [role="menuitem"] {
      padding-left: 65px;
    }

    .gcweb-menu [role="menu"] [role="menu"] li:first-child [role="menuitem"],
    .gcweb-menu [role="menu"] [role="menu"] li:last-child [role="menuitem"] {
      background: none;
      border: none;
    }

    .gcweb-menu [role="menu"] [role="menu"] [role="menuitem"],
    .gcweb-menu [role="menu"] [role="menu"] li:first-child [role="menuitem"] {
      border-bottom: 1px solid #ccc;
      color: #000;
      text-decoration: none;
    }

    nav.gcweb-menu [role="menu"] [role="menu"] li,
    nav.gcweb-menu [role="menu"] [role="menu"] li:not(:first-child) {
      width: auto;
      padding-left: 0;
      padding-right: 0;
    }

    nav.gcweb-menu li:last-child > a[role="menuitem"] {
      border-bottom: inherit;
    }

    nav.gcweb-menu ul#menu-pnl h2 > a,
    nav.gcweb-menu ul#menu-pnl a.h2 {
      margin: 5px 0;
    }

    /* mobile nav */
    /*nav.gcweb-menu ul#menu-pnl #vac-mnu-search {
    border-bottom: 1px solid #555;
  }

  nav.gcweb-menu ul#menu-pnl li:first-child ul,
  nav.gcweb-menu ul#menu-pnl li:first-child ul li {
    background: #2f3437;
  }

  #search-wrapper {
    width: auto;
  }*/
    /* mobile nav */
  }

  /* breadcrumb */
  header #wb-bc ol.breadcrumb li a,
  header #wb-bc ol.breadcrumb li {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: #434458;
  }

  #wb-bc a {
    padding: 5px 0px;
  }

  /* search button */

  header a#vac-search-btn {
    font-family: "Montserrat", sans-serif;
    color: #2f3437;
    font-size: 18px;
    text-transform: uppercase;
    text-decoration: none;
  }

  ul li.ui-menu-item .ui-menu-item-wrapper {
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
  }

  ul li.ui-menu-item .ui-menu-item-wrapper:hover,
  ul li.ui-menu-item .ui-menu-item-wrapper:hover > div {
    background: #2e2e40;
    border-left: #2e2e40;
  }

  ul li.ui-menu-item .ui-menu-item-wrapper:last-child:hover {
    background: #2e2e40;
    border-left: #2e2e40;
    border-bottom: #2e2e40;
  }

  .form-control {
    border: none !important;
    border-bottom: 1px solid #c1c5cb !important;
    box-shadow: none !important;
    border-radius: 0px;
  }

  #search-wrapper {
    background: white;
    border: 1px solid #d5e2e9 !important;
  }

  #search-wrapper input#vac-search.form-control {
    background: #f4f7f9;
    border: none !important;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 14px;
    color: #686969;
    padding-right: 0px;
  }
  button#search-button {
    background: #f4f7f9;
    border: none !important;
  }

  .btn-search {
    outline: none;
    border: none;
    background: rgba(255, 255, 255, 0);
  }

  /* input#vac-search.form-control {
  box-shadow: none !important;
  border-radius: 0px;
  border-bottom: 1px solid #d5e2e9!important;
  border-bottom: none!important;
} */

  /* tabbed panels */
  .wb-tabs [role="tablist"] {
    margin-left: 25px;
  }

  .wb-tabs [role="tablist"] > li {
    background: none;
    border-color: #c1c5cb;
    border-style: none;
    border-width: 0;
    cursor: pointer;
    display: table-cell;
    position: relative;
    left: -10px;
    text-align: center;
    color: #2f3437 !important;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 0.8em;
  }

  .wb-tabs [role="tablist"] > li:focus,
  .wb-tabs [role="tablist"] > li:hover {
    background: #d5e2e9;
  }

  .wb-tabs [role="tablist"] > li.active {
    background: none;
  }

  .wb-tabs > .tabpanels > details,
  .wb-tabs > details {
    border: 1px solid #d5e2e9;
    border-radius: 0px;
    background: #ffffff;
    box-sizing: border-box;
  }

  .wb-tabs [role="tablist"] > li a {
    color: #434458;
  }

  .wb-tabs [role="tablist"] > li.active a {
    border-bottom: 0.625em solid #1ca56f;
    border-top: none;
    background: none;
    cursor: default;
    padding-top: 0.357em;
    color: #2f3437;
  }

  #wb-info {
    color: #e6f0cb;
    background: #2e2e40;
  }

  #wb-info h1,
  #wb-info h2,
  #wb-info h3,
  #wb-info h4,
  #wb-info h5,
  #wb-info h6 {
    color: #ffffff;
  }

  #wb-info [role="tablist"] li > a {
    font-family: "Montserrat", sans-serif;
    color: #d5e2e9;
    text-decoration: underline;
  }

  #wb-info [role="tablist"] li > a .fa-inverse {
    color: #2f3437;
  }

  #wb-info .brand {
    background: #2e2e40 url(../../assets/svg-leaf.svg) no-repeat 50px -205px;
    background-size: 150%;
    border-top: 1px solid #434458;
  }

  #wb-info .brand li a {
    font-family: "Montserrat", sans-serif;
    color: #d5e2e9;
  }

  details summary {
    color: #2f3437;
    background-color: white;
    border-radius: 0px;
    font-family: "Montserrat", sans-serif;
    font-weight: normal;
    font-size: 16px;
    box-shadow: none;
    border: 1px solid #d5e2e9;
  }

  details summary:hover,
  details summary:focus,
  details summary:active {
    color: #2f3437;
    background-color: white;
    padding: 5px 15px;
  }

  @media only screen and (max-width: 991px) {
    .wb-tabs {
      border: none;
      border-radius: 0;
      margin-bottom: 0;
      padding-left: 0;
      padding-right: 0;
      font-family: "Montserrat", sans-serif;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
    }
  }

  /* brand bar */

  #wb-bnr .brand {
    margin: 16px 0;
  }

  #wb-bnr .brand a img {
    height: 26px;
  }

  #wb-bnr img#mva-logo {
    height: 20px;
    position: relative;
    top: 1px;
  }

  #wb-bnr .utility-links {
    margin: 10px 0 0 0;
  }

  #wb-bnr img#language-globe {
    height: 20px;
    margin-left: 5px;
    position: relative;
    top: -2px;
  }

  #wb-bnr,
  #wb-bnr a {
    font-family: "Montserrat", sans-serif;
    color: #ffffff;
    font-size: 10px;
    text-decoration: none;
  }

  #wb-bnr a {
    padding: 0 8px;
    text-transform: uppercase;
  }

  #wb-bnr a:hover {
    color: #838d9b;
    text-decoration: underline;
  }

  /* footer  */

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

  footer#wb-info a.btn.btn-light-grey-outline,
  footer#wb-info a.btn.btn-light-grey-outline:link,
  footer#wb-info a.btn.btn-outline-dark-grey:hover,
  footer#wb-info a.btn.btn-outline-dark-grey:focus,
  footer#wb-info a.btn.btn-outline-dark-grey:active {
    color: #d5e2e9;
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

  /* articles */
  main .article-link,
  main a.article-link {
    color: #434458;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    text-decoration: none;
    display: block;
  }

  .panel-footer {
    background: #ffffff;
    font-size: 18px;
    border-top: 1px solid #d5e2e9;
  }

  .panel-footer:hover,
  .panel-footer:focus {
    background: #434458;
    color: white;
    border-top: 1px solid #d5e2e9;
  }

  .article-panel {
    border-top: 8px solid #1ca56f;
    background: #fff;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.05);
    padding: 0 30px 30px 30px;
  }

  .article-rght-box {
    background: #f4f7f9;
  }

  .article-thing {
    background: #fff;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.05);
  }

  .articleCardTopContent {
    min-height: 17em;
  }

  .article-thumb {
    border-bottom: 6px solid #1ca56f;
  }

  .lrPadding15 {
    padding: 0px 15px 0px 15px;
  }

  .article a {
    text-decoration: none;
  }

  /* alerts */

  .alert {
    padding: 36px;
  }

  .alert-info {
    background: #fff;
    border-color: #dbe6eb;
    border-width: 6px;
  }

  .alert-info > :first-child:before {
    color: #434458;
  }

  .alert-success {
    background: #fff;
    border-color: #1ca56f;
    border-width: 6px;
  }

  .alert-success > :first-child:before {
    color: #1ca56f;
  }

  .alert-warning {
    background: #fff;
    border-color: #fbad1d;
    border-width: 6px;
  }

  .alert-warning > :first-child:before {
    color: #fbad1d;
  }

  .alert-danger {
    background: #fff;
    border-color: #d3080c;
    border-width: 6px;
  }

  .alert-danger > :first-child:before {
    color: #d3080c;
  }

  h2.pathway-hub-section,
  h3.pathway-hub-section {
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
  }

  .dataTables_wrapper .dataTables_paginate .paginate_button.current {
    border-radius: 0px;
    color: #fff;
    background: #2e2e40;
  }
  .dataTables_wrapper .dataTables_paginate .paginate_button.current:hover {
    color: #2e2e40;
    background: #d5e2e9;
  }

  .dataTables_wrapper .dataTables_paginate .paginate_button.current:last-child,
  .dataTables_wrapper .dataTables_paginate .paginate_button.next {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .dataTables_wrapper .dataTables_paginate .paginate_button.current:first-child,
  .dataTables_wrapper .dataTables_paginate .paginate_button.previous {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    margin-left: 0;
  }

  /* background colors */

  .bg-primary,
  table tr.bg-primary th {
    background: #2e2e40;
    color: #e6f0cb !important;
  }

  .bg-info {
    background: #e8eef2;
  }

  .bg-success {
    background: #e4f1e8;
  }

  .bg-jade {
    background: #1ca56f;
  }

  .bg-pale-yellow {
    background: #e3e9c8;
  }

  .bg-white {
    background: #ffffff;
  }

  .bg-off-white {
    background: #f4f7f9;
  }

  .bg-med-light-grey {
    background: #c1c5cb;
  }

  .bg-light-grey {
    background: #d5e2e9;
  }

  .bg-med-grey {
    background: #838d9b;
  }

  .bg-dark-grey {
    background: #2f3437;
  }

  .bg-black {
    background: #2e2e40;
  }

  /* text */
  .letter-spacing-xs {
    letter-spacing: 0.05em;
  }

  .letter-spacing-sm {
    letter-spacing: 0.15em;
  }

  .letter-spacing-md {
    letter-spacing: 0.25em;
  }

  .font-family-montserrat {
    font-family: "Montserrat", sans-serif;
  }

  .font-family-ptserif {
    font-family: Georgia, "Times New Roman", Times, serif;
  }

  .text-white,
  .panel .text-white {
    color: #ffffff;
  }

  .text-off-white,
  .panel .text-off-white {
    color: white;
  }

  .text-med-light-grey,
  .panel .text-med-light-grey {
    color: #c1c5cb;
  }

  .text-light-grey,
  .panel .text-light-grey {
    color: #d5e2e9;
  }

  .text-med-grey,
  .panel .text-med-grey {
    color: #838d9b;
  }

  .text-dark-grey,
  .panel .text-dark-grey,
  .text-primary,
  .panel .text-primary {
    color: #2f3437;
  }

  .text-jade,
  .panel .text-jade {
    color: #1ca56f;
  }

  .text-pale-yellow,
  .panel .text-pale-yellow {
    color: #e3e9c8;
  }

  /* borders */

  .brdr-jade {
    border-color: #1ca56f;
  }
  .brdr-pale-yellow {
    border-color: #e3e9c8;
  }
  .brdr-black {
    border-color: #000000;
  }
  .brdr-dark-grey {
    border-color: #2f3437;
    border: 1px solid;
  }
  .brdr-med-dark-grey {
    border-color: #434458;
  }
  .brdr-med-grey {
    border-color: #838d9b;
  }
  .brdr-med-light-grey {
    border-color: #c1c5cb;
  }
  .brdr-light-grey {
    border-color: #d5e2e9;
  }
  .brdr-white {
    border-color: #ffffff;
  }

  .brdr-all-thick {
    border: 2px solid #d5e2e9;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  /* details */
  details summary.summary-dark-grey {
    background: #2f3437;
    color: white;
    font-size: 18px;
    padding: 14px;
    border: none;
  }

  /* media player */
  .wb-mm-ctrls .frstpnl {
    width: initial;
  }

  /* buttons */

  .btn,
  main .btn,
  a.btn,
  button.btn,
  input.btn,
  summary.btn {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    border-radius: 0px !important;
    -webkit-transition: color 0.1s;
    transition: color 0.1s;
    -webkit-transition: background-color 0.1s;
    transition: background-color 0.1s;
  }

  .btn-group-lg > input.btn[type="button"],
  .btn-group-lg > input.btn[type="reset"],
  .btn-group-lg > input.btn[type="submit"],
  .input-group-lg > .input-group-btn > input.btn[type="button"],
  .input-group-lg > .input-group-btn > input.btn[type="reset"],
  .input-group-lg > .input-group-btn > input.btn[type="submit"],
  .input-group-lg > input.form-control[type="button"],
  .input-group-lg > input.form-control[type="reset"],
  .input-group-lg > input.form-control[type="submit"],
  .input-group-lg > input.input-group-addon[type="button"],
  .input-group-lg > input.input-group-addon[type="reset"],
  .input-group-lg > input.input-group-addon[type="submit"],
  input[type="button"].btn-lg,
  input[type="button"].input-lg,
  input[type="reset"].btn-lg,
  input[type="reset"].input-lg,
  input[type="submit"].btn-lg,
  input[type="submit"].input-lg {
    height: inherit;
  }

  .force-style-gcweb-4-0-29 .btn-group-lg > .btn,
  .force-style-gcweb-4-0-29 .btn.btn-lg,
  form .btn-group-lg > .btn,
  form .btn.btn-lg {
    font-size: 18px;
    padding: 16px 36px;
    line-height: inherit;
    border-radius: 0;
  }

  .btn-sm,
  a > .btn .btn-sm,
  button > .btn .btn-sm,
  form input > .btn .btn-sm,
  summary > .btn .btn-sm {
    font-size: 14px;
  }

  .btn-lg,
  a > .btn.btn-lg,
  button > .btn.btn-lg,
  form input > .btn.btn-lg,
  summary > .btn.btn-lg {
    font-size: 18px;
    padding: 16px 36px;
  }

  .btn-link,
  main .btn-link,
  footer .btn-link,
  a > .btn-link,
  button > .btn-link,
  input > .btn-link,
  summary > .btn-link {
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    font-size: 18px;
    color: #2f3437;
    -webkit-transition: color 0.1s;
    transition: color 0.1s;
    -webkit-transition: background-color 0.1s;
    transition: background-color 0.1s;
    border: 3px solid rgba(255, 255, 255, 0);
  }

  .btn-link:hover,
  main .btn-link:hover,
  footer .btn-link:hover,
  a > .btn-link:hover,
  button > .btn-link:hover,
  input > .btn-link:hover,
  summary > .btn-link:hover,
  .btn-link:focus,
  a > .btn-link:focus,
  button > .btn-link:focus,
  input > .btn-link:focus,
  summary > .btn-link:focus,
  .btn-link:active,
  a > .btn-link:active,
  button > .btn-link:active,
  input > .btn-link:active,
  summary > .btn-link:active {
    color: #434458;
    text-decoration: underline;
  }

  .btn-default,
  main .btn-default,
  footer .btn-default,
  a > .btn-default,
  button > .btn-default,
  input > .btn-default,
  summary > .btn-default,
  .btn-default:visited,
  a > .btn-default:visited,
  input > .btn-default:visited,
  button > .btn-default:visited,
  summary > .btn-default:visited {
    background-color: #d5e2e9;
    color: #2f3437;
    border: 3px solid #d5e2e9;
  }

  .btn-default:hover,
  main .btn-default:hover,
  footer .btn-default:hover,
  a > .btn-default:hover,
  button > .btn-default:hover,
  input > .btn-default:hover,
  summary > .btn-default:hover,
  .btn-default:focus,
  a > .btn-default:focus,
  button > .btn-default:focus,
  input > .btn-default:focus,
  summary > .btn-default:focus,
  .btn-default:active,
  a > .btn-default:active,
  button > .btn-default:active,
  input > .btn-default:active,
  summary > .btn-default:active {
    background-color: #434458;
    color: #fff;
    border: 3px solid #434458;
  }

  .btn-default-outline,
  main .btn-default-outline,
  footer .btn-default-outline,
  a > .btn-default-outline,
  button > .btn-default-outline,
  input > .btn-default-outline,
  summary > .btn-default-outline,
  .btn-default-outline:visited,
  a > .btn-default-outline:visited,
  button > .btn-default-outline:visited,
  input > .btn-default-outline:visited,
  summary > .btn-default-outline:visited {
    background: rgba(255, 255, 255, 0);
    color: #d5e2e9;
    border: 3px solid #d5e2e9;
  }

  .btn-default-outline:hover,
  main .btn-default-outline:hover,
  footer .btn-default-outline:hover,
  a > .btn-default-outline:hover,
  button > .btn-default-outline:hover,
  input > .btn-default-outline:hover,
  summary > .btn-default-outline:hover,
  .btn-default-outline:focus,
  a > .btn-default-outline:focus,
  button > .btn-default-outline:focus,
  input > .btn-default-outline:focus,
  summary > .btn-default-outline:focus,
  .btn-default-outline:active,
  a > .btn-default-outline:active,
  button > .btn-default-outline:active,
  input > .btn-default-outline:active,
  summary > .btn-default-outline:active {
    background: #434458;
    color: #d5e2e9;
    border: 3px solid #434458;
    text-decoration-color: #634f70;
  }

  main .shr-pg .modal-body .btn-default,
  footer .shr-pg .modal-body .btn-default,
  .shr-pg .modal-body .btn-default,
  .shr-pg .modal-body a.btn-default,
  .shr-pg .modal-body button.btn-default,
  .shr-pg .modal-body .btn-default:visited,
  .shr-pg .modal-body a.btn-default:visited,
  .shr-pg .modal-body button.btn-default:visited {
    background-color: #d5e2e9;
    color: #2f3437;
    border: 3px solid #d5e2e9;
  }

  main .shr-pg .modal-body .btn-default:hover,
  footer .shr-pg .modal-body .btn-default:hover,
  .shr-pg .modal-body .btn-default:hover,
  .shr-pg .modal-body a.btn-default:hover,
  .shr-pg .modal-body button.btn-default:hover,
  .shr-pg .modal-body .btn-default:focus,
  .shr-pg .modal-body a.btn-default:focus,
  .shr-pg .modal-body button.btn-default:focus,
  .shr-pg .modal-body .btn-default:active,
  .shr-pg .modal-body a.btn-default:active,
  .shr-pg .modal-body button.btn-default:active {
    background-color: #2f3437;
    color: #fff;
    border: 3px solid #2f3437;
  }

  .btn-primary,
  main .btn-primary,
  footer .btn-primary,
  a > .btn-primary,
  button > .btn-primary,
  form input > .btn-primary,
  summary > .btn-primary,
  .btn-primary:visited,
  a > .btn-primary:visited,
  button > .btn-primary:visited,
  form input > .btn-primary:visited,
  summary > .btn-primary:visited,
  .btn-dark-grey,
  main .btn-dark-grey,
  footer .btn-dark-grey,
  a > .btn-dark-grey,
  button > .btn-dark-grey,
  form input > .btn-dark-grey,
  summary > .btn-dark-grey,
  .btn-dark-grey:visited,
  a > .btn-dark-grey:visited,
  button > .btn-dark-grey:visited,
  form input > .btn-dark-grey:visited,
  summary > .btn-dark-grey:visited {
    background: #2e2e40;
    color: white;
    border: 3px solid #2e2e40;
  }
  .btn-primary:hover,
  .btn-primary.active.focus,
  .btn-primary.active:focus,
  .btn-primary.active:hover,
  .btn-primary:active.focus,
  .btn-primary:active:focus,
  .btn-primary:active:hover,
  .open > .btn-primary.dropdown-toggle.focus,
  .open > .btn-primary.dropdown-toggle:focus,
  .open > .btn-primary.dropdown-toggle:hover,
  main .btn-primary:hover,
  a > .btn-primary:hover,
  button > .btn-primary:hover,
  input > .btn-primary:hover,
  summary > .btn-primary:hover,
  .btn-primary:focus,
  main .btn-primary:focus,
  a > .btn-primary:focus,
  button > .btn-primary:focus,
  input > .btn-primary:focus,
  summary > .btn-primary:focus,
  .btn-primary:active,
  main .btn-primary:active,
  a > .btn-primary:active,
  button > .btn-primary:active,
  input > .btn-primary:active,
  summary > .btn-primary:active,
  button > .btn-primary.popup-modal-dismiss:hover {
    background-color: #434458;
    color: #fff;
    border: 3px solid #434458;
  }

  .btn-primary-outline,
  a > .btn-primary-outline,
  button > .btn-primary-outline,
  input > .btn-primary-outline,
  summary > .btn-primary-outline,
  .btn-primary-outline:visited,
  a > .btn-primary-outline:visited,
  button > .btn-primary-outline:visited,
  input > .btn-primary-outline:visited,
  summary > .btn-primary-outline:visited {
    background: rgba(255, 255, 255, 0);
    color: #2f3437;
    border: 3px solid #2f3437;
  }

  .btn-primary-outline:hover,
  a > .btn-primary-outline:hover,
  button > .btn-primary-outline:hover,
  input > .btn-primary-outline:hover,
  summary > .btn-primary-outline:hover,
  .btn-primary-outline:focus,
  a > .btn-primary-outline:focus,
  button > .btn-primary-outline:focus,
  input > .btn-primary-outline:focus,
  summary > .btn-primary-outline:focus,
  .btn-primary-outline:active,
  a > .btn-primary-outline:active,
  button > .btn-primary-outline:active,
  input > .btn-primary-outline:active,
  summary > .btn-primary-outline:active {
    background: #ffffff;
    color: #2e2e40;
    border: 3px solid #434458;
    text-decoration: underline;
    text-decoration-color: #434458;
  }

  .btn-info,
  main .btn-info,
  footer .btn-info,
  a > .btn-info,
  button > .btn-info,
  input > .btn-info,
  summary > .btn-info,
  .btn-info:visited,
  a > .btn-info:visited,
  button > .btn-info:visited,
  input > .btn-info:visited,
  summary > .btn-info:visited {
    background-color: #434458;
    color: #fff;
    border: 3px solid #434458;
  }

  .btn-info:hover,
  main .btn-info:hover,
  footer .btn-info:hover,
  a.btn-info:hover,
  button.btn-info:hover,
  summary.btn-info:hover,
  .btn-info:focus,
  a.btn-info:focus,
  button.btn-info:focus,
  summary.btn-info:focus,
  .btn-info:active,
  a.btn-info:active,
  button.btn-info:active,
  summary.btn-info:active {
    background-color: #6e6f91;
    color: #fff;
    border: 3px solid #6e6f91;
  }

  .btn-success,
  a.btn-success,
  button.btn-success,
  summary.btn-success,
  .btn-success:visited,
  a.btn-success:visited,
  button.btn-success:visited,
  summary.btn-success:visited {
    background: #17875a;
    color: #ffffff;
    border: 3px solid #17875a;
  }

  .btn-success:hover,
  a.btn-success:hover,
  button.btn-success:hover,
  summary.btn-success:hover,
  .btn-success:focus,
  a.btn-success:focus,
  button.btn-success:focus,
  summary.btn-success:focus,
  .btn-success:active,
  a.btn-success:active,
  button.btn-success:active,
  summary.btn-success:active {
    background-color: #13724c;
    color: #ffffff;
    border: 3px solid #13724c;
  }

  .btn-warning,
  a.btn-warning,
  button.btn-warning,
  summary.btn-warning,
  .btn-warning:visited,
  a.btn-warning:visited,
  button.btn-warning:visited,
  summary.btn-warning:visited {
    background: #fbad1d;
    color: #2f3437;
    border: 3px solid #fbad1d;
  }

  .btn-warning:hover,
  a.btn-warning:hover,
  button.btn-warning:hover,
  summary.btn-warning:hover,
  .btn-warning:focus,
  a.btn-warning:focus,
  button.btn-warning:focus,
  summary.btn-warning:focus,
  .btn-warning:active,
  a.btn-warning:active,
  button.btn-warning:active,
  summary.btn-warning:active {
    background-color: #a06903;
    color: #ffffff;
    border: 3px solid #a06903;
  }

  .btn-danger,
  a.btn-danger,
  button.btn-danger,
  summary.btn-danger,
  .btn-danger:visited,
  a.btn-danger:visited,
  button.btn-danger:visited,
  summary.btn-danger:visited {
    background: #d3080c;
    color: #ffffff;
    border: 3px solid #d3080c;
  }

  .btn-danger:hover,
  a.btn-danger:hover,
  button.btn-danger:hover,
  summary.btn-danger:hover,
  .btn-danger:focus,
  a.btn-danger:focus,
  button.btn-danger:focus,
  summary.btn-danger:focus,
  .btn-danger:active,
  a.btn-danger:active,
  button.btn-danger:active,
  summary.btn-danger:active {
    background-color: #a70609;
    color: #ffffff;
    border: 3px solid #a70609;
  }

  /* add-on styles */

  .btn-sm {
    padding: 9px 18px !important;
  }

  /* margins */
  .mrgn-all-0 {
    margin: 0;
  }

  .mrgn-all-xs {
    margin: 5px;
  }

  .mrgn-all-sm {
    margin: 10px;
  }

  .mrgn-all-md {
    margin: 20px;
  }

  .mrgn-all-lg {
    margin: 30px;
  }

  .mrgn-all-xl {
    margin: 40px;
  }

  /* padding */
  .pddg-all-0 {
    padding: 0;
  }

  .pddg-all-sm {
    padding: 10px;
  }

  .pddg-all-md {
    padding: 15px;
  }

  .pddg-all-lg {
    padding: 30px;
  }

  .pddg-all-xl {
    padding: 50px;
  }

  .svg-leaf,
  #vac-home-panel {
    background-image: url(../../assets/svg-leaf.svg);
    background-repeat: no-repeat;
    background-size: 260%;
    background-position: 200px -225px;
  }

  #vac-home-panel h1 {
    font-size: 48px;
  }

  .svg-compass,
  #ben-finder {
    background-image: url(../../assets/svg-compass.svg);
    background-repeat: no-repeat;
    background-size: 65%;
    background-position: 475px -40px;
  }

  .position-helper {
    position: relative;
  }

  .vac-home-panel {
    background: #2e2e40
      url(../../2018-redesign-assets/images/cover-young-girl.jpg) no-repeat
      center center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    min-height: 280px;
  }

  .container-block-250px {
    height: 250px;
    clear: both;
  }

  .container-block-200px {
    height: 200px;
    clear: both;
  }

  .container-block-175px {
    height: 175px;
    clear: both;
  }
  .container-block-150px {
    height: 150px;
    clear: both;
  }

  .container-block-100px {
    height: 100px;
    clear: both;
  }

  .container-block-50px {
    height: 50px;
    clear: both;
  }

  .vac-home-panel-offset {
    position: relative;
    top: 250px;
  }

  /* pagenation */

  .pagination {
    border-radius: 0;
  }

  .pagination > li:first-child > a,
  .pagination > li:first-child > span {
    margin-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  .pagination > li:last-child > a,
  .pagination > li:last-child > span {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .pager > li > a {
    border-radius: 0;
  }
  .pager > li > a:hover {
    text-decoration: none;
    border-radius: 0;
  }
  .pager li > a,
  .pager li > span {
    background-color: #eaebed;
    border: 3px solid #eaebed;
    border-radius: 0;
    font-weight: 700;
  }
  .pagination > li > a,
  .pagination > li > span {
    color: #2e2e40;
    background-color: #eaebed;
    border: 3px solid #eaebed;
  }

  .pager > li > a:focus,
  .pager > li > a:hover,
  .pager > li > span:focus,
  .pager > li > span:hover {
    border-color: #434458;
    background: #434458;
    color: #fff;
  }

  /* panels */

  .panel {
    border-radius: 0px;
    box-shadow: none !important;
  }

  .panel-info {
    border-color: #434458;
  }

  .panel-info .panel-heading {
    background-color: #434458;
    border-color: #434458;
    color: #e6f0cb;
  }

  .panel-primary {
    border-color: #1ca56f;
  }

  .panel-primary .panel-heading {
    background-color: #168357;
    border-color: #1ca56f;
    color: #fff;
  }

  .panel-info .panel-heading h2,
  .panel-info .panel-heading h3,
  .panel-info .panel-heading h4,
  .panel-info .panel-heading h5 {
    color: #e6f0cb;
    font-size: 14px;
    margin: 5px 0;
    letter-spacing: 0.25em;
    text-transform: uppercase;
  }

  .panel-heading {
    border-radius: 0;
  }

  .panel-default {
    border-color: #d5e2e9;
    border-radius: 0;
  }
  .panel-default .panel-heading {
    background-color: #d5e2e9;
    border-color: #d5e2e9;
    color: #2f3437;
  }

  .panel-heading .panel-title {
    font-family: "Barlow", sans-serif;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.25em;
  }

  .panel.panel-dark-grey {
    background: #2f3437;
  }

  .panel-dark-grey h1,
  .panel-dark-grey h2,
  .panel-dark-grey h3,
  .panel-dark-grey h4,
  .panel-dark-grey h5,
  .panel-dark-grey h6,
  .panel-dark-grey p {
    color: #ffffff;
  }
  .panel.panel-dark-grey a,
  .panel.panel-dark-grey a:visited {
    color: #ffffff;
  }
  .panel.panel-dark-grey a:hover,
  .panel.panel-dark-grey a:visited:hover,
  .panel.panel-dark-grey a:focus {
    color: #ffffff;
    text-decoration: underline;
  }

  main .list-group-item {
    font-size: 16px;
  }

  /* events calendar */
  .wb-calevt-cal .cal-days .cal-evt {
    background: #168357;
  }

  /* misc */
  a > img.social-icon {
    height: 40px;
  }

  footer#wb-info .social-icons a {
    text-decoration: none;
  }

  a > img.social-icon:hover {
    background-color: #000000;
    border-radius: 50px;
  }

  .accent {
    background-color: #1ca56f;
    min-height: 0.4em;
    max-width: 3.5em;
    height: 0.4em;
  }

  .accent-tp {
    background-color: #1ca56f;
    min-height: 0.4em;
    height: 0.4em;
  }

  .box-shadow {
    background: #ffffff;
    border-top: none;
    box-sizing: border-box;
    box-shadow: 0px 4px 14px rgba(0, 0, 0, 0.05) !important;
  }

  .border-bttm {
    border: 1px solid #d5e2e9;
  }

  .mrgn-tp-xxl {
    margin-top: 4em;
    clear: both;
  }

  .mrgn-bttm-xxl {
    margin-bottom: 4em;
    clear: both;
  }

  /* archived content */
  #archived {
    border: 6px solid #fbad1d;
    margin: 20px 0;
    padding: 0 30px 20px 30px;
  }

  #custom-margin {
    margin: 0 30px;
  }

  /* media queries */
  @media only screen and (max-width: 1024px) {
    .svg-leaf,
    #vac-home-panel {
      background-image: url(../../assets/svg-leaf.svg);
      background-repeat: no-repeat;
      background-size: 260%;
      background-position: 200px -50px;
    }
  }

  @media only screen and (max-width: 425px) {
    .svg-leaf,
    #vac-home-panel {
      background-image: url(../../assets/svg-leaf.svg);
      background-repeat: no-repeat;
      background-size: 400%;
      background-position: -50px 0px;
    }

    /* hide slick prev and next buttons */
    button.slick-next.slick-arrow,
    button.slick-prev.slick-arrow {
      display: none !important;
    }

    /* fix to move menu button over left and align with fip */
    nav.gcweb-menu button[aria-haspopup="true"] {
      padding-left: 0;
    }
    /* fix to remove grey focus colour */
    nav.gcweb-menu button#menu-button:hover,
    nav.gcweb-menu button#menu-button:active,
    nav.gcweb-menu button#menu-button:focus {
      background-color: #fff;
      color: #2f3437;
    }

    .gcweb-menu button[aria-haspopup="true"]:hover,
    .gcweb-menu button[aria-haspopup="true"][aria-expanded="true"] {
      background-color: #fff;
      color: #2f3437;
    }
  }

  @media only screen and (min-width: 768px) {
    a[href^="tel:"] {
      color: inherit;
      cursor: default;
      text-decoration: none;
    }
    a[href^="tel:"]:not(.btn) {
      white-space: nowrap;
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
    h1,
    main h1,
    .h1 {
      line-height: 40px;
      font-size: 40px;
    }
    p.lead {
      font-size: 20px;
    }
    #wb-bnr .utility-links {
      margin: 0;
    }

    #wb-bnr .utility-links > ul {
      text-align: left;
    }

    .wb-share {
      width: 100%;
      text-align: left;
    }
    nav hr.hr-med-grey {
      margin: 0;
    }

    .article-panel .program-panel {
      padding: 0;
    }

    blockquote.lead {
      font-size: 16px;
    }

    .program-panel blockquote {
      display: none;
    }

    .btn,
    .btn .btn-default,
    .btn .btn-primary,
    .btn .btn-info,
    .btn .btn-success,
    .btn .btn-warning,
    .btn .btn-danger {
      font-size: 16px;
      width: 100%;
      display: inline-block;
    }

    #custom-margin {
      margin: 0;
    }

    /* mobile nav */
    /*nav.gcweb-menu ul#menu-pnl #vac-mnu-search {
    border-bottom: 1px solid #555;
  }

  nav.gcweb-menu ul#menu-pnl li:first-child ul,
  nav.gcweb-menu ul#menu-pnl li:first-child ul li {
    background: #2f3437;
  }

  #search-wrapper {
    width: auto;
  }*/
  }

  @media only screen and (min-width: 1024px) {
    #wb-cont #vac-home-panel .panel-body h1#home-header,
    #wb-cont #vac-home-panel .home-panel-margin .accent {
      margin-left: 30px;
    }
  }

  @media only screen and (min-width: 1200px) {
    nav.gcweb-menu ul#menu-pnl ul {
      width: 810px;
    }
  }

  /* Video Player */

  .wb-mltmd {
    font-family: "Noto Sans", sans-serif;
  }

  .wb-mltmd .btn,
  .wb-mltmd a.btn,
  .wb-mltmd button.btn,
  .wb-mltmd input.btn,
  .wb-mltmd summary.btn {
    font-family: "Noto Sans", sans-serif;
    font-weight: 400;
    border-radius: 4px !important;
  }

  .wb-mltmd .btn-default,
  .wb-mltmd a > .btn-default,
  .wb-mltmd button > .btn-default,
  .wb-mltmd input > .btn-default,
  .wb-mltmd summary > .btn-default,
  .wb-mltmd .btn-default:visited,
  .wb-mltmd a > .btn-default:visited,
  .wb-mltmd input > .btn-default:visited,
  .wb-mltmd button > .btn-default:visited,
  .wb-mltmd summary > .btn-default:visited {
    background: 0 0;
    border: 0;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    color: #fff;
    font-size: 130%;
  }

  .wb-mltmd .btn-default:hover,
  .wb-mltmd footer .btn-default:hover,
  .wb-mltmd a > .btn-default:hover,
  .wb-mltmd button > .btn-default:hover,
  .wb-mltmd input > .btn-default:hover,
  .wb-mltmd summary > .btn-default:hover,
  .wb-mltmd .btn-default:focus,
  .wb-mltmd a > .btn-default:focus,
  .wb-mltmd button > .btn-default:focus,
  .wb-mltmd input > .btn-default:focus,
  .wb-mltmd summary > .btn-default:focus,
  .wb-mltmd .btn-default:active,
  .wb-mltmd a > .btn-default:active,
  .wb-mltmd button > .btn-default:active,
  .wb-mltmd input > .btn-default:active,
  .wb-mltmd summary > .btn-default:active {
    background: 0 0;
    border: 0;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    color: #fff;
    font-size: 130%;
  }

  @media screen and (min-width: 768px) and (max-width: 991px) {
    #wb-bnr .utility-links {
      margin: 18px 0 0 0;
    }
  }
`;

export default styles;
