/**
 * Code based on page.js
 * https://github.com/visionmedia/page.js
 */

'use strict';

function getParams(href) {
  var params = {};
  var splitHref = href.split('?');

  if (splitHref[1]) {
    splitHref[1].split('&')
      .forEach(function(param) {
        var sp = param.split('=');
        var name = sp[0];
        sp.shift();
        params[name] = window.decodeURIComponent(sp.length === 1? sp[0]: sp.join('='));
      });
  }

  return params;
}

module.exports = function(router, cb) {
  var clickEvent = document.ontouchstart ? 'touchstart' : 'click';

  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  function onclick(e) {
    if (1 !== which(e)) return;

    if (e.metaKey || e.ctrlKey || e.shiftKey) return;
    if (e.defaultPrevented) return;


    // ensure link
    var el = e.target;
    while (el && 'A' !== el.nodeName) el = el.parentNode;
    if (!el || 'A' !== el.nodeName) return;


    // Ignore if tag has
    // 1. "download" attribute
    // 2. rel="external" attribute
    if (el.hasAttribute('download') || el.getAttribute('rel') === 'external') return;


    // check target
    if (el.target) return;


    var toRouteState = router.matchUrl(el.href);
    if (toRouteState) {
      e.preventDefault();
      var name = toRouteState.name;
      router.navigate(name, getParams(el.href), {}, cb);
    }
  }

  document.addEventListener(clickEvent, onclick, false);
};
