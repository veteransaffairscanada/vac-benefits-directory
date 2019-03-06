let detailsPolyfill = () => {
  var DETAILS = "details";
  var SUMMARY = "summary";

  var supported = checkSupport();
  if (supported) return;

  // Add a classname
  document.documentElement.className += " no-details";

  window.addEventListener("click", clickHandler);

  injectStyle(
    "details-polyfill-style",
    "html.no-details " +
      DETAILS +
      ":not([open]) > :not(" +
      SUMMARY +
      ") { display: none; }\n" +
      "html.no-details " +
      DETAILS +
      " > " +
      SUMMARY +
      ":before { display: inline-block; font-size: .8em; width: 1.5em; }\n" +
      "html.no-details " +
      DETAILS +
      "[open] > " +
      SUMMARY
  );

  /*
   * Click handler for `<summary>` tags
   */

  function clickHandler(e) {
    if (e.target.nodeName.toLowerCase() === "summary") {
      var details = e.target.parentNode;
      if (!details) return;

      if (details.getAttribute("open")) {
        details.open = false;
        details.removeAttribute("open");
      } else {
        details.open = true;
        details.setAttribute("open", "open");
      }
    }
    if (e.target.parentNode.nodeName.toLowerCase() === "summary") {
      var details2 = e.target.parentNode.parentNode;
      if (!details2) return;

      if (details2.getAttribute("open")) {
        details2.open = false;
        details2.removeAttribute("open");
      } else {
        details2.open = true;
        details2.setAttribute("open", "open");
      }
    }
    if (e.target.parentNode.parentNode.nodeName.toLowerCase() === "summary") {
      var details3 = e.target.parentNode.parentNode.parentNode;
      if (!details3) return;

      if (details3.getAttribute("open")) {
        details3.open = false;
        details3.removeAttribute("open");
      } else {
        details3.open = true;
        details3.setAttribute("open", "open");
      }
    }
    if (
      e.target.parentNode.parentNode.parentNode.nodeName.toLowerCase() ===
      "summary"
    ) {
      var details4 = e.target.parentNode.parentNode.parentNode.parentNode;
      if (!details4) return;

      if (details4.getAttribute("open")) {
        details4.open = false;
        details4.removeAttribute("open");
      } else {
        details4.open = true;
        details4.setAttribute("open", "open");
      }
    }
  }

  /*
   * Checks for support for `<details>`
   */

  function checkSupport() {
    var el = document.createElement(DETAILS);
    if (!("open" in el)) return false;

    el.innerHTML = "<" + SUMMARY + ">a</" + SUMMARY + ">b";
    document.body.appendChild(el);

    var diff = el.offsetHeight;
    el.open = true;
    var result = diff != el.offsetHeight;

    document.body.removeChild(el);
    return result;
  }

  /*
   * Injects styles (idempotent)
   */

  function injectStyle(id, style) {
    if (document.getElementById(id)) return;

    var el = document.createElement("style");
    el.id = id;
    el.innerHTML = style;

    document.getElementsByTagName("head")[0].appendChild(el);
  }
};

export default detailsPolyfill;
