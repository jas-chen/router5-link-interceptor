/**
 * Code based on page.js
 * https://github.com/visionmedia/page.js
 */

'use strict';

module.exports = function(opts, cb) {
  return function(router) {
    var clickEvent = document.ontouchstart ? 'touchstart' : 'click';
    var clickHandler = onClick(router, opts, cb);

    return {
      name: 'LINK_INTERCEPTOR',
      onStart: function() {
        document.addEventListener(clickEvent, clickHandler, false);
      },
      onStop: function() {
        document.removeEventListener(clickEvent, clickHandler);
      }
    };
  };
};

function merge(object, other) {
  var merged = {};
  Object.keys(object || []).forEach(function (key) {
    merged[key] = object[key];
  });
  Object.keys(other || []).forEach(function (key) {
    merged[key] = other[key];
  });

  return merged;
}

function onClick(router, opts, cb) {
  function which(e) {
    e = e || window.event;
    return null === e.which ? e.button : e.which;
  }

  function getParams(href) {
    var params = {};
    var splitHref = href.split('?');

    if (splitHref[1] && splitHref[1].length) {
      splitHref[1].split('&')
        .forEach(function(param) {
          var i = param.indexOf('=');

          if (i === -1 || i === param.length - 1) {
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

  return function onclick(e) {
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

    if (!el.href) return;

    var toRouteState = router.matchUrl(el.href);
    if (toRouteState) {
      e.preventDefault();
      var name = toRouteState.name;
      var params = merge(getParams(el.href), toRouteState.params);

      var finalOpts;
      if (typeof opts === 'function') {
        finalOpts = opts(name, params);
      } else {
        finalOpts = opts;
      }

      router.navigate(name, params, finalOpts, cb);
    }
  }
};
