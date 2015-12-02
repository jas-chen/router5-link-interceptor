/**
 * Code based on page.js
 * https://github.com/visionmedia/page.js
 */

'use strict';

module.exports = function(router, opts, cb) {
  var clickEvent = document.ontouchstart ? 'touchstart' : 'click';

  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  function getParams(href) {
    var params = {};
    var splitHref = href.split('?');

    if (splitHref[1]) {
      splitHref[1].split('&')
        .forEach(function(param) {
          var i = param.indexOf('=');

          if (i === -1) {
            params[window.decodeURIComponent(param)] = '';
            return;
          }

          var name = window.decodeURIComponent(param.substr(0, i));
          var value = window.decodeURIComponent(param.substr(i + 1));
          params[name] = value
        });
    }

    return params;
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
      var params = getParams(el.href);

      var finalOpts;
      if (typeof opts === 'function') {
        finalOpts = opts(name, params);
      } else {
        finalOpts = opts;
      }

      router.navigate(name, params, finalOpts, cb);
    }
  }

  document.addEventListener(clickEvent, onclick, false);

  return function stop() {
    document.removeEventListener(clickEvent, onclick, false);
  }
};
