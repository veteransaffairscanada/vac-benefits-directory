import { css } from "emotion";
const styles = css`
  /*
 *  Copyright 2015 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

  /* Column Control component */
  @media (min-width: 600px) {
    .parsys_column {
      margin: 0;
    }
    .cq-colctrl-lt0-c0,
    .cq-colctrl-lt0-c1 {
      float: left;
      width: 48%;
    }
    .cq-colctrl-lt0-c0 {
      margin-right: 2%;
    }
    .cq-colctrl-lt0-c1 {
      margin-left: 2%;
    }
  }

  /*
 *  Copyright 2015 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

  /* Text-Image component */
  .textimage-left {
    float: left;
    margin: 0 1em 1em 0;
  }
  .textimage-right {
    float: right;
    margin: 0 0 1em 1em;
  }
  .textimage-text {
    margin: 0 0 -1em;
  }
  .textimage-text:after {
    content: "";
    display: table;
    clear: both;
  }

  div.carousel {
    margin-top: 7px;
    margin-bottom: 7px;
  }
  .cq-carousel {
    position: relative;
    width: 940px;
    height: 270px;
    overflow: hidden;
  }
  .cq-carousel var {
    display: none;
  }

  .cq-carousel-banner-item {
    width: 940px;
    height: 270px;
    left: 1000px;
    position: absolute;
    top: 0;
    background-color: #eee;
    overflow: hidden;
  }
  .cq-carousel-banner-item img {
    width: 940px;
    height: 270px;
    background: no-repeat center center;
  }

  .par .cq-carousel-banner-item img {
    width: 700px;
    height: 245px;
    background: no-repeat center center;
  }
  .par .cq-carousel {
    width: 700px;
    height: 245px;
  }
  .par .cq-carousel-banner-item {
    width: 700px;
    height: 245px;
  }

  .cq-carousel-banner-item h3,
  .cq-carousel-banner-item p {
    padding: 10px;
  }

  .cq-carousel-banner {
    position: absolute;
  }

  .cq-carousel-banner-switches,
  .cq-carousel-banner-switches-tl,
  .cq-carousel-banner-switches-tc,
  .cq-carousel-banner-switches-tr,
  .cq-carousel-banner-switches-bl,
  .cq-carousel-banner-switches-bc,
  .cq-carousel-banner-switches-br {
    position: absolute;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .cq-carousel-banner-switches {
    display: none;
  }
  .cq-carousel-banner-switches-tl {
    top: 0;
    left: 0;
  }
  .cq-carousel-banner-switches-tc {
    top: 0;
    left: 0;
    text-align: center;
  }
  .cq-carousel-banner-switches-tr {
    top: 0;
    left: 0;
    text-align: right;
  }
  .cq-carousel-banner-switches-bl {
    bottom: 0;
    left: 0;
  }
  .cq-carousel-banner-switches-bc {
    bottom: 0;
    left: 0;
    text-align: center;
  }
  .cq-carousel-banner-switches-br {
    bottom: 0;
    left: 0;
    text-align: right;
  }

  .cq-carousel-banner-switch {
    display: inline-block;
    margin: 8px;
    padding: 0;
  }
  .cq-carousel-banner-switch-br {
    position: absolute;
    margin: 0;
    padding: 0;
    bottom: 0;
    right: 8px;
  }
  .cq-carousel-banner-switch-bl {
    position: absolute;
    margin: 0;
    padding: 0;
    bottom: 0;
    left: 8px;
  }

  .cq-carousel-controls a {
    position: absolute;
    width: 24px;
    height: 48px;
    top: 111px; /* 270/2 - 24 */
    background: url("../default/images/carousel/controls.png") no-repeat scroll
      0 0 transparent;
    visibility: hidden;
  }
  .cq-carousel-controls a.cq-carousel-active {
    visibility: visible;
  }
  a.cq-carousel-control-prev {
    left: 0;
    background-position: -24px 0;
  }
  a.cq-carousel-control-prev:hover {
    left: 0;
    background-position: -72px 0;
  }
  a.cq-carousel-control-next {
    right: 0;
  }
  a.cq-carousel-control-next:hover {
    right: 0;
    background-position: -48px 0;
  }

  .cq-carousel-banner-switch a {
    display: inline-block;
    background: url("../default/images/carousel/switcher.png") no-repeat scroll
      0 0 transparent;
  }
  .cq-carousel-banner-switch a img {
    width: 25px;
    height: 25px;
    vertical-align: top;
  }

  .cq-carousel-banner-switch a.cq-carousel-active,
  .cq-carousel-banner-switch a:hover {
    background-position: -25px 0;
  }

  .cq-carousel-banner-switch li {
    background: none !important;
    display: inline-block;
    list-style: none;
    float: left;
  }

  div.carousel {
    margin-top: 7px;
    margin-bottom: 7px;
  }
  .cq-carousel {
    position: relative;
    width: 940px;
    height: 270px;
    overflow: hidden;
  }
  .cq-carousel var {
    display: none;
  }

  .cq-carousel-banner-item {
    width: 940px;
    height: 270px;
    left: 1000px;
    position: absolute;
    top: 0;
    background-color: #eee;
    overflow: hidden;
  }
  .cq-carousel-banner-item img {
    width: 940px;
    height: 270px;
    background: no-repeat center center;
  }

  .par .cq-carousel-banner-item img {
    width: 700px;
    height: 245px;
    background: no-repeat center center;
  }
  .par .cq-carousel {
    width: 700px;
    height: 245px;
  }
  .par .cq-carousel-banner-item {
    width: 700px;
    height: 245px;
  }

  .cq-carousel-banner-item h3,
  .cq-carousel-banner-item p {
    padding: 10px;
  }

  .cq-carousel-banner {
    position: absolute;
  }

  .cq-carousel-banner-switches,
  .cq-carousel-banner-switches-tl,
  .cq-carousel-banner-switches-tc,
  .cq-carousel-banner-switches-tr,
  .cq-carousel-banner-switches-bl,
  .cq-carousel-banner-switches-bc,
  .cq-carousel-banner-switches-br {
    position: absolute;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .cq-carousel-banner-switches {
    display: none;
  }
  .cq-carousel-banner-switches-tl {
    top: 0;
    left: 0;
  }
  .cq-carousel-banner-switches-tc {
    top: 0;
    left: 0;
    text-align: center;
  }
  .cq-carousel-banner-switches-tr {
    top: 0;
    left: 0;
    text-align: right;
  }
  .cq-carousel-banner-switches-bl {
    bottom: 0;
    left: 0;
  }
  .cq-carousel-banner-switches-bc {
    bottom: 0;
    left: 0;
    text-align: center;
  }
  .cq-carousel-banner-switches-br {
    bottom: 0;
    left: 0;
    text-align: right;
  }

  .cq-carousel-banner-switch {
    display: inline-block;
    margin: 8px;
    padding: 0;
  }
  .cq-carousel-banner-switch-br {
    position: absolute;
    margin: 0;
    padding: 0;
    bottom: 0;
    right: 8px;
  }
  .cq-carousel-banner-switch-bl {
    position: absolute;
    margin: 0;
    padding: 0;
    bottom: 0;
    left: 8px;
  }

  .cq-carousel-controls a {
    position: absolute;
    width: 24px;
    height: 48px;
    top: 111px; /* 270/2 - 24 */
    background: url("../default/images/carousel/controls.png") no-repeat scroll
      0 0 transparent;
    visibility: hidden;
  }
  .cq-carousel-controls a.cq-carousel-active {
    visibility: visible;
  }
  a.cq-carousel-control-prev {
    left: 0;
    background-position: -24px 0;
  }
  a.cq-carousel-control-prev:hover {
    left: 0;
    background-position: -72px 0;
  }
  a.cq-carousel-control-next {
    right: 0;
  }
  a.cq-carousel-control-next:hover {
    right: 0;
    background-position: -48px 0;
  }

  .cq-carousel-banner-switch a {
    display: inline-block;
    background: url("../default/images/carousel/switcher.png") no-repeat scroll
      0 0 transparent;
  }
  .cq-carousel-banner-switch a img {
    width: 25px;
    height: 25px;
    vertical-align: top;
  }

  .cq-carousel-banner-switch a.cq-carousel-active,
  .cq-carousel-banner-switch a:hover {
    background-position: -25px 0;
  }

  .cq-carousel-banner-switch li {
    background: none !important;
    display: inline-block;
    list-style: none;
    float: left;
  }

  div.carousel {
    margin-top: 7px;
    margin-bottom: 7px;
  }
  .cq-carousel {
    position: relative;
    width: 940px;
    height: 270px;
    overflow: hidden;
  }
  .cq-carousel var {
    display: none;
  }

  .cq-carousel-banner-item {
    width: 940px;
    height: 270px;
    left: 1000px;
    position: absolute;
    top: 0;
    background-color: #eee;
    overflow: hidden;
  }
  .cq-carousel-banner-item img {
    width: 940px;
    height: 270px;
    background: no-repeat center center;
  }

  .par .cq-carousel-banner-item img {
    width: 700px;
    height: 245px;
    background: no-repeat center center;
  }
  .par .cq-carousel {
    width: 700px;
    height: 245px;
  }
  .par .cq-carousel-banner-item {
    width: 700px;
    height: 245px;
  }

  .cq-carousel-banner-item h3,
  .cq-carousel-banner-item p {
    padding: 10px;
  }

  .cq-carousel-banner {
    position: absolute;
  }

  .cq-carousel-banner-switches,
  .cq-carousel-banner-switches-tl,
  .cq-carousel-banner-switches-tc,
  .cq-carousel-banner-switches-tr,
  .cq-carousel-banner-switches-bl,
  .cq-carousel-banner-switches-bc,
  .cq-carousel-banner-switches-br {
    position: absolute;
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .cq-carousel-banner-switches {
    display: none;
  }
  .cq-carousel-banner-switches-tl {
    top: 0;
    left: 0;
  }
  .cq-carousel-banner-switches-tc {
    top: 0;
    left: 0;
    text-align: center;
  }
  .cq-carousel-banner-switches-tr {
    top: 0;
    left: 0;
    text-align: right;
  }
  .cq-carousel-banner-switches-bl {
    bottom: 0;
    left: 0;
  }
  .cq-carousel-banner-switches-bc {
    bottom: 0;
    left: 0;
    text-align: center;
  }
  .cq-carousel-banner-switches-br {
    bottom: 0;
    left: 0;
    text-align: right;
  }

  .cq-carousel-banner-switch {
    display: inline-block;
    margin: 8px;
    padding: 0;
  }
  .cq-carousel-banner-switch-br {
    position: absolute;
    margin: 0;
    padding: 0;
    bottom: 0;
    right: 8px;
  }
  .cq-carousel-banner-switch-bl {
    position: absolute;
    margin: 0;
    padding: 0;
    bottom: 0;
    left: 8px;
  }

  .cq-carousel-controls a {
    position: absolute;
    width: 24px;
    height: 48px;
    top: 111px; /* 270/2 - 24 */
    background: url("../default/images/carousel/controls.png") no-repeat scroll
      0 0 transparent;
    visibility: hidden;
  }
  .cq-carousel-controls a.cq-carousel-active {
    visibility: visible;
  }
  a.cq-carousel-control-prev {
    left: 0;
    background-position: -24px 0;
  }
  a.cq-carousel-control-prev:hover {
    left: 0;
    background-position: -72px 0;
  }
  a.cq-carousel-control-next {
    right: 0;
  }
  a.cq-carousel-control-next:hover {
    right: 0;
    background-position: -48px 0;
  }

  .cq-carousel-banner-switch a {
    display: inline-block;
    background: url("../default/images/carousel/switcher.png") no-repeat scroll
      0 0 transparent;
  }
  .cq-carousel-banner-switch a img {
    width: 25px;
    height: 25px;
    vertical-align: top;
  }

  .cq-carousel-banner-switch a.cq-carousel-active,
  .cq-carousel-banner-switch a:hover {
    background-position: -25px 0;
  }

  .cq-carousel-banner-switch li {
    background: none !important;
    display: inline-block;
    list-style: none;
    float: left;
  }

  @media (min-width: 768px) {
    .bx-parl {
      background-image: url(../../../content/dam/canada/bck-srh.jpg);
      background-repeat: no-repeat;
      background-position: center;
      min-height: 350px;
      padding-top: 80px;
    }
    .bx-srch {
      background-image: url(../../../content/dam/canada/bck-opa.png);
      color: #fff;
    }
    .bx-srch a {
      color: #fff;
    }

    .bx-parl .bx-srch .row a {
      color: #fff;
    }

    .bx-parl .bx-srch .row a:focus,
    .bx-parl .bx-srch .row a:hover {
      background-color: #fff;
      color: #000;
    }
  }

  @media (min-width: 992px) {
    .bx-parl {
      min-height: 475px;
      padding-top: 160px;
    }
  }

  @media (min-width: 1200px) {
    .bx-parl {
      min-height: 600px;
      padding-top: 220px;
    }
  }

  .pagination .active a,
  .pagination .active span,
  .pagination .active a:hover,
  .pagination .active span:hover,
  .pagination .active a:focus,
  .pagination .active span:focus {
    background-color: #335075;
    border-color: #335075;
  }

  .panel-info .panel-heading {
    background-color: #335075;
    border-color: #335075;
    color: #fff;
  }

  .panel-info {
    border-color: #335075;
  }

  .nav .nav {
    padding-left: 40px;
  }

  .nav li a:focus,
  .nav li a:hover {
    background-color: #fff;
  }

  .result h2 {
    color: #4f4f4f;
  }

  .result span {
    color: #006621;
  }

  .result p {
    margin: 0;
  }

  #cse-search-box {
    margin: 20px 0;
  }

  fieldset .h3 {
    border: none;
  }

  #gcwb_prts li {
    margin-bottom: 5px !important;
  }

  .srch-fltr .panel {
    margin-bottom: 0;
  }

  .srch-fltr .panel a:visited {
    color: #284162;
  }

  .srch-fltr .panel a:hover,
  .srch-fltr .panel a:focus {
    color: #0535d2;
  }
  .srch-fltr .panel .badge {
    color: #fff;
  }
  .no-details details[open] > summary:before,
  .no-details[dir="rtl"] details[open] > summary:before {
    content: "\25BC\a0";
  }
  .no-details details > summary:before {
    content: "\25BA\a0";
    font-size: 84%;
  }
  .no-details details[open] {
    display: block;
  }
  .no-details[dir="rtl"] details > summary:before {
    content: "\25C4\a0";
  }
  @media (min-width: 768px) {
    .bx-parl {
      background-image: url(../../../content/dam/canada/bck-srh.jpg);
      background-repeat: no-repeat;
      background-position: center;
      min-height: 350px;
      padding-top: 80px;
    }
    .bx-srch {
      background-image: url(../../../content/dam/canada/bck-opa.png);
      color: #fff;
    }
    .bx-srch a {
      color: #fff;
    }

    .bx-parl .bx-srch .row a {
      color: #fff;
    }

    .bx-parl .bx-srch .row a:focus,
    .bx-parl .bx-srch .row a:hover {
      background-color: #fff;
      color: #000;
    }
  }

  @media (min-width: 992px) {
    .bx-parl {
      min-height: 475px;
      padding-top: 160px;
    }
  }

  @media (min-width: 1200px) {
    .bx-parl {
      min-height: 600px;
      padding-top: 220px;
    }
  }

  .pagination .active a,
  .pagination .active span,
  .pagination .active a:hover,
  .pagination .active span:hover,
  .pagination .active a:focus,
  .pagination .active span:focus {
    background-color: #335075;
    border-color: #335075;
  }

  .panel-info .panel-heading {
    background-color: #335075;
    border-color: #335075;
    color: #fff;
  }

  .panel-info {
    border-color: #335075;
  }

  .nav .nav {
    padding-left: 40px;
  }

  .nav li a:focus,
  .nav li a:hover {
    background-color: #fff;
  }

  .result h2 {
    color: #4f4f4f;
  }

  .result span {
    color: #006621;
  }

  .result p {
    margin: 0;
  }

  #cse-search-box {
    margin: 20px 0;
  }

  fieldset .h3 {
    border: none;
  }

  #gcwb_prts li {
    margin-bottom: 5px !important;
  }

  .srch-fltr .panel {
    margin-bottom: 0;
  }

  .srch-fltr .panel a:visited {
    color: #284162;
  }

  .srch-fltr .panel a:hover,
  .srch-fltr .panel a:focus {
    color: #0535d2;
  }
  .srch-fltr .panel .badge {
    color: #fff;
  }
  .no-details details[open] > summary:before,
  .no-details[dir="rtl"] details[open] > summary:before {
    content: "\25BC\a0";
  }
  .no-details details > summary:before {
    content: "\25BA\a0";
    font-size: 84%;
  }
  .no-details details[open] {
    display: block;
  }
  .no-details[dir="rtl"] details > summary:before {
    content: "\25C4\a0";
  }
  @media (min-width: 768px) {
    .bx-parl {
      background-image: url(../../../content/dam/canada/bck-srh.jpg);
      background-repeat: no-repeat;
      background-position: center;
      min-height: 350px;
      padding-top: 80px;
    }
    .bx-srch {
      background-image: url(../../../content/dam/canada/bck-opa.png);
      color: #fff;
    }
    .bx-srch a {
      color: #fff;
    }

    .bx-parl .bx-srch .row a {
      color: #fff;
    }

    .bx-parl .bx-srch .row a:focus,
    .bx-parl .bx-srch .row a:hover {
      background-color: #fff;
      color: #000;
    }
  }

  @media (min-width: 992px) {
    .bx-parl {
      min-height: 475px;
      padding-top: 160px;
    }
  }

  @media (min-width: 1200px) {
    .bx-parl {
      min-height: 600px;
      padding-top: 220px;
    }
  }

  .pagination .active a,
  .pagination .active span,
  .pagination .active a:hover,
  .pagination .active span:hover,
  .pagination .active a:focus,
  .pagination .active span:focus {
    background-color: #335075;
    border-color: #335075;
  }

  .panel-info .panel-heading {
    background-color: #335075;
    border-color: #335075;
    color: #fff;
  }

  .panel-info {
    border-color: #335075;
  }

  .nav .nav {
    padding-left: 40px;
  }

  .nav li a:focus,
  .nav li a:hover {
    background-color: #fff;
  }

  .result h2 {
    color: #4f4f4f;
  }

  .result span {
    color: #006621;
  }

  .result p {
    margin: 0;
  }

  #cse-search-box {
    margin: 20px 0;
  }

  fieldset .h3 {
    border: none;
  }

  #gcwb_prts li {
    margin-bottom: 5px !important;
  }

  .srch-fltr .panel {
    margin-bottom: 0;
  }

  .srch-fltr .panel a:visited {
    color: #284162;
  }

  .srch-fltr .panel a:hover,
  .srch-fltr .panel a:focus {
    color: #0535d2;
  }
  .srch-fltr .panel .badge {
    color: #fff;
  }
  .no-details details[open] > summary:before,
  .no-details[dir="rtl"] details[open] > summary:before {
    content: "\25BC\a0";
  }
  .no-details details > summary:before {
    content: "\25BA\a0";
    font-size: 84%;
  }
  .no-details details[open] {
    display: block;
  }
  .no-details[dir="rtl"] details > summary:before {
    content: "\25C4\a0";
  }
`;

export default styles;
