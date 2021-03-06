/**
 * Framework7 1.6.4 - Custom Build
 * Full featured mobile HTML framework for building iOS & Android apps
 * 
 * 
 * Included modules: modals,forms,fast-clicks
 * 
 * http://framework7.io/
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: June 21, 2017
 */
window.Dom7 = (function () {
'use strict';

var Dom7 = function Dom7(arr) {
  var self = this;
  // Create array-like object
  for (var i = 0; i < arr.length; i += 1) {
    self[i] = arr[i];
  }
  self.length = arr.length;
  // Return collection with methods
  return this;
};

function $(selector, context) {
  var arr = [];
  var i = 0;
  if (selector && !context) {
    if (selector instanceof Dom7) {
      return selector;
    }
  }
  if (selector) {
      // String
    if (typeof selector === 'string') {
      var els;
      var tempParent;
      var html = selector.trim();
      if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
        var toCreate = 'div';
        if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
        if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
        if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
        if (html.indexOf('<option') === 0) { toCreate = 'select'; }
        tempParent = document.createElement(toCreate);
        tempParent.innerHTML = html;
        for (i = 0; i < tempParent.childNodes.length; i += 1) {
          arr.push(tempParent.childNodes[i]);
        }
      } else {
        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
          // Pure ID selector
          els = [document.getElementById(selector.trim().split('#')[1])];
        } else {
          // Other selectors
          els = (context || document).querySelectorAll(selector.trim());
        }
        for (i = 0; i < els.length; i += 1) {
          if (els[i]) { arr.push(els[i]); }
        }
      }
    } else if (selector.nodeType || selector === window || selector === document) {
      // Node/element
      arr.push(selector);
    } else if (selector.length > 0 && selector[0].nodeType) {
      // Array of elements or instance of Dom
      for (i = 0; i < selector.length; i += 1) {
        arr.push(selector[i]);
      }
    }
  }
  return new Dom7(arr);
}

// Remove Diacritics
var defaultDiacriticsRemovalap = [
  { base: 'A', letters: '\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F' },
  { base: 'AA', letters: '\uA732' },
  { base: 'AE', letters: '\u00C6\u01FC\u01E2' },
  { base: 'AO', letters: '\uA734' },
  { base: 'AU', letters: '\uA736' },
  { base: 'AV', letters: '\uA738\uA73A' },
  { base: 'AY', letters: '\uA73C' },
  { base: 'B', letters: '\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181' },
  { base: 'C', letters: '\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E' },
  { base: 'D', letters: '\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779' },
  { base: 'DZ', letters: '\u01F1\u01C4' },
  { base: 'Dz', letters: '\u01F2\u01C5' },
  { base: 'E', letters: '\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E' },
  { base: 'F', letters: '\u0046\u24BB\uFF26\u1E1E\u0191\uA77B' },
  { base: 'G', letters: '\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E' },
  { base: 'H', letters: '\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D' },
  { base: 'I', letters: '\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197' },
  { base: 'J', letters: '\u004A\u24BF\uFF2A\u0134\u0248' },
  { base: 'K', letters: '\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2' },
  { base: 'L', letters: '\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780' },
  { base: 'LJ', letters: '\u01C7' },
  { base: 'Lj', letters: '\u01C8' },
  { base: 'M', letters: '\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C' },
  { base: 'N', letters: '\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4' },
  { base: 'NJ', letters: '\u01CA' },
  { base: 'Nj', letters: '\u01CB' },
  { base: 'O', letters: '\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C' },
  { base: 'OI', letters: '\u01A2' },
  { base: 'OO', letters: '\uA74E' },
  { base: 'OU', letters: '\u0222' },
  { base: 'OE', letters: '\u008C\u0152' },
  { base: 'oe', letters: '\u009C\u0153' },
  { base: 'P', letters: '\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754' },
  { base: 'Q', letters: '\u0051\u24C6\uFF31\uA756\uA758\u024A' },
  { base: 'R', letters: '\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782' },
  { base: 'S', letters: '\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784' },
  { base: 'T', letters: '\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786' },
  { base: 'TZ', letters: '\uA728' },
  { base: 'U', letters: '\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244' },
  { base: 'V', letters: '\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245' },
  { base: 'VY', letters: '\uA760' },
  { base: 'W', letters: '\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72' },
  { base: 'X', letters: '\u0058\u24CD\uFF38\u1E8A\u1E8C' },
  { base: 'Y', letters: '\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE' },
  { base: 'Z', letters: '\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762' },
  { base: 'a', letters: '\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250' },
  { base: 'aa', letters: '\uA733' },
  { base: 'ae', letters: '\u00E6\u01FD\u01E3' },
  { base: 'ao', letters: '\uA735' },
  { base: 'au', letters: '\uA737' },
  { base: 'av', letters: '\uA739\uA73B' },
  { base: 'ay', letters: '\uA73D' },
  { base: 'b', letters: '\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253' },
  { base: 'c', letters: '\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184' },
  { base: 'd', letters: '\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A' },
  { base: 'dz', letters: '\u01F3\u01C6' },
  { base: 'e', letters: '\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD' },
  { base: 'f', letters: '\u0066\u24D5\uFF46\u1E1F\u0192\uA77C' },
  { base: 'g', letters: '\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F' },
  { base: 'h', letters: '\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265' },
  { base: 'hv', letters: '\u0195' },
  { base: 'i', letters: '\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131' },
  { base: 'j', letters: '\u006A\u24D9\uFF4A\u0135\u01F0\u0249' },
  { base: 'k', letters: '\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3' },
  { base: 'l', letters: '\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747' },
  { base: 'lj', letters: '\u01C9' },
  { base: 'm', letters: '\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F' },
  { base: 'n', letters: '\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5' },
  { base: 'nj', letters: '\u01CC' },
  { base: 'o', letters: '\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275' },
  { base: 'oi', letters: '\u01A3' },
  { base: 'ou', letters: '\u0223' },
  { base: 'oo', letters: '\uA74F' },
  { base: 'p', letters: '\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755' },
  { base: 'q', letters: '\u0071\u24E0\uFF51\u024B\uA757\uA759' },
  { base: 'r', letters: '\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783' },
  { base: 's', letters: '\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B' },
  { base: 't', letters: '\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787' },
  { base: 'tz', letters: '\uA729' },
  { base: 'u', letters: '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289' },
  { base: 'v', letters: '\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C' },
  { base: 'vy', letters: '\uA761' },
  { base: 'w', letters: '\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73' },
  { base: 'x', letters: '\u0078\u24E7\uFF58\u1E8B\u1E8D' },
  { base: 'y', letters: '\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF' },
  { base: 'z', letters: '\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763' } ];

var diacriticsMap = {};
for (var i = 0; i < defaultDiacriticsRemovalap.length; i += 1) {
  var letters = defaultDiacriticsRemovalap[i].letters;
  for (var j = 0; j < letters.length; j += 1) {
    diacriticsMap[letters[j]] = defaultDiacriticsRemovalap[i].base;
  }
}

var Utils = {
  parseUrlQuery: function parseUrlQuery(url) {
    var query = {};
    var urlToParse = url || window.location.href;
    var i;
    var params;
    var param;
    var length;
    if (typeof urlToParse === 'string' && urlToParse.length) {
      urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
      params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
      length = params.length;

      for (i = 0; i < length; i += 1) {
        param = params[i].replace(/#\S+/g, '').split('=');
        query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
      }
    }
    return query;
  },
  isArray: function isArray(arr) {
    return Array.isArray(arr);
  },
  each: function each(obj, callback) {
      // Check it's iterable
      // TODO: Should probably raise a value error here
    if (typeof obj !== 'object') { return; }
    // Don't bother continuing without a callback
    if (!callback) { return; }
    if (Array.isArray(obj) || obj instanceof Dom7) {
      // Array
      for (var i = 0; i < obj.length; i++) {
        // If callback returns false
        if (callback(i, obj[i]) === false) {
          // Break out of the loop
          return;
        }
      }
    } else {
      // Object
      for (var prop in obj) {
        // Check the propertie belongs to the object
        // not it's prototype
        if (obj.hasOwnProperty(prop)) {
          // If the callback returns false
          if (callback(prop, obj[prop]) === false) {
            // Break out of the loop;
            return;
          }
        }
      }
    }
  },
  unique: function unique(arr) {
    var uniqueArray = [];
    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
    }
    return uniqueArray;
  },
  serializeObject: function serializeObject(obj, parents) {
    if ( parents === void 0 ) parents = [];

    if (typeof obj === 'string') { return obj; }
    var resultArray = [];
    var separator = '&';
    var newParents;
    function varName(name) {
      if (parents.length > 0) {
        var parentParts = '';
        for (var j = 0; j < parents.length; j += 1) {
          if (j === 0) { parentParts += parents[j]; }
          else { parentParts += "[" + (encodeURIComponent(parents[j])) + "]"; }
        }
        return (parentParts + "[" + (encodeURIComponent(name)) + "]");
      }
      return encodeURIComponent(name);
    }
    function varValue(value) {
      return encodeURIComponent(value);
    }
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        var toPush = (void 0);
        if (Array.isArray(obj[prop])) {
          toPush = [];
          for (var i = 0; i < obj[prop].length; i += 1) {
            if (!Array.isArray(obj[prop][i]) && typeof obj[prop][i] === 'object') {
              newParents = parents.slice();
              newParents.push(prop);
              newParents.push(String(i));
              toPush.push(Utils.serializeObject(obj[prop][i], newParents));
            } else {
              toPush.push(((varName(prop)) + "[]=" + (varValue(obj[prop][i]))));
            }
          }
          if (toPush.length > 0) { resultArray.push(toPush.join(separator)); }
        } else if (obj[prop] === null || obj[prop] === '') {
          resultArray.push(((varName(prop)) + "="));
        } else if (typeof obj[prop] === 'object') {
          // Object, convert to named array
          newParents = parents.slice();
          newParents.push(prop);
          toPush = Utils.serializeObject(obj[prop], newParents);
          if (toPush !== '') { resultArray.push(toPush); }
        } else if (typeof obj[prop] !== 'undefined' && obj[prop] !== '') {
          // Should be string or plain value
          resultArray.push(((varName(prop)) + "=" + (varValue(obj[prop]))));
        } else if (obj[prop] === '') { resultArray.push(varName(prop)); }
      }
    }
    return resultArray.join(separator);
  },
  toCamelCase: function toCamelCase(string) {
    return string.toLowerCase().replace(/-(.)/g, function (match, group1) { return group1.toUpperCase(); });
  },
  dataset: function dataset(el) {
    return $(el).dataset();
  },
  getTranslate: function getTranslate(el, axis) {
    if ( axis === void 0 ) axis = 'x';

    var curStyle = window.getComputedStyle(el, null);
    var matrix;
    var curTransform;
    var transformMatrix;

    if (window.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(',').length > 6) {
        curTransform = curTransform.split(', ').map(function map(a) {
          return a.replace(',', '.');
        }).join(', ');
      }
      // Some old versions of Webkit choke when 'none' is passed; pass
      // empty string instead in this case
      transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
    } else {
      transformMatrix = curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
      matrix = transformMatrix.toString().split(',');
    }

    if (axis === 'x') {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[4]); }
    }
    if (axis === 'y') {
      // Latest Chrome and webkits Fix
      if (window.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
      // Crazy IE10 Matrix
      else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
      // Normal Browsers
      else { curTransform = parseFloat(matrix[5]); }
    }

    return curTransform || 0;
  },
  requestAnimationFrame: function requestAnimationFrame(callback) {
    if (window.requestAnimationFrame) { return window.requestAnimationFrame(callback); }
    else if (window.webkitRequestAnimationFrame) { return window.webkitRequestAnimationFrame(callback); }
    return window.setTimeout(callback, 1000 / 60);
  },
  cancelAnimationFrame: function cancelAnimationFrame(id) {
    if (window.cancelAnimationFrame) { return window.cancelAnimationFrame(id); }
    else if (window.webkitCancelAnimationFrame) { return window.webkitCancelAnimationFrame(id); }
    return window.clearTimeout(id);
  },
  supportTouch: !!(('ontouchstart' in window) || (window.DocumentTouch && document instanceof window.DocumentTouch)),
  removeDiacritics: function removeDiacritics(str) {
    return str.replace(/[^\u0000-\u007E]/g, function (a) { return diacriticsMap[a] || a; });
  },
  extend: function extend() {
    var args = [], len$1 = arguments.length;
    while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

    var to = Object(args[0]);
    for (var i = 1; i < args.length; i += 1) {
      var nextSource = args[i];
      if (nextSource !== undefined && nextSource !== null) {
        var keysArray = Object.keys(Object(nextSource));
        for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          var nextKey = keysArray[nextIndex];
          var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== undefined && desc.enumerable) {
            if (typeof to[nextKey] === 'object' && typeof nextSource[nextKey] === 'object') {
              Utils.extend(to[nextKey], nextSource[nextKey]);
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  },
};

// Aliases
Utils.parseQuery = Utils.parseUrlQuery;
Utils.param = Utils.serializeObject;

// Global Ajax Setup
var globalAjaxOptions = {};
$.ajaxSetup = function ajaxSetup(options) {
  if (options.type && !options.method) { options.method = options.type; }
  Utils.each(options, function (optionName, optionValue) {
    globalAjaxOptions[optionName] = optionValue;
  });
};

// JSONP Requests
var jsonpRequests = 0;

// Ajax
function ajax(options) {
  var defaults = {
    method: 'GET',
    data: false,
    async: true,
    cache: true,
    user: '',
    password: '',
    headers: {},
    xhrFields: {},
    statusCode: {},
    processData: true,
    dataType: 'text',
    contentType: 'application/x-www-form-urlencoded',
    timeout: 0,
  };
  var callbacks = ['beforeSend', 'error', 'complete', 'success', 'statusCode'];

  // For jQuery guys
  if (options.type) { options.method = options.type; }

  // Global options
  var globals = globalAjaxOptions;

  // Merge global and defaults
  Utils.each(globals, function (globalOptionName, globalOptionValue) {
    if (callbacks.indexOf(globalOptionName) < 0) { defaults[globalOptionName] = globalOptionValue; }
  });

  // Function to run XHR callbacks and events
  function fireAjaxCallback(eventName, eventData, callbackName) {
    var a = arguments;
    if (eventName) { $(document).trigger(eventName, eventData); }
    if (callbackName) {
      // Global callback
      if (callbackName in globals) { globals[callbackName](a[3], a[4], a[5], a[6]); }
      // Options callback
      if (options[callbackName]) { options[callbackName](a[3], a[4], a[5], a[6]); }
    }
  }

  // Merge options and defaults
  Utils.each(defaults, function (prop, defaultValue) {
    if (!(prop in options)) { options[prop] = defaultValue; }
  });

  // Default URL
  if (!options.url) {
    options.url = window.location.toString();
  }
  // Parameters Prefix
  var paramsPrefix = options.url.indexOf('?') >= 0 ? '&' : '?';

  // UC method
  var method = options.method.toUpperCase();

  // Data to modify GET URL
  if ((method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') && options.data) {
    var stringData;
    if (typeof options.data === 'string') {
      // Should be key=value string
      if (options.data.indexOf('?') >= 0) { stringData = options.data.split('?')[1]; }
      else { stringData = options.data; }
    } else {
      // Should be key=value object
      stringData = Utils.serializeObject(options.data);
    }
    if (stringData.length) {
      options.url += paramsPrefix + stringData;
      if (paramsPrefix === '?') { paramsPrefix = '&'; }
    }
  }
  // JSONP
  if (options.dataType === 'json' && options.url.indexOf('callback=') >= 0) {
    var callbackName = "f7jsonp_" + (Date.now() + ((jsonpRequests += 1)));
    var abortTimeout;
    var callbackSplit = options.url.split('callback=');
    var requestUrl = (callbackSplit[0]) + "callback=" + callbackName;
    if (callbackSplit[1].indexOf('&') >= 0) {
      var addVars = callbackSplit[1].split('&').filter(function (el) { return el.indexOf('=') > 0; }).join('&');
      if (addVars.length > 0) { requestUrl += "&" + addVars; }
    }

    // Create script
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.onerror = function onerror() {
      clearTimeout(abortTimeout);
      fireAjaxCallback(undefined, undefined, 'error', null, 'scripterror');
      fireAjaxCallback('ajaxComplete ajax:complete', { scripterror: true }, 'complete', null, 'scripterror');
    };
    script.src = requestUrl;

    // Handler
    window[callbackName] = function jsonpCallback(data) {
      clearTimeout(abortTimeout);
      fireAjaxCallback(undefined, undefined, 'success', data);
      script.parentNode.removeChild(script);
      script = null;
      delete window[callbackName];
    };
    document.querySelector('head').appendChild(script);

    if (options.timeout > 0) {
      abortTimeout = setTimeout(function () {
        script.parentNode.removeChild(script);
        script = null;
        fireAjaxCallback(undefined, undefined, 'error', null, 'timeout');
      }, options.timeout);
    }

    return;
  }

  // Cache for GET/HEAD requests
  if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS' || method === 'DELETE') {
    if (options.cache === false) {
      options.url += paramsPrefix + "_nocache" + (Date.now());
    }
  }

  // Create XHR
  var xhr = new XMLHttpRequest();

  // Save Request URL
  xhr.requestUrl = options.url;
  xhr.requestParameters = options;

  // Open XHR
  xhr.open(method, options.url, options.async, options.user, options.password);

  // Create POST Data
  var postData = null;

  if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && options.data) {
    if (options.processData) {
      var postDataInstances = [ArrayBuffer, Blob, Document, FormData];
      // Post Data
      if (postDataInstances.indexOf(options.data.constructor) >= 0) {
        postData = options.data;
      } else {
        // POST Headers
        var boundary = "---------------------------" + (Date.now().toString(16));

        if (options.contentType === 'multipart\/form-data') {
          xhr.setRequestHeader('Content-Type', ("multipart/form-data; boundary=" + boundary));
        } else {
          xhr.setRequestHeader('Content-Type', options.contentType);
        }
        postData = '';
        var data = Utils.serializeObject(options.data);
        if (options.contentType === 'multipart\/form-data') {
          boundary = "---------------------------" + (Date.now().toString(16));
          data = data.split('&');
          var newData = [];
          for (var i = 0; i < data.length; i += 1) {
            newData.push('Content-Disposition: form-data; name="' + _data[i].split('=')[0] + '"\r\n\r\n' + _data[i].split('=')[1] + '\r\n');
          }
          postData = "--" + boundary + "\r\n" + (newData.join(("--" + boundary + "\r\n"))) + "--" + boundary + "--\r\n";
        } else {
          postData = data;
        }
      }
    } else {
      postData = options.data;
    }
  }

  // Additional headers
  if (options.headers) {
    Utils.each(options.headers, function (headerName, headerCallback) {
      xhr.setRequestHeader(headerName, headerCallback);
    });
  }

  // Check for crossDomain
  if (typeof options.crossDomain === 'undefined') {
    options.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== window.location.host;
  }

  if (!options.crossDomain) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  }

  if (options.xhrFields) {
    Utils.each(options.xhrFields, function (fieldName, fieldValue) {
      xhr[fieldName] = fieldValue;
    });
  }

  var xhrTimeout;
  // Handle XHR
  xhr.onload = function onload(e) {
    if (xhrTimeout) { clearTimeout(xhrTimeout); }
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
      var responseData;
      if (options.dataType === 'json') {
        try {
          responseData = JSON.parse(xhr.responseText);
          fireAjaxCallback('ajaxSuccess ajax:success', { xhr: xhr }, 'success', responseData, xhr.status, xhr);
        } catch (err) {
          fireAjaxCallback('ajaxError ajax:error', { xhr: xhr, parseerror: true }, 'error', xhr, 'parseerror');
        }
      } else {
        responseData = xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : xhr.response;
        fireAjaxCallback('ajaxSuccess ajax:success', { xhr: xhr }, 'success', responseData, xhr.status, xhr);
      }
    } else {
      fireAjaxCallback('ajaxError ajax:error', { xhr: xhr }, 'error', xhr, xhr.status);
    }
    if (options.statusCode) {
      if (globals.statusCode && globals.statusCode[xhr.status]) { globals.statusCode[xhr.status](xhr); }
      if (options.statusCode[xhr.status]) { options.statusCode[xhr.status](xhr); }
    }
    fireAjaxCallback('ajaxComplete ajax:complete', { xhr: xhr }, 'complete', xhr, xhr.status);
  };

  xhr.onerror = function onerror(e) {
    if (xhrTimeout) { clearTimeout(xhrTimeout); }
    fireAjaxCallback('ajaxError ajax:error', { xhr: xhr }, 'error', xhr, xhr.status);
    fireAjaxCallback('ajaxComplete ajax:complete', { xhr: xhr, error: true }, 'complete', xhr, 'error');
  };

  // Ajax start callback
  fireAjaxCallback('ajaxStart ajax:start', { xhr: xhr }, 'start', xhr);
  fireAjaxCallback(undefined, undefined, 'beforeSend', xhr);

  // Timeout
  if (options.timeout > 0) {
    xhr.onabort = function onabort() {
      if (xhrTimeout) { clearTimeout(xhrTimeout); }
    };
    xhrTimeout = setTimeout(function () {
      xhr.abort();
      fireAjaxCallback('ajaxError ajax:error', { xhr: xhr, timeout: true }, 'error', xhr, 'timeout');
      fireAjaxCallback('ajaxComplete ajax:complete', { xhr: xhr, timeout: true }, 'complete', xhr, 'timeout');
    }, options.timeout);
  }

  // Send XHR
  xhr.send(postData);

  // Return XHR object
  return xhr;
}

function ajaxShortcut(method) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var url;
  var data;
  var success;
  var error;
  var dataType;
  if (typeof args[1] === 'function') {
    var assign;
    (assign = args, url = assign[0], success = assign[1], error = assign[2], dataType = assign[3]);
  } else {
    var assign$1;
    (assign$1 = args, url = assign$1[0], data = assign$1[1], success = assign$1[2], error = assign$1[3], dataType = assign$1[4]);
  }
  [success, error].forEach(function (callback) {
    if (typeof callback === 'string') {
      dataType = callback;
      if (callback === success) { success = undefined; }
      else { error = undefined; }
    }
  });
  dataType = dataType || (method === 'getJSON' ? 'json' : undefined);
  return $.ajax({
    url: url,
    method: method === 'post' ? 'POST' : 'GET',
    data: data,
    success: success,
    error: error,
    dataType: dataType,
  });
}

function get() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  args.unshift('get');
  return ajaxShortcut.apply(this, args);
}
function post() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  args.unshift('post');
  return ajaxShortcut.apply(this, args);
}
function getJSON() {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  args.unshift('getJSON');
  return ajaxShortcut.apply(this, args);
}

var Scroll = {
  scrollTo: function scrollTo(left, top, duration, easing, callback) {
    if ( easing === void 0 ) easing = 'swing';

    if (arguments.length === 4 && typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }
    return this.each(function animate() {
      var el = this;
      var currentTop;
      var currentLeft;
      var maxTop;
      var maxLeft;
      var newTop;
      var newLeft;
      var scrollTop;
      var scrollLeft;
      var animateTop = top > 0 || top === 0;
      var animateLeft = left > 0 || left === 0;
      if (typeof easing === 'undefined') {
        easing = 'swing';
      }
      if (animateTop) {
        currentTop = el.scrollTop;
        if (!duration) {
          el.scrollTop = top;
        }
      }
      if (animateLeft) {
        currentLeft = el.scrollLeft;
        if (!duration) {
          el.scrollLeft = left;
        }
      }
      if (!duration) { return; }
      if (animateTop) {
        maxTop = el.scrollHeight - el.offsetHeight;
        newTop = Math.max(Math.min(top, maxTop), 0);
      }
      if (animateLeft) {
        maxLeft = el.scrollWidth - el.offsetWidth;
        newLeft = Math.max(Math.min(left, maxLeft), 0);
      }
      var startTime = null;
      if (animateTop && newTop === currentTop) { animateTop = false; }
      if (animateLeft && newLeft === currentLeft) { animateLeft = false; }
      function render(time) {
        if ( time === void 0 ) time = new Date().getTime();

        if (startTime === null) {
          startTime = time;
        }
        var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
        var easeProgress = easing === 'linear' ? progress : (0.5 - (Math.cos(progress * Math.PI) / 2));
        var done;
        if (animateTop) { scrollTop = currentTop + (easeProgress * (newTop - currentTop)); }
        if (animateLeft) { scrollLeft = currentLeft + (easeProgress * (newLeft - currentLeft)); }
        if (animateTop && newTop > currentTop && scrollTop >= newTop) {
          el.scrollTop = newTop;
          done = true;
        }
        if (animateTop && newTop < currentTop && scrollTop <= newTop) {
          el.scrollTop = newTop;
          done = true;
        }
        if (animateLeft && newLeft > currentLeft && scrollLeft >= newLeft) {
          el.scrollLeft = newLeft;
          done = true;
        }
        if (animateLeft && newLeft < currentLeft && scrollLeft <= newLeft) {
          el.scrollLeft = newLeft;
          done = true;
        }

        if (done) {
          if (callback) { callback(); }
          return;
        }
        if (animateTop) { el.scrollTop = scrollTop; }
        if (animateLeft) { el.scrollLeft = scrollLeft; }
        Utils.requestAnimationFrame(render);
      }
      Utils.requestAnimationFrame(render);
    });
  },
  scrollTop: function scrollTop(top, duration, easing, callback) {
    if (arguments.length === 3 && typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }
    var dom = this;
    if (typeof top === 'undefined') {
      if (dom.length > 0) { return dom[0].scrollTop; }
      return null;
    }
    return dom.scrollTo(undefined, top, duration, easing, callback);
  },
  scrollLeft: function scrollLeft(left, duration, easing, callback) {
    if (arguments.length === 3 && typeof easing === 'function') {
      callback = easing;
      easing = undefined;
    }
    var dom = this;
    if (typeof left === 'undefined') {
      if (dom.length > 0) { return dom[0].scrollLeft; }
      return null;
    }
    return dom.scrollTo(left, undefined, duration, easing, callback);
  },
};

var Methods = {
  // Classes and attributes
  addClass: function addClass(className) {
    var this$1 = this;

    if (typeof className === 'undefined') {
      return this;
    }
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.add(classes[i]); }
      }
    }
    return this;
  },
  removeClass: function removeClass(className) {
    var this$1 = this;

    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.remove(classes[i]); }
      }
    }
    return this;
  },
  hasClass: function hasClass(className) {
    if (!this[0]) { return false; }
    return this[0].classList.contains(className);
  },
  toggleClass: function toggleClass(className) {
    var this$1 = this;

    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this$1[j].classList !== 'undefined') { this$1[j].classList.toggle(classes[i]); }
      }
    }
    return this;
  },
  attr: function attr(attrs, value) {
    var arguments$1 = arguments;
    var this$1 = this;

    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) { return this[0].getAttribute(attrs); }
      return undefined;
    }

    // Set attrs
    for (var i = 0; i < this.length; i += 1) {
      if (arguments$1.length === 2) {
        // String
        this$1[i].setAttribute(attrs, value);
      } else {
        // Object
        for (var attrName in attrs) {
          this$1[i][attrName] = attrs[attrName];
          this$1[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this;
  },
  removeAttr: function removeAttr(attr) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].removeAttribute(attr);
    }
    return this;
  },
  prop: function prop(props, value) {
    var arguments$1 = arguments;
    var this$1 = this;

    if (arguments.length === 1 && typeof props === 'string') {
      // Get prop
      if (this[0]) { return this[0][props]; }
    } else {
      // Set props
      for (var i = 0; i < this.length; i += 1) {
        if (arguments$1.length === 2) {
          // String
          this$1[i][props] = value;
        } else {
          // Object
          for (var propName in props) {
            this$1[i][propName] = props[propName];
          }
        }
      }
      return this;
    }
  },
  data: function data(key, value) {
    var this$1 = this;

    var el;
    if (typeof value === 'undefined') {
      el = this[0];
      // Get value
      if (el) {
        if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
          return el.dom7ElementDataStorage[key];
        }

        var dataKey = el.getAttribute(("data-" + key));
        if (dataKey) {
          return dataKey;
        }
        return undefined;
      }
      return undefined;
    }

    // Set value
    for (var i = 0; i < this.length; i += 1) {
      el = this$1[i];
      if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
      el.dom7ElementDataStorage[key] = value;
    }
    return this;
  },
  removeData: function removeData(key) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var el = this$1[i];
      if (el.dom7ElementDataStorage && el.dom7ElementDataStorage[key]) {
        el.dom7ElementDataStorage[key] = null;
        delete el.dom7ElementDataStorage[key];
      }
    }
  },
  dataset: function dataset() {
    var el = this[0];
    if (!el) { return undefined; }
    var dataset = {};
    if (el.dataset) {
      for (var dataKey in el.dataset) {
        dataset[dataKey] = el.dataset[dataKey];
      }
    } else {
      for (var i = 0; i < el.attributes.length; i += 1) {
        var attr = el.attributes[i];
        if (attr.name.indexOf('data-') >= 0) {
          dataset[Utils.toCamelCase(attr.name.split('data-')[1])] = attr.value;
        }
      }
    }
    for (var key in dataset) {
      if (dataset[key] === 'false') { dataset[key] = false; }
      else if (dataset[key] === 'true') { dataset[key] = true; }
      else if (parseFloat(dataset[key]) === dataset[key] * 1) { dataset[key] *= 1; }
    }
    return dataset;
  },
  val: function val(value) {
    var this$1 = this;

    if (typeof value === 'undefined') {
      if (this[0]) {
        if (this[0].multiple && this[0].nodeName.toLowerCase() === 'select') {
          var values = [];
          for (var i = 0; i < this[0].selectedOptions.length; i += 1) {
            values.push(this$1[0].selectedOptions[i].value);
          }
          return values;
        }
        return this[0].value;
      }
      return undefined;
    }

    for (var i$1 = 0; i$1 < this.length; i$1 += 1) {
      this$1[i$1].value = value;
    }
    return this;
  },
  // Transforms
  transform: function transform(transform$1) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this$1[i].style;
      elStyle.webkitTransform = transform$1;
      elStyle.transform = transform$1;
    }
    return this;
  },
  transition: function transition(duration) {
    var this$1 = this;

    if (typeof duration !== 'string') {
      duration = duration + "ms";
    }
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this$1[i].style;
      elStyle.webkitTransitionDuration = duration;
      elStyle.transitionDuration = duration;
    }
    return this;
  },
  // Events
  on: function on() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var eventType = args[0];
    var targetSelector;
    var listener;
    var capture = false;
    if (typeof args[1] === 'function') {
      targetSelector = false;
      listener = args[1];
      capture = args[2];
    } else {
      targetSelector = args[1];
      listener = args[2];
      capture = args[3];
    }
    function handleLiveEvent(e) {
      var target = e.target;
      var eventData = e.target.dom7EventData || [];
      eventData.unshift(e);
      if ($(target).is(targetSelector)) { listener.apply(target, eventData); }
      else {
        var parents = $(target).parents();
        for (var k = 0; k < parents.length; k += 1) {
          if ($(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
        }
      }
    }
    function handleEvent(e) {
      var eventData = e.target.dom7EventData || [];
      eventData.unshift(e);
      listener.apply(this, eventData);
    }
    var events = eventType.split(' ');
    var j;
    for (var i = 0; i < this.length; i += 1) {
      var el = this$1[i];
      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          if (!el.dom7Listeners) { el.dom7Listeners = []; }
          el.dom7Listeners.push({
            type: eventType,
            listener: listener,
            proxyListener: handleEvent,
          });
          el.addEventListener(events[j], handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          if (!el.dom7LiveListeners) { el.dom7LiveListeners = []; }
          el.dom7LiveListeners.push({
            type: eventType,
            listener: listener,
            proxyListener: handleLiveEvent,
          });
          el.addEventListener(events[j], handleLiveEvent, capture);
        }
      }
    }
    return this;
  },
  off: function off() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var eventType = args[0];
    var targetSelector;
    var listener;
    var capture = false;
    if (typeof args[1] === 'function') {
      targetSelector = false;
      listener = args[1];
      capture = args[2];
    } else {
      targetSelector = args[1];
      listener = args[2];
      capture = args[3];
    }
    var events = eventType.split(' ');
    for (var i = 0; i < events.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        var el = this$1[j];
        if (!targetSelector) {
          if (el.dom7Listeners) {
            for (var k = 0; k < el.dom7Listeners.length; k += 1) {
              if (listener) {
                if (el.dom7Listeners[k].listener === listener) {
                  el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
                }
              } else if (el.dom7Listeners[k].type === events[i]) {
                el.removeEventListener(events[i], el.dom7Listeners[k].proxyListener, capture);
              }
            }
          }
        } else if (el.dom7LiveListeners) {
          for (var k$1 = 0; k$1 < el.dom7LiveListeners.length; k$1 += 1) {
            if (listener) {
              if (el.dom7LiveListeners[k$1].listener === listener) {
                el.removeEventListener(events[i], el.dom7LiveListeners[k$1].proxyListener, capture);
              }
            } else if (el.dom7Listeners[k$1].type === events[i]) {
              el.removeEventListener(events[i], el.dom7LiveListeners[k$1].proxyListener, capture);
            }
          }
        }
      }
    }
    return this;
  },
  once: function once(eventName, targetSelector, listener, capture) {
    var dom = this;
    if (typeof targetSelector === 'function') {
      listener = arguments[1];
      capture = arguments[2];
      targetSelector = false;
    }
    function proxy(e) {
      var eventData = e.target.dom7EventData || [];
      listener.apply(this, eventData);
      dom.off(eventName, targetSelector, proxy, capture);
    }
    return dom.on(eventName, targetSelector, proxy, capture);
  },
  trigger: function trigger() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var events = args[0].split(' ');
    var eventData = args[1];
    for (var i = 0; i < events.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        var evt = (void 0);
        try {
          evt = new CustomEvent(events[i], { detail: eventData, bubbles: true, cancelable: true });
        } catch (e) {
          evt = document.createEvent('Event');
          evt.initEvent(events[i], true, true);
          evt.detail = eventData;
        }
        this$1[j].dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
        this$1[j].dispatchEvent(evt);
        this$1[j].dom7EventData = [];
        delete this$1[j].dom7EventData;
      }
    }
    return this;
  },
  transitionEnd: function transitionEnd(callback) {
    var events = ['webkitTransitionEnd', 'transitionend'];
    var dom = this;
    var i;
    function fireCallBack(e) {
      /* jshint validthis:true */
      if (e.target !== this) { return; }
      callback.call(this, e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  },
  animationEnd: function animationEnd(callback) {
    var events = ['webkitAnimationEnd', 'animationend'];
    var dom = this;
    var i;
    function fireCallBack(e) {
      callback(e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  },
  // Sizing/Styles
  width: function width() {
    if (this[0] === window) {
      return window.innerWidth;
    }

    if (this.length > 0) {
      return parseFloat(this.css('width'));
    }

    return null;
  },
  outerWidth: function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        var styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
      }
      return this[0].offsetWidth;
    }
    return null;
  },
  height: function height() {
    if (this[0] === window) {
      return window.innerHeight;
    }

    if (this.length > 0) {
      return parseFloat(this.css('height'));
    }

    return null;
  },
  outerHeight: function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        var styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
      }
      return this[0].offsetHeight;
    }
    return null;
  },
  offset: function offset() {
    if (this.length > 0) {
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = document.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var scrollTop = el === window ? window.scrollY : el.scrollTop;
      var scrollLeft = el === window ? window.scrollX : el.scrollLeft;
      return {
        top: (box.top + scrollTop) - clientTop,
        left: (box.left + scrollLeft) - clientLeft,
      };
    }

    return null;
  },
  hide: function hide() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].style.display = 'none';
    }
    return this;
  },
  show: function show() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].style.display = 'block';
    }
    return this;
  },
  styles: function styles() {
    if (this[0]) { return window.getComputedStyle(this[0], null); }
  },
  css: function css(props, value) {
    var this$1 = this;

    var i;
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) { return window.getComputedStyle(this[0], null).getPropertyValue(props); }
      } else {
        for (i = 0; i < this.length; i += 1) {
          for (var prop in props) {
            this$1[i].style[prop] = props[prop];
          }
        }
        return this;
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this$1[i].style[props] = value;
      }
      return this;
    }
    return this;
  },

  // Dom manipulation
  // Iterate over the collection passing elements to `callback`
  each: function each(callback) {
    var this$1 = this;

    // Don't bother continuing without a callback
    if (!callback) { return this; }
    // Iterate over the current collection
    for (var i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this$1[i], i, this$1[i]) === false) {
        // End the loop early
        return this$1;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  },
  filter: function filter(callback) {
    var matchedItems = [];
    var dom = this;
    for (var i = 0; i < dom.length; i += 1) {
      if (callback.call(dom[i], i, dom[i])) { matchedItems.push(dom[i]); }
    }
    return new Dom7(matchedItems);
  },
  html: function html(html$1) {
    var this$1 = this;

    if (typeof html$1 === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].innerHTML = html$1;
    }
    return this;
  },
  text: function text(text$1) {
    var this$1 = this;

    if (typeof text$1 === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }
      return null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this$1[i].textContent = text$1;
    }
    return this;
  },
  is: function is(selector) {
    var el = this[0];
    var compareWith;
    var i;
    if (!el || typeof selector === 'undefined') { return false; }
    if (typeof selector === 'string') {
      if (el.matches) { return el.matches(selector); }
      else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
      else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

      compareWith = $(selector);
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    } else if (selector === document) { return el === document; }
    else if (selector === window) { return el === window; }

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    }
    return false;
  },
  indexOf: function indexOf(el) {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i] === el) { return i; }
    }
  },
  index: function index() {
    var child = this[0];
    var i;
    if (child) {
      i = 0;
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) { i += 1; }
      }
      return i;
    }
  },
  eq: function eq(index) {
    if (typeof index === 'undefined') { return this; }
    var length = this.length;
    var returnIndex;
    if (index > length - 1) {
      return new Dom7([]);
    }
    if (index < 0) {
      returnIndex = length + index;
      if (returnIndex < 0) { return new Dom7([]); }
      return new Dom7([this[returnIndex]]);
    }
    return new Dom7([this[index]]);
  },
  append: function append() {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var newChild;

    for (var k = 0; k < args.length; k += 1) {
      newChild = args[k];
      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = document.createElement('div');
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this$1[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (var j = 0; j < newChild.length; j += 1) {
            this$1[i].appendChild(newChild[j]);
          }
        } else {
          this$1[i].appendChild(newChild);
        }
      }
    }

    return this;
  },
  appendTo: function appendTo(parent) {
    $(parent).append(this);
    return this;
  },
  prepend: function prepend(newChild) {
    var this$1 = this;

    var i;
    var j;
    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = newChild;
        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this$1[i].insertBefore(tempDiv.childNodes[j], this$1[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this$1[i].insertBefore(newChild[j], this$1[i].childNodes[0]);
        }
      } else {
        this$1[i].insertBefore(newChild, this$1[i].childNodes[0]);
      }
    }
    return this;
  },
  prependTo: function prependTo(parent) {
    $(parent).prepend(this);
    return this;
  },
  insertBefore: function insertBefore(selector) {
    var this$1 = this;

    var before = $(selector);
    for (var i = 0; i < this.length; i += 1) {
      if (before.length === 1) {
        before[0].parentNode.insertBefore(this$1[i], before[0]);
      } else if (before.length > 1) {
        for (var j = 0; j < before.length; j += 1) {
          before[j].parentNode.insertBefore(this$1[i].cloneNode(true), before[j]);
        }
      }
    }
  },
  insertAfter: function insertAfter(selector) {
    var this$1 = this;

    var after = $(selector);
    for (var i = 0; i < this.length; i += 1) {
      if (after.length === 1) {
        after[0].parentNode.insertBefore(this$1[i], after[0].nextSibling);
      } else if (after.length > 1) {
        for (var j = 0; j < after.length; j += 1) {
          after[j].parentNode.insertBefore(this$1[i].cloneNode(true), after[j].nextSibling);
        }
      }
    }
  },
  next: function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) { return new Dom7([this[0].nextElementSibling]); }
        return new Dom7([]);
      }

      if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  },
  nextAll: function nextAll(selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.nextElementSibling) {
      var next = el.nextElementSibling;
      if (selector) {
        if ($(next).is(selector)) { nextEls.push(next); }
      } else { nextEls.push(next); }
      el = next;
    }
    return new Dom7(nextEls);
  },
  prev: function prev(selector) {
    if (this.length > 0) {
      var el = this[0];
      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) { return new Dom7([el.previousElementSibling]); }
        return new Dom7([]);
      }

      if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  },
  prevAll: function prevAll(selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.previousElementSibling) {
      var prev = el.previousElementSibling;
      if (selector) {
        if ($(prev).is(selector)) { prevEls.push(prev); }
      } else { prevEls.push(prev); }
      el = prev;
    }
    return new Dom7(prevEls);
  },
  siblings: function siblings(selector) {
    return this.nextAll(selector).add(this.prevAll(selector));
  },
  parent: function parent(selector) {
    var this$1 = this;

    var parents = [];
    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i].parentNode !== null) {
        if (selector) {
          if ($(this$1[i].parentNode).is(selector)) { parents.push(this$1[i].parentNode); }
        } else {
          parents.push(this$1[i].parentNode);
        }
      }
    }
    return $(Utils.unique(parents));
  },
  parents: function parents(selector) {
    var this$1 = this;

    var parents = [];
    for (var i = 0; i < this.length; i += 1) {
      var parent = this$1[i].parentNode;
      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) { parents.push(parent); }
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return $(Utils.unique(parents));
  },
  closest: function closest(selector) {
    var closest = this;
    if (typeof selector === 'undefined') {
      return new Dom7([]);
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }
    return closest;
  },
  find: function find(selector) {
    var this$1 = this;

    var foundElements = [];
    for (var i = 0; i < this.length; i += 1) {
      var found = this$1[i].querySelectorAll(selector);
      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return new Dom7(foundElements);
  },
  children: function children(selector) {
    var this$1 = this;

    var children = [];
    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this$1[i].childNodes;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) { children.push(childNodes[j]); }
      }
    }
    return new Dom7(Utils.unique(children));
  },
  remove: function remove() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      if (this$1[i].parentNode) { this$1[i].parentNode.removeChild(this$1[i]); }
    }
    return this;
  },
  detach: function detach() {
    return this.remove();
  },
  add: function add() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var dom = this;
    var i;
    var j;
    for (i = 0; i < args.length; i += 1) {
      var toAdd = $(args[i]);
      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }
    return dom;
  },
  empty: function empty() {
    var this$1 = this;

    for (var i = 0; i < this.length; i += 1) {
      var el = this$1[i];
      if (el.nodeType === 1) {
        for (var j = 0; j < el.childNodes.length; j += 1) {
          if (el.childNodes[j].parentNode) {
            el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
          }
        }
        el.textContent = '';
      }
    }
    return this;
  },
};

// Shortcuts
var shortcuts = ('click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll').split(' ');
var notTrigger = ('resize scroll').split(' ');
function createMethod(name) {
  Methods[name] = function eventShortcut(targetSelector, listener, capture) {
    var this$1 = this;

    if (typeof targetSelector === 'undefined') {
      for (var i = 0; i < this.length; i += 1) {
        if (notTrigger.indexOf(name) < 0) {
          if (name in this$1[i]) { this$1[i][name](); }
          else {
            $(this$1[i]).trigger(name);
          }
        }
      }
      return this;
    }
    return this.on(name, targetSelector, listener, capture);
  };
}
for (var i$1 = 0; i$1 < shortcuts.length; i$1 += 1) {
  createMethod(shortcuts[i$1]);
}

function animate(initialProps, initialParams) {
  var els = this;
  var a = {
    props: $.extend({}, initialProps),
    params: $.extend({
      duration: 300,
      easing: 'swing', // or 'linear'
      /* Callbacks
      begin(elements)
      complete(elements)
      progress(elements, complete, remaining, start, tweenValue)
      */
    }, initialParams),

    elements: els,
    animating: false,
    que: [],

    easingProgress: function easingProgress(easing, progress) {
      if (easing === 'swing') {
        return 0.5 - (Math.cos(progress * Math.PI) / 2);
      }
      if (typeof easing === 'function') {
        return easing(progress);
      }
      return progress;
    },
    stop: function stop() {
      if (a.frameId) {
        Utils.cancelAnimationFrame(a.frameId);
      }
      a.animating = false;
      a.elements.each(function (index, el) {
        var element = el;
        delete element.dom7AnimateInstance;
      });
      a.que = [];
    },
    done: function done(complete) {
      a.animating = false;
      a.elements.each(function (index, el) {
        var element = el;
        delete element.dom7AnimateInstance;
      });
      if (complete) { complete(els); }
      if (a.que.length > 0) {
        var que = a.que.shift();
        a.animate(que[0], que[1]);
      }
    },
    animate: function animate(props, params) {
      if (a.animating) {
        a.que.push([props, params]);
        return a;
      }
      var elements = [];

      // Define & Cache Initials & Units
      a.elements.each(function (index, el) {
        var initialFullValue;
        var initialValue;
        var unit;
        var finalValue;
        var finalFullValue;

        if (!el.dom7AnimateInstance) { a.elements[index].dom7AnimateInstance = a; }

        elements[index] = {
          container: el,
        };
        Object.keys(props).forEach(function (prop) {
          initialFullValue = window.getComputedStyle(el, null).getPropertyValue(prop).replace(',', '.');
          initialValue = parseFloat(initialFullValue);
          unit = initialFullValue.replace(initialValue, '');
          finalValue = parseFloat(props[prop]);
          finalFullValue = props[prop] + unit;
          elements[index][prop] = {
            initialFullValue: initialFullValue,
            initialValue: initialValue,
            unit: unit,
            finalValue: finalValue,
            finalFullValue: finalFullValue,
            currentValue: initialValue,
          };
        });
      });

      var startTime = null;
      var time;
      var elementsDone = 0;
      var propsDone = 0;
      var done;
      var began = false;

      a.animating = true;

      function render() {
        time = new Date().getTime();
        var progress;
        var easeProgress;
        // let el;
        if (!began) {
          began = true;
          if (params.begin) { params.begin(els); }
        }
        if (startTime === null) {
          startTime = time;
        }
        if (params.progress) {
          params.progress(els, Math.max(Math.min((time - startTime) / params.duration, 1), 0), ((startTime + params.duration) - time < 0 ? 0 : (startTime + params.duration) - time), startTime);
        }

        elements.forEach(function (element) {
          var el = element;
          if (done || el.done) { return; }
          Object.keys(props).forEach(function (prop) {
            if (done || el.done) { return; }
            progress = Math.max(Math.min((time - startTime) / params.duration, 1), 0);
            easeProgress = a.easingProgress(params.easing, progress);
            var ref = el[prop];
            var initialValue = ref.initialValue;
            var finalValue = ref.finalValue;
            var unit = ref.unit;
            el[prop].currentValue = initialValue + (easeProgress * (finalValue - initialValue));
            var currentValue = el[prop].currentValue;

            if (
              (finalValue > initialValue && currentValue >= finalValue) ||
              (finalValue < initialValue && currentValue <= finalValue)) {
              el.container.style[prop] = finalValue + unit;
              propsDone += 1;
              if (propsDone === Object.keys(props).length) {
                el.done = true;
                elementsDone += 1;
              }
              if (elementsDone === elements.length) {
                done = true;
              }
            }
            if (done) {
              a.done(params.complete);
              return;
            }
            el.container.style[prop] = currentValue + unit;
          });
        });
        if (done) { return; }
        // Then call
        a.frameId = Utils.requestAnimationFrame(render);
      }
      a.frameId = Utils.requestAnimationFrame(render);
      return a;
    },
  };

  if (a.elements.length === 0) {
    return els;
  }

  var animateInstance;
  for (var i = 0; i < a.elements.length; i += 1) {
    if (a.elements[i].dom7AnimateInstance) {
      animateInstance = a.elements[i].dom7AnimateInstance;
    } else { a.elements[i].dom7AnimateInstance = a; }
  }
  if (!animateInstance) {
    animateInstance = a;
  }

  if (initialProps === 'stop') {
    animateInstance.stop();
  } else {
    animateInstance.animate(a.props, a.params);
  }

  return els;
}

function stop() {
  var els = this;
  for (var i = 0; i < els.length; i += 1) {
    if (els[i].dom7AnimateInstance) {
      els[i].dom7AnimateInstance.stop();
    }
  }
}

function dom7() {
  // Utils & Helpers
  Object.keys(Utils).forEach(function (key) {
    $[key] = Utils[key];
  });

  // Methods
  Object.keys(Methods).forEach(function (key) {
    Dom7.prototype[key] = Methods[key];
  });

  // Scroll
  Object.keys(Scroll).forEach(function (key) {
    Dom7.prototype[key] = Scroll[key];
  });

  // Animate
  Dom7.prototype.animate = animate;
  Dom7.prototype.stop = stop;

  // Ajax
  $.ajax = ajax;
  $.get = get;
  $.post = post;
  $.getJSON = getJSON;

  // Link to prototype
  $.fn = Dom7.prototype;

  return $;
}
var dom7$1 = dom7();

return dom7$1;

}());

window.Template7 = (function () {
'use strict';

var template7Context;
if (typeof window !== 'undefined') {
  template7Context = window;
} else if (typeof global !== 'undefined') {
  template7Context = global;
} else {
  template7Context = undefined;
}
function isArray(arr) {
  return Array.isArray ? Array.isArray(arr) : Object.prototype.toString.apply(arr) === '[object Array]';
}
function isFunction(func) {
  return typeof func === 'function';
}
function escape(string) {
  return (typeof template7Context !== 'undefined' && template7Context.escape ? template7Context.escape(string) : string)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}
var quoteSingleRexExp = new RegExp('\'', 'g');
var quoteDoubleRexExp = new RegExp('"', 'g');
function helperToSlices(string) {
  var helperParts = string.replace(/[{}#}]/g, '').split(' ');
  var slices = [];
  var shiftIndex;
  var i;
  var j;
  for (i = 0; i < helperParts.length; i += 1) {
    var part = helperParts[i];
    var blockQuoteRegExp = (void 0);
    var openingQuote = (void 0);
    if (i === 0) { slices.push(part); }
    else if (part.indexOf('"') === 0 || part.indexOf('\'') === 0) {
      blockQuoteRegExp = part.indexOf('"') === 0 ? quoteDoubleRexExp : quoteSingleRexExp;
      openingQuote = part.indexOf('"') === 0 ? '"' : '\'';
      // Plain String
      if (part.match(blockQuoteRegExp).length === 2) {
        // One word string
        slices.push(part);
      } else {
        // Find closed Index
        shiftIndex = 0;
        for (j = i + 1; j < helperParts.length; j += 1) {
          part += " " + (helperParts[j]);
          if (helperParts[j].indexOf(openingQuote) >= 0) {
            shiftIndex = j;
            slices.push(part);
            break;
          }
        }
        if (shiftIndex) { i = shiftIndex; }
      }
    } else if (part.indexOf('=') > 0) {
      // Hash
      var hashParts = part.split('=');
      var hashName = hashParts[0];
      var hashContent = hashParts[1];
      if (!blockQuoteRegExp) {
        blockQuoteRegExp = hashContent.indexOf('"') === 0 ? quoteDoubleRexExp : quoteSingleRexExp;
        openingQuote = hashContent.indexOf('"') === 0 ? '"' : '\'';
      }
      if (hashContent.match(blockQuoteRegExp).length !== 2) {
        shiftIndex = 0;
        for (j = i + 1; j < helperParts.length; j += 1) {
          hashContent += " " + (helperParts[j]);
          if (helperParts[j].indexOf(openingQuote) >= 0) {
            shiftIndex = j;
            break;
          }
        }
        if (shiftIndex) { i = shiftIndex; }
      }
      var hash = [hashName, hashContent.replace(blockQuoteRegExp, '')];
      slices.push(hash);
    } else {
      // Plain variable
      slices.push(part);
    }
  }
  return slices;
}
function stringToBlocks(string) {
  var blocks = [];
  var i;
  var j;
  if (!string) { return []; }
  var stringBlocks = string.split(/({{[^{^}]*}})/);
  for (i = 0; i < stringBlocks.length; i += 1) {
    var block = stringBlocks[i];
    if (block === '') { continue; }
    if (block.indexOf('{{') < 0) {
      blocks.push({
        type: 'plain',
        content: block,
      });
    } else {
      if (block.indexOf('{/') >= 0) {
        continue;
      }
      if (block.indexOf('{#') < 0 && block.indexOf(' ') < 0 && block.indexOf('else') < 0) {
        // Simple variable
        blocks.push({
          type: 'variable',
          contextName: block.replace(/[{}]/g, ''),
        });
        continue;
      }
      // Helpers
      var helperSlices = helperToSlices(block);
      var helperName = helperSlices[0];
      var isPartial = helperName === '>';
      var helperContext = [];
      var helperHash = {};
      for (j = 1; j < helperSlices.length; j += 1) {
        var slice = helperSlices[j];
        if (isArray(slice)) {
          // Hash
          helperHash[slice[0]] = slice[1] === 'false' ? false : slice[1];
        } else {
          helperContext.push(slice);
        }
      }

      if (block.indexOf('{#') >= 0) {
        // Condition/Helper
        var helperContent = '';
        var elseContent = '';
        var toSkip = 0;
        var shiftIndex = (void 0);
        var foundClosed = false;
        var foundElse = false;
        var depth = 0;
        for (j = i + 1; j < stringBlocks.length; j += 1) {
          if (stringBlocks[j].indexOf('{{#') >= 0) {
            depth += 1;
          }
          if (stringBlocks[j].indexOf('{{/') >= 0) {
            depth -= 1;
          }
          if (stringBlocks[j].indexOf(("{{#" + helperName)) >= 0) {
            helperContent += stringBlocks[j];
            if (foundElse) { elseContent += stringBlocks[j]; }
            toSkip += 1;
          } else if (stringBlocks[j].indexOf(("{{/" + helperName)) >= 0) {
            if (toSkip > 0) {
              toSkip -= 1;
              helperContent += stringBlocks[j];
              if (foundElse) { elseContent += stringBlocks[j]; }
            } else {
              shiftIndex = j;
              foundClosed = true;
              break;
            }
          } else if (stringBlocks[j].indexOf('else') >= 0 && depth === 0) {
            foundElse = true;
          } else {
            if (!foundElse) { helperContent += stringBlocks[j]; }
            if (foundElse) { elseContent += stringBlocks[j]; }
          }
        }
        if (foundClosed) {
          if (shiftIndex) { i = shiftIndex; }
          blocks.push({
            type: 'helper',
            helperName: helperName,
            contextName: helperContext,
            content: helperContent,
            inverseContent: elseContent,
            hash: helperHash,
          });
        }
      } else if (block.indexOf(' ') > 0) {
        if (isPartial) {
          helperName = '_partial';
          if (helperContext[0]) { helperContext[0] = "\"" + (helperContext[0].replace(/"|'/g, '')) + "\""; }
        }
        blocks.push({
          type: 'helper',
          helperName: helperName,
          contextName: helperContext,
          hash: helperHash,
        });
      }
    }
  }
  return blocks;
}
var Template7 = function Template7(template) {
  var t = this;
  t.template = template;

  function getCompileVar(name, ctx) {
    var variable = ctx;
    var parts;
    var levelsUp = 0;
    if (name.indexOf('../') === 0) {
      var newDepth = variable.split('_')[1] - levelsUp;
      levelsUp = name.split('../').length - 1;
      variable = "ctx_" + (newDepth >= 1 ? newDepth : 1);
      parts = name.split('../')[levelsUp].split('.');
    } else if (name.indexOf('@global') === 0) {
      variable = 'Template7.global';
      parts = name.split('@global.')[1].split('.');
    } else if (name.indexOf('@root') === 0) {
      variable = 'root';
      parts = name.split('@root.')[1].split('.');
    } else {
      parts = name.split('.');
    }
    for (var i = 0; i < parts.length; i += 1) {
      var part = parts[i];
      if (part.indexOf('@') === 0) {
        if (i > 0) {
          variable += "[(data && data." + (part.replace('@', '')) + ")]";
        } else {
          variable = "(data && data." + (name.replace('@', '')) + ")";
        }
      } else if (isFinite(part)) {
        variable += "[" + part + "]";
      } else if (part === 'this' || part.indexOf('this.') >= 0 || part.indexOf('this[') >= 0 || part.indexOf('this(') >= 0) {
        variable = part.replace('this', ctx);
      } else {
        variable += "." + part;
      }
    }

    return variable;
  }
  function getCompiledArguments(contextArray, ctx) {
    var arr = [];
    for (var i = 0; i < contextArray.length; i += 1) {
      if (/^['"]/.test(contextArray[i])) { arr.push(contextArray[i]); }
      else if (/^(true|false|\d+)$/.test(contextArray[i])) { arr.push(contextArray[i]); }
      else {
        arr.push(getCompileVar(contextArray[i], ctx));
      }
    }

    return arr.join(', ');
  }
  function compile(template, depth) {
    if ( template === void 0 ) template = t.template;
    if ( depth === void 0 ) depth = 1;

    if (typeof template !== 'string') {
      throw new Error('Template7: Template must be a string');
    }
    var blocks = stringToBlocks(template);
    var ctx = "ctx_" + depth;
    if (blocks.length === 0) {
      return function empty() { return ''; };
    }

    function getCompileFn(block, newDepth) {
      if (block.content) { return compile(block.content, newDepth); }
      return function empty() { return ''; };
    }
    function getCompileInverse(block, newDepth) {
      if (block.inverseContent) { return compile(block.inverseContent, newDepth); }
      return function empty() { return ''; };
    }

    var resultString = '';
    if (depth === 1) {
      resultString += "(function (" + ctx + ", data, root) {\n";
    } else {
      resultString += "(function (" + ctx + ", data) {\n";
    }
    if (depth === 1) {
      resultString += 'function isArray(arr){return Object.prototype.toString.apply(arr) === \'[object Array]\';}\n';
      resultString += 'function isFunction(func){return (typeof func === \'function\');}\n';
      resultString += 'function c(val, ctx) {if (typeof val !== "undefined" && val !== null) {if (isFunction(val)) {return val.call(ctx);} else return val;} else return "";}\n';
      resultString += 'root = root || ctx_1 || {};\n';
    }
    resultString += 'var r = \'\';\n';
    var i;
    for (i = 0; i < blocks.length; i += 1) {
      var block = blocks[i];
      // Plain block
      if (block.type === 'plain') {
        resultString += "r +='" + ((block.content).replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/'/g, '\\' + '\'')) + "';";
        continue;
      }
      var variable = (void 0);
      var compiledArguments = (void 0);
      // Variable block
      if (block.type === 'variable') {
        variable = getCompileVar(block.contextName, ctx);
        resultString += "r += c(" + variable + ", " + ctx + ");";
      }
      // Helpers block
      if (block.type === 'helper') {
        if (block.helperName in t.helpers) {
          compiledArguments = getCompiledArguments(block.contextName, ctx);

          resultString += "r += (Template7.helpers." + (block.helperName) + ").call(" + ctx + ", " + (compiledArguments && ((compiledArguments + ", "))) + "{hash:" + (JSON.stringify(block.hash)) + ", data: data || {}, fn: " + (getCompileFn(block, depth + 1)) + ", inverse: " + (getCompileInverse(block, depth + 1)) + ", root: root});";
        } else if (block.contextName.length > 0) {
          throw new Error(("Template7: Missing helper: \"" + (block.helperName) + "\""));
        } else {
          variable = getCompileVar(block.helperName, ctx);
          resultString += "if (" + variable + ") {";
          resultString += "if (isArray(" + variable + ")) {";
          resultString += "r += (Template7.helpers.each).call(" + ctx + ", " + variable + ", {hash:" + (JSON.stringify(block.hash)) + ", data: data || {}, fn: " + (getCompileFn(block, depth + 1)) + ", inverse: " + (getCompileInverse(block, depth + 1)) + ", root: root});";
          resultString += '}else {';
          resultString += "r += (Template7.helpers.with).call(" + ctx + ", " + variable + ", {hash:" + (JSON.stringify(block.hash)) + ", data: data || {}, fn: " + (getCompileFn(block, depth + 1)) + ", inverse: " + (getCompileInverse(block, depth + 1)) + ", root: root});";
          resultString += '}}';
        }
      }
    }
    resultString += '\nreturn r;})';
    return eval.call(template7Context, resultString);
  }
  t.compile = function _compile(template) {
    if (!t.compiled) {
      t.compiled = compile(template);
    }
    return t.compiled;
  };
};

Template7.prototype = {
  options: {},
  partials: {},
  helpers: {
    _partial: function _partial(partialName, options) {
      var p = Template7.prototype.partials[partialName];
      if (!p || (p && !p.template)) { return ''; }
      if (!p.compiled) {
        p.compiled = new Template7(p.template).compile();
      }
      var ctx = this;
      for (var hashName in options.hash) {
        ctx[hashName] = options.hash[hashName];
      }
      return p.compiled(ctx, options.data, options.root);
    },
    escape: function escape$1(context, options) {
      if (typeof context !== 'string') {
        throw new Error('Template7: Passed context to "escape" helper should be a string');
      }
      return escape(context);
    },
    if: function if$1(context, options) {
      var ctx = context;
      if (isFunction(ctx)) { ctx = ctx.call(this); }
      if (ctx) {
        return options.fn(this, options.data);
      }

      return options.inverse(this, options.data);
    },
    unless: function unless(context, options) {
      var ctx = context;
      if (isFunction(ctx)) { ctx = ctx.call(this); }
      if (!ctx) {
        return options.fn(this, options.data);
      }

      return options.inverse(this, options.data);
    },
    each: function each(context, options) {
      var ctx = context;
      var ret = '';
      var i = 0;
      if (isFunction(ctx)) { ctx = ctx.call(this); }
      if (isArray(ctx)) {
        if (options.hash.reverse) {
          ctx = ctx.reverse();
        }
        for (i = 0; i < ctx.length; i += 1) {
          ret += options.fn(ctx[i], { first: i === 0, last: i === ctx.length - 1, index: i });
        }
        if (options.hash.reverse) {
          ctx = ctx.reverse();
        }
      } else {
        for (var key in ctx) {
          i += 1;
          ret += options.fn(ctx[key], { key: key });
        }
      }
      if (i > 0) { return ret; }
      return options.inverse(this);
    },
    with: function with$1(context, options) {
      var ctx = context;
      if (isFunction(ctx)) { ctx = context.call(this); }
      return options.fn(ctx);
    },
    join: function join(context, options) {
      var ctx = context;
      if (isFunction(ctx)) { ctx = ctx.call(this); }
      return ctx.join(options.hash.delimiter || options.hash.delimeter);
    },
    js: function js(expression, options) {
      var func;
      if (expression.indexOf('return') >= 0) {
        func = "(function(){" + expression + "})";
      } else {
        func = "(function(){return (" + expression + ")})";
      }
      return eval.call(this, func).call(this);
    },
    js_compare: function js_compare(expression, options) {
      var func;
      if (expression.indexOf('return') >= 0) {
        func = "(function(){" + expression + "})";
      } else {
        func = "(function(){return (" + expression + ")})";
      }
      var condition = eval.call(this, func).call(this);
      if (condition) {
        return options.fn(this, options.data);
      }

      return options.inverse(this, options.data);
    },
  },
};
function t7(template, data) {
  if (arguments.length === 2) {
    var instance = new Template7(template);
    var rendered = instance.compile()(data);
    instance = null;
    return (rendered);
  }
  return new Template7(template);
}
t7.registerHelper = function registerHelper(name, fn) {
  Template7.prototype.helpers[name] = fn;
};
t7.unregisterHelper = function unregisterHelper(name) {
  Template7.prototype.helpers[name] = undefined;
  delete Template7.prototype.helpers[name];
};
t7.registerPartial = function registerPartial(name, template) {
  Template7.prototype.partials[name] = { template: template };
};
t7.unregisterPartial = function unregisterPartial(name) {
  if (Template7.prototype.partials[name]) {
    Template7.prototype.partials[name] = undefined;
    delete Template7.prototype.partials[name];
  }
};
t7.compile = function compile(template, options) {
  var instance = new Template7(template, options);
  return instance.compile();
};

t7.options = Template7.prototype.options;
t7.helpers = Template7.prototype.helpers;
t7.partials = Template7.prototype.partials;

return t7;

}());

(function () {

    'use strict';
    /*===========================
    Framework 7
    ===========================*/
    window.Framework7 = function (params) {
        // App
        var app = this;
    
        // Version
        app.version = '1.6.0';
    
        // Default Parameters
        app.params = {
            //
            root: 'body',
            //
            cache: true,
            cacheIgnore: [],
            cacheIgnoreGetParameters: false,
            cacheDuration: 1000 * 60 * 10, // Ten minutes
            preloadPreviousPage: true,
            uniqueHistory: false,
            uniqueHistoryIgnoreGetParameters: false,
            dynamicPageUrl: 'content-{{index}}',
            allowDuplicateUrls: false,
            router: true,
            routerRemoveTimeout: false,
            routerRemoveWithTimeout: false,
            // Push State
            pushState: false,
            pushStateRoot: undefined,
            pushStateNoAnimation: false,
            pushStateSeparator: '#!/',
            pushStateOnLoad: true,
            // Fast clicks
            fastClicks: true,
            fastClicksDistanceThreshold: 10,
            fastClicksDelayBetweenClicks: 50,
            fastClicksExclude: '', // CSS selector
            // Tap Hold
            tapHold: false,
            tapHoldDelay: 750,
            tapHoldPreventClicks: true,
            // Active State
            activeState: true,
            activeStateElements: 'a, button, label, span',
            // Animate Nav Back Icon
            animateNavBackIcon: false,
            // Swipe Back
            swipeBackPage: true,
            swipeBackPageThreshold: 0,
            swipeBackPageActiveArea: 30,
            swipeBackPageAnimateShadow: true,
            swipeBackPageAnimateOpacity: true,
            // Ajax
            ajaxLinks: undefined, // or CSS selector
            // External Links
            externalLinks: '.external', // CSS selector
            // Sortable
            sortable: true,
            // Scroll toolbars
            hideNavbarOnPageScroll: false,
            hideToolbarOnPageScroll: false,
            hideTabbarOnPageScroll: false,
            showBarsOnPageScrollEnd: true,
            showBarsOnPageScrollTop: true,
            // Swipeout
            swipeout: true,
            swipeoutActionsNoFold: false,
            swipeoutNoFollow: false,
            swipeoutRemoveWithTimeout: false,
            // Smart Select Back link template
            smartSelectOpenIn: 'page', // or 'popup' or 'picker'
            smartSelectBackText: 'Back',
            smartSelectPopupCloseText: 'Close',
            smartSelectPickerCloseText: 'Done',
            smartSelectSearchbar: false,
            smartSelectBackOnSelect: false,
            // Tap Navbar or Statusbar to scroll to top
            scrollTopOnNavbarClick: false,
            scrollTopOnStatusbarClick: false,
            // Panels
            panelLeftBreakpoint: null,
            panelRightBreakpoint: null,
            swipePanel: false, // or 'left' or 'right'
            swipePanelActiveArea: 0,
            swipePanelCloseOpposite: true,
            swipePanelOnlyClose: false,
            swipePanelNoFollow: false,
            swipePanelThreshold: 0,
            panelsCloseByOutside: true,
            // Modals
            modalButtonOk: 'OK',
            modalButtonCancel: 'Cancel',
            modalUsernamePlaceholder: 'Username',
            modalPasswordPlaceholder: 'Password',
            modalTitle: 'Framework7',
            modalCloseByOutside: false,
            actionsCloseByOutside: true,
            popupCloseByOutside: true,
            popoverCloseByOutside: true,
            modalPreloaderTitle: 'Loading... ',
            modalStack: true,
            modalsMoveToRoot: true,
            // Lazy Load
            imagesLazyLoadThreshold: 0,
            imagesLazyLoadSequential: true,
            // Name space
            viewClass: 'view',
            viewMainClass: 'view-main',
            viewsClass: 'views',
            // Notifications defaults
            notificationCloseOnClick: false,
            notificationCloseIcon: true,
            notificationCloseButtonText: 'Close',
            // Animate Pages
            animatePages: true,
            // Template7
            templates: {},
            template7Data: {},
            template7Pages: false,
            precompileTemplates: false,
            // Material
            material: false,
            materialPageLoadDelay: 0,
            materialPreloaderSvg: '<svg xmlns="http://www.w3.org/2000/svg" height="75" width="75" viewbox="0 0 75 75"><circle cx="37.5" cy="37.5" r="33.5" stroke-width="8"/></svg>',
            materialPreloaderHtml:
                '<span class="preloader-inner">' +
                    '<span class="preloader-inner-gap"></span>' +
                    '<span class="preloader-inner-left">' +
                        '<span class="preloader-inner-half-circle"></span>' +
                    '</span>' +
                    '<span class="preloader-inner-right">' +
                        '<span class="preloader-inner-half-circle"></span>' +
                    '</span>' +
                '</span>',
            materialRipple: true,
            materialRippleElements: '.ripple, a.link, a.item-link, .button, .modal-button, .tab-link, .label-radio, .label-checkbox, .actions-modal-button, a.searchbar-clear, a.floating-button, .floating-button > a, .speed-dial-buttons a, .form-checkbox, .form-radio, .data-table .sortable-cell',
            // Auto init
            init: true,
        };
    
        // Extend defaults with parameters
        for (var param in params) {
            app.params[param] = params[param];
        }
    
        // DOM lib
        var $ = Dom7;
    
        // Template7 lib
        var t7 = Template7;
        app._compiledTemplates = {};
    
        // App Root
        app.root = $(app.params.root);
        app.root.eq(0).addClass('framework7-root');
    
        // Touch events
        app.touchEvents = {
            start: app.support.touch ? 'touchstart' : 'mousedown',
            move: app.support.touch ? 'touchmove' : 'mousemove',
            end: app.support.touch ? 'touchend' : 'mouseup'
        };
    
        // Link to local storage
        app.ls = window.localStorage;
    
        // RTL
        app.rtl = $('body').css('direction') === 'rtl';
        if (app.rtl) $('html').attr('dir', 'rtl');
    
        // Overwrite statusbar overlay
        if (typeof app.params.statusbarOverlay !== 'undefined') {
            if (app.params.statusbarOverlay) $('html').addClass('with-statusbar-overlay');
            else $('html').removeClass('with-statusbar-overlay');
        }
        else if (app.device.ios && (window.cordova || window.phonegap)) {
            $(document).on('resume', function () {
                if (app.device.needsStatusBar()) {
                    $('html').addClass('with-statusbar-overlay');
                }
            }, false);
        }
    

        /*======================================================
        ************   Views   ************
        ======================================================*/
        app.views = [];
        var View = function (selector, params) {
            var defaults = {
                dynamicNavbar: false,
                domCache: false,
                linksView: undefined,
                reloadPages: false,
                uniqueHistory: app.params.uniqueHistory,
                uniqueHistoryIgnoreGetParameters: app.params.uniqueHistoryIgnoreGetParameters,
                allowDuplicateUrls: app.params.allowDuplicateUrls,
                swipeBackPage: app.params.swipeBackPage,
                swipeBackPageAnimateShadow: app.params.swipeBackPageAnimateShadow,
                swipeBackPageAnimateOpacity: app.params.swipeBackPageAnimateOpacity,
                swipeBackPageActiveArea: app.params.swipeBackPageActiveArea,
                swipeBackPageThreshold: app.params.swipeBackPageThreshold,
                animatePages: app.params.animatePages,
                preloadPreviousPage: app.params.preloadPreviousPage
            };
            var i;
        
            // Params
            params = params || {};
        
            // Disable dynamic navbar for material theme
            if (params.dynamicNavbar && app.params.material) params.dynamicNavbar = false;
        
            // Extend params with defaults
            for (var def in defaults) {
                if (typeof params[def] === 'undefined') {
                    params[def] = defaults[def];
                }
            }
            // View
            var view = this;
            view.params = params;
        
            // Selector
            view.selector = selector;
        
            // Container
            var container = $(selector);
            view.container = container[0];
        
            // Fix Selector
        
            if (typeof selector !== 'string') {
                // Supposed to be HTMLElement or Dom7
                selector = (container.attr('id') ? '#' + container.attr('id') : '') + (container.attr('class') ? '.' + container.attr('class').replace(/ /g, '.').replace('.active', '') : '');
                view.selector = selector;
            }
        
            // Is main
            view.main = container.hasClass(app.params.viewMainClass);
        
            // Content cache
            view.contentCache = {};
        
            // Context cache
            view.contextCache = {};
        
            // Pages cache
            view.pagesCache = {};
            view.pageElementsCache = {};
        
            // Store View in element for easy access
            container[0].f7View = view;
        
            // Pages
            view.pagesContainer = container.find('.pages')[0];
            view.initialPages = [];
            view.initialPagesUrl = [];
            view.initialNavbars = [];
            if (view.params.domCache) {
                var initialPages = container.find('.page');
                for (i = 0; i < initialPages.length; i++) {
                    view.initialPages.push(initialPages[i]);
                    view.initialPagesUrl.push('#' + initialPages.eq(i).attr('data-page'));
                }
                if (view.params.dynamicNavbar) {
                    var initialNavbars = container.find('.navbar-inner');
                    for (i = 0; i < initialNavbars.length; i++) {
                        view.initialNavbars.push(initialNavbars[i]);
                    }
                }
        
            }
        
            view.allowPageChange = true;
        
            // Location
            var docLocation = document.location.href;
        
            // History
            view.history = [];
            var viewURL = docLocation;
            var pushStateSeparator = app.params.pushStateSeparator;
            var pushStateRoot = app.params.pushStateRoot;
            if (app.params.pushState && view.main) {
                if (pushStateRoot) {
                    viewURL = pushStateRoot;
                }
                else {
                    if (pushStateSeparator && viewURL.indexOf(pushStateSeparator) >= 0 && viewURL.indexOf(pushStateSeparator + '#') < 0) viewURL = viewURL.split(pushStateSeparator)[0];
                }
        
            }
        
            // Active Page
            var currentPage, currentPageData;
            if (!view.activePage) {
                currentPage = $(view.pagesContainer).find('.page-on-center');
                if (currentPage.length === 0) {
                    currentPage = $(view.pagesContainer).find('.page:not(.cached)');
                    currentPage = currentPage.eq(currentPage.length - 1);
                }
                if (currentPage.length > 0) {
                    currentPageData = currentPage[0].f7PageData;
                }
            }
        
            // View startup URL
            if (view.params.domCache && currentPage) {
                view.url = container.attr('data-url') || view.params.url || '#' + currentPage.attr('data-page');
                view.pagesCache[view.url] = currentPage.attr('data-page');
            }
            else view.url = container.attr('data-url') || view.params.url || viewURL;
        
            // Update current page Data
            if (currentPageData) {
                currentPageData.view = view;
                currentPageData.url = view.url;
                if (view.params.domCache && view.params.dynamicNavbar && !currentPageData.navbarInnerContainer) {
                    currentPageData.navbarInnerContainer = view.initialNavbars[view.initialPages.indexOf(currentPageData.container)];
                }
                view.activePage = currentPageData;
                currentPage[0].f7PageData = currentPageData;
            }
        
            // Store to history main view's url
            if (view.url) {
                view.history.push(view.url);
            }
        
            // Touch events
            var isTouched = false,
                isMoved = false,
                touchesStart = {},
                isScrolling,
                activePage = [],
                previousPage = [],
                viewContainerWidth,
                touchesDiff,
                allowViewTouchMove = true,
                touchStartTime,
                activeNavbar = [],
                previousNavbar = [],
                activeNavElements,
                previousNavElements,
                activeNavBackIcon,
                previousNavBackIcon,
                dynamicNavbar,
                pageShadow,
                pageOpacity,
                el;
        
            view.handleTouchStart = function (e) {
                if (!allowViewTouchMove || !view.params.swipeBackPage || isTouched || app.swipeoutOpenedEl || !view.allowPageChange) return;
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                touchStartTime = (new Date()).getTime();
                dynamicNavbar = view.params.dynamicNavbar && container.find('.navbar-inner').length > 1;
            };
        
            view.handleTouchMove = function (e) {
                if (!isTouched) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (isScrolling || e.f7PreventSwipeBack || app.preventSwipeBack) {
                    isTouched = false;
                    return;
                }
                if (!isMoved) {
                    var cancel = false;
                    // Calc values during first move fired
                    viewContainerWidth = container.width();
                    var target = $(e.target);
                    var swipeout = target.hasClass('swipeout') ? target : target.parents('.swipeout');
                    if (swipeout.length > 0) {
                        if (!app.rtl && swipeout.find('.swipeout-actions-left').length > 0) cancel = true;
                        if (app.rtl && swipeout.find('.swipeout-actions-right').length > 0) cancel = true;
                    }
                    activePage = target.is('.page') ? target : target.parents('.page');
                    if (activePage.hasClass('no-swipeback')) cancel = true;
                    previousPage = container.find('.page-on-left:not(.cached)');
                    var notFromBorder = touchesStart.x - container.offset().left > view.params.swipeBackPageActiveArea;
                    if (app.rtl) {
                        notFromBorder = touchesStart.x < container.offset().left - container[0].scrollLeft + viewContainerWidth - view.params.swipeBackPageActiveArea;
                    }
                    else {
                        notFromBorder = touchesStart.x - container.offset().left > view.params.swipeBackPageActiveArea;
                    }
                    if (notFromBorder) cancel = true;
                    if (previousPage.length === 0 || activePage.length === 0) cancel = true;
                    if (cancel) {
                        isTouched = false;
                        return;
                    }
        
                    if (view.params.swipeBackPageAnimateShadow && !app.device.android) {
                        pageShadow = activePage.find('.swipeback-page-shadow');
                        if (pageShadow.length === 0) {
                            pageShadow = $('<div class="swipeback-page-shadow"></div>');
                            activePage.append(pageShadow);
                        }
                    }
                    if (view.params.swipeBackPageAnimateOpacity) {
                        pageOpacity = previousPage.find('.swipeback-page-opacity');
                        if (pageOpacity.length === 0) {
                            pageOpacity = $('<div class="swipeback-page-opacity"></div>');
                            previousPage.append(pageOpacity);
                        }
                    }
        
                    if (dynamicNavbar) {
                        activeNavbar = container.find('.navbar-on-center:not(.cached)');
                        previousNavbar = container.find('.navbar-on-left:not(.cached)');
                        activeNavElements = activeNavbar.find('.left, .center, .right, .subnavbar, .fading');
                        previousNavElements = previousNavbar.find('.left, .center, .right, .subnavbar, .fading');
                        if (app.params.animateNavBackIcon) {
                            activeNavBackIcon = activeNavbar.find('.left.sliding .back .icon');
                            previousNavBackIcon = previousNavbar.find('.left.sliding .back .icon');
                        }
                    }
        
                    // Close/Hide Any Picker
                    if ($('.picker-modal.modal-in').length > 0) {
                        app.closeModal($('.picker-modal.modal-in'));
                    }
                }
                e.f7PreventPanelSwipe = true;
                isMoved = true;
                e.preventDefault();
        
                // RTL inverter
                var inverter = app.rtl ? -1 : 1;
        
                // Touches diff
                touchesDiff = (pageX - touchesStart.x - view.params.swipeBackPageThreshold) * inverter;
                if (touchesDiff < 0) touchesDiff = 0;
                var percentage = touchesDiff / viewContainerWidth;
        
                // Swipe Back Callback
                var callbackData = {
                    percentage: percentage,
                    activePage: activePage[0],
                    previousPage: previousPage[0],
                    activeNavbar: activeNavbar[0],
                    previousNavbar: previousNavbar[0]
                };
                if (view.params.onSwipeBackMove) {
                    view.params.onSwipeBackMove(callbackData);
                }
                container.trigger('swipeBackMove swipeback:move', callbackData);
        
                // Transform pages
                var activePageTranslate = touchesDiff * inverter;
                var previousPageTranslate = (touchesDiff / 5 - viewContainerWidth / 5) * inverter;
                if (app.device.pixelRatio === 1) {
                    activePageTranslate = Math.round(activePageTranslate);
                    previousPageTranslate = Math.round(previousPageTranslate);
                }
        
                activePage.transform('translate3d(' + activePageTranslate + 'px,0,0)');
                if (view.params.swipeBackPageAnimateShadow && !app.device.android) pageShadow[0].style.opacity = 1 - 1 * percentage;
        
                previousPage.transform('translate3d(' + previousPageTranslate + 'px,0,0)');
                if (view.params.swipeBackPageAnimateOpacity) pageOpacity[0].style.opacity = 1 - 1 * percentage;
        
                // Dynamic Navbars Animation
                if (dynamicNavbar) {
                    var i;
                    for (i = 0; i < activeNavElements.length; i++) {
                        el = $(activeNavElements[i]);
                        if (!el.is('.subnavbar.sliding')) el[0].style.opacity = (1 - percentage * 1.3);
                        if (el[0].className.indexOf('sliding') >= 0) {
                            var activeNavTranslate = percentage * el[0].f7NavbarRightOffset;
                            if (app.device.pixelRatio === 1) activeNavTranslate = Math.round(activeNavTranslate);
                            el.transform('translate3d(' + activeNavTranslate + 'px,0,0)');
                            if (app.params.animateNavBackIcon) {
                                if (el[0].className.indexOf('left') >= 0 && activeNavBackIcon.length > 0) {
                                    activeNavBackIcon.transform('translate3d(' + -activeNavTranslate + 'px,0,0)');
                                }
                            }
                        }
                    }
                    for (i = 0; i < previousNavElements.length; i++) {
                        el = $(previousNavElements[i]);
                        if (!el.is('.subnavbar.sliding')) el[0].style.opacity = percentage * 1.3 - 0.3;
                        if (el[0].className.indexOf('sliding') >= 0) {
                            var previousNavTranslate = el[0].f7NavbarLeftOffset * (1 - percentage);
                            if (app.device.pixelRatio === 1) previousNavTranslate = Math.round(previousNavTranslate);
                            el.transform('translate3d(' + previousNavTranslate + 'px,0,0)');
                            if (app.params.animateNavBackIcon) {
                                if (el[0].className.indexOf('left') >= 0 && previousNavBackIcon.length > 0) {
                                    previousNavBackIcon.transform('translate3d(' + -previousNavTranslate + 'px,0,0)');
                                }
                            }
                        }
                    }
                }
            };
        
            view.handleTouchEnd = function (e) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                isTouched = false;
                isMoved = false;
                if (touchesDiff === 0) {
                    $([activePage[0], previousPage[0]]).transform('');
                    if (dynamicNavbar) {
                        activeNavElements.transform('').css({opacity: ''});
                        previousNavElements.transform('').css({opacity: ''});
                        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.transform('');
                        if (previousNavBackIcon && activeNavBackIcon.length > 0) previousNavBackIcon.transform('');
                    }
                    return;
                }
                var timeDiff = (new Date()).getTime() - touchStartTime;
                var pageChanged = false;
                // Swipe back to previous page
                if (
                        timeDiff < 300 && touchesDiff > 10 ||
                        timeDiff >= 300 && touchesDiff > viewContainerWidth / 2
                    ) {
                    activePage.removeClass('page-on-center').addClass('page-on-right');
                    previousPage.removeClass('page-on-left').addClass('page-on-center');
                    if (dynamicNavbar) {
                        activeNavbar.removeClass('navbar-on-center').addClass('navbar-on-right');
                        previousNavbar.removeClass('navbar-on-left').addClass('navbar-on-center');
                    }
                    pageChanged = true;
                }
                // Reset custom styles
                // Add transitioning class for transition-duration
                $([activePage[0], previousPage[0]]).transform('').addClass('page-transitioning');
                if (dynamicNavbar) {
                    activeNavElements.css({opacity: ''})
                    .each(function () {
                        var translate = pageChanged ? this.f7NavbarRightOffset : 0;
                        var sliding = $(this);
                        sliding.transform('translate3d(' + translate + 'px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && activeNavBackIcon.length > 0) {
                                activeNavBackIcon.addClass('page-transitioning').transform('translate3d(' + -translate + 'px,0,0)');
                            }
                        }
        
                    }).addClass('page-transitioning');
        
                    previousNavElements.transform('').css({opacity: ''}).each(function () {
                        var translate = pageChanged ? 0 : this.f7NavbarLeftOffset;
                        var sliding = $(this);
                        sliding.transform('translate3d(' + translate + 'px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && previousNavBackIcon.length > 0) {
                                previousNavBackIcon.addClass('page-transitioning').transform('translate3d(' + -translate + 'px,0,0)');
                            }
                        }
                    }).addClass('page-transitioning');
                }
                allowViewTouchMove = false;
                view.allowPageChange = false;
                // Swipe Back Callback
                var callbackData = {
                    activePage: activePage[0],
                    previousPage: previousPage[0],
                    activeNavbar: activeNavbar[0],
                    previousNavbar: previousNavbar[0]
                };
                if (pageChanged) {
                    // Update View's URL
                    var url = view.history[view.history.length - 2];
                    view.url = url;
        
                    // Page before animation callback
                    app.pageBackCallback('before', view, {pageContainer: activePage[0], url: url, position: 'center', newPage: previousPage, oldPage: activePage, swipeBack: true});
                    app.pageAnimCallback('before', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage, swipeBack: true});
        
                    if (view.params.onSwipeBackBeforeChange) {
                        view.params.onSwipeBackBeforeChange(callbackData);
                    }
                    container.trigger('swipeBackBeforeChange swipeback:beforechange', callbackData);
                }
                else {
                    if (view.params.onSwipeBackBeforeReset) {
                        view.params.onSwipeBackBeforeReset(callbackData);
                    }
                    container.trigger('swipeBackBeforeReset swipeback:beforereset', callbackData);
                }
        
                activePage.transitionEnd(function () {
                    $([activePage[0], previousPage[0]]).removeClass('page-transitioning');
                    if (dynamicNavbar) {
                        activeNavElements.removeClass('page-transitioning').css({opacity: ''});
                        previousNavElements.removeClass('page-transitioning').css({opacity: ''});
                        if (activeNavBackIcon && activeNavBackIcon.length > 0) activeNavBackIcon.removeClass('page-transitioning');
                        if (previousNavBackIcon && previousNavBackIcon.length > 0) previousNavBackIcon.removeClass('page-transitioning');
                    }
                    allowViewTouchMove = true;
                    view.allowPageChange = true;
                    if (pageChanged) {
                        if (app.params.pushState && view.main) history.back();
                        // Page after animation callback
                        app.pageBackCallback('after', view, {pageContainer: activePage[0], url: url, position: 'center', newPage: previousPage, oldPage: activePage, swipeBack: true});
                        app.pageAnimCallback('after', view, {pageContainer: previousPage[0], url: url, position: 'left', newPage: previousPage, oldPage: activePage, swipeBack: true});
                        app.router.afterBack(view, activePage, previousPage);
        
                        if (view.params.onSwipeBackAfterChange) {
                            view.params.onSwipeBackAfterChange(callbackData);
                        }
                        container.trigger('swipeBackAfterChange swipeback:afterchange', callbackData);
                    }
                    else {
                        if (view.params.onSwipeBackAfterReset) {
                            view.params.onSwipeBackAfterReset(callbackData);
                        }
                        container.trigger('swipeBackAfterReset swipeback:afterreset', callbackData);
                    }
                    if (pageShadow && pageShadow.length > 0) pageShadow.remove();
                    if (pageOpacity && pageOpacity.length > 0) pageOpacity.remove();
                });
            };
            view.attachEvents = function (detach) {
                var action = detach ? 'off' : 'on';
                var passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? {passive: true, capture: false} : false;
                var activeListener = app.support.passiveListener ? {passive: false, capture: false} : false;
                container[action](app.touchEvents.start, view.handleTouchStart, passiveListener);
                container[action](app.touchEvents.move, view.handleTouchMove, activeListener);
                container[action](app.touchEvents.end, view.handleTouchEnd, passiveListener);
            };
            view.detachEvents = function () {
                view.attachEvents(true);
            };
        
            // Init
            if (view.params.swipeBackPage && !app.params.material) {
                view.attachEvents();
            }
        
            // Check view name to delete unwanted characters
            if (view.params.name) view.params.name = view.params.name.replace(/[^a-zA-Z]/g, '');
        
            // Add view to app
            app.views.push(view);
            if (view.main) {
                app.mainView = view;
                app.views.main = view;
            }
            else if(view.params.name) {
                app[view.params.name + 'View'] = view;
                app.views[view.params.name] = view;
            }
        
            // Router
            view.router = {
                load: function (options) {
                    return app.router.load(view, options);
                },
                back: function (options) {
                    return app.router.back(view, options);
                },
                // Shortcuts
                loadPage: function (options) {
                    options = options || {};
                    if (typeof options === 'string') {
                        var url = options;
                        options = {};
                        if (url && url.indexOf('#') === 0 && view.params.domCache) {
                            options.pageName = url.split('#')[1];
                        }
                        else options.url = url;
                    }
                    return app.router.load(view, options);
                },
                loadContent: function (content) {
                    return app.router.load(view, {content: content});
                },
                reloadPage: function (url) {
                    return app.router.load(view, {url: url, reload: true});
                },
                reloadContent: function (content) {
                    return app.router.load(view, {content: content, reload: true});
                },
                reloadPreviousPage: function (url) {
                    return app.router.load(view, {url: url, reloadPrevious: true, reload: true});
                },
                reloadPreviousContent: function (content) {
                    return app.router.load(view, {content: content, reloadPrevious: true, reload: true});
                },
                refreshPage: function () {
                    var options = {
                        url: view.url,
                        reload: true,
                        ignoreCache: true
                    };
                    if (options.url && options.url.indexOf('#') === 0) {
                        if (view.params.domCache && view.pagesCache[options.url]) {
                            options.pageName = view.pagesCache[options.url];
                            options.url = undefined;
                            delete options.url;
                        }
                        else if (view.contentCache[options.url]) {
                            options.content = view.contentCache[options.url];
                            options.url = undefined;
                            delete options.url;
                        }
                    }
                    return app.router.load(view, options);
                },
                refreshPreviousPage: function () {
                    var options = {
                        url: view.history[view.history.length - 2],
                        reload: true,
                        reloadPrevious: true,
                        ignoreCache: true
                    };
                    if (options.url && options.url.indexOf('#') === 0 && view.params.domCache && view.pagesCache[options.url]) {
                        options.pageName = view.pagesCache[options.url];
                        options.url = undefined;
                        delete options.url;
                    }
                    return app.router.load(view, options);
                }
            };
        
            // Aliases for temporary backward compatibility
            view.loadPage = view.router.loadPage;
            view.loadContent = view.router.loadContent;
            view.reloadPage = view.router.reloadPage;
            view.reloadContent = view.router.reloadContent;
            view.reloadPreviousPage = view.router.reloadPreviousPage;
            view.reloadPreviousContent = view.router.reloadPreviousContent;
            view.refreshPage = view.router.refreshPage;
            view.refreshPreviousPage = view.router.refreshPreviousPage;
            view.back = view.router.back;
        
            // Bars methods
            view.hideNavbar = function (animated) {
                return app.hideNavbar(container.find('.navbar'), animated);
            };
            view.showNavbar = function (animated) {
                return app.showNavbar(container.find('.navbar'), animated);
            };
            view.hideToolbar = function (animated) {
                return app.hideToolbar(container.find('.toolbar'), animated);
            };
            view.showToolbar = function (animated) {
                return app.showToolbar(container.find('.toolbar'), animated);
            };
        
            // Push State on load
            if (app.params.pushState && app.params.pushStateOnLoad && view.main) {
                var pushStateUrl;
                var pushStateUrlSplit = docLocation.split(pushStateSeparator)[1];
                if (pushStateRoot) {
                    pushStateUrl = docLocation.split(app.params.pushStateRoot + pushStateSeparator)[1];
                }
                else if (pushStateSeparator && docLocation.indexOf(pushStateSeparator) >= 0 && docLocation.indexOf(pushStateSeparator + '#') < 0) {
                    pushStateUrl = pushStateUrlSplit;
                }
                var pushStateAnimatePages = app.params.pushStateNoAnimation ? false : undefined;
                var historyState = history.state;
                if (pushStateUrl) {
                    if (pushStateUrl.indexOf('#') >= 0 && view.params.domCache && historyState && historyState.pageName && 'viewIndex' in historyState) {
                        app.router.load(view, {pageName: historyState.pageName, url: historyState.url, animatePages: pushStateAnimatePages, pushState: false});
                    }
                    else if (pushStateUrl.indexOf('#') >= 0 && view.params.domCache && view.initialPagesUrl.indexOf(pushStateUrl) >= 0) {
                        app.router.load(view, {pageName: pushStateUrl.replace('#',''), animatePages: pushStateAnimatePages, pushState: false});
                    }
                    else app.router.load(view, {url: pushStateUrl, animatePages: pushStateAnimatePages, pushState: false});
                }
                else if (view.params.domCache && docLocation.indexOf(pushStateSeparator + '#') >= 0) {
                    if (historyState && historyState.pageName && 'viewIndex' in historyState) {
                        app.router.load(view, {pageName: historyState.pageName, url: historyState.url, animatePages: pushStateAnimatePages, pushState: false});
                    }
                    else if (pushStateSeparator && pushStateUrlSplit.indexOf('#') === 0) {
                        if (view.initialPagesUrl.indexOf(pushStateUrlSplit)) {
                            app.router.load(view, {pageName: pushStateUrlSplit.replace('#', ''), animatePages: pushStateAnimatePages, pushState: false});
                        }
                    }
                }
            }
        
            // Destroy
            view.destroy = function () {
                view.detachEvents();
                if (view.main) {
                    app.mainView = null;
                    delete app.mainView;
                    app.views.main = null;
                    delete app.views.main;
                }
                else if(view.params.name) {
                    app[view.params.name + 'View'] = null;
                    delete app[view.params.name + 'View'];
                    app.views[view.params.name] = null;
                    delete app.views[view.params.name];
                }
                container.removeAttr('data-page');
                container[0].f7View = null;
                delete container[0].f7View;
        
                app.views.splice(app.views.indexOf(view), 1);
        
                // Delete props & methods
                for (var prop in view) {
                    if (view.hasOwnProperty(prop)) {
                        view[prop] = null;
                        delete view[prop];
                    }
                }
                view = null;
            };
        
            // Plugin hook
            app.pluginHook('addView', view);
        
            // Return view
            return view;
        };
        
        app.addView = function (selector, params) {
            return new View(selector, params);
        };
        
        app.getCurrentView = function (index) {
            var popoverView = $('.popover.modal-in .view');
            var popupView = $('.popup.modal-in .view');
            var panelView = $('.panel.active .view');
            var appViews = $('.views');
            // Find active view as tab
            var appView = appViews.children('.view');
            // Propably in tabs or split view
            if (appView.length > 1) {
                if (appView.hasClass('tab')) {
                    // Tabs
                    appView = appViews.children('.view.active');
                }
                else {
                    // Split View, leave appView intact
                }
            }
            if (popoverView.length > 0 && popoverView[0].f7View) return popoverView[0].f7View;
            if (popupView.length > 0 && popupView[0].f7View) return popupView[0].f7View;
            if (panelView.length > 0 && panelView[0].f7View) return panelView[0].f7View;
            if (appView.length > 0) {
                if (appView.length === 1 && appView[0].f7View) return appView[0].f7View;
                if (appView.length > 1) {
                    var currentViews = [];
                    for (var i = 0; i < appView.length; i++) {
                        if (appView[i].f7View) currentViews.push(appView[i].f7View);
                    }
                    if (currentViews.length > 0 && typeof index !== 'undefined') return currentViews[index];
                    if (currentViews.length > 1) return currentViews;
                    if (currentViews.length === 1) return currentViews[0];
                    return undefined;
                }
            }
            return undefined;
        };
        

        /*======================================================
        ************   Navbars && Toolbars   ************
        ======================================================*/
        // On Navbar Init Callback
        app.navbarInitCallback = function (view, pageContainer, navbarContainer, navbarInnerContainer) {
            if (!navbarContainer && navbarInnerContainer) navbarContainer = $(navbarInnerContainer).parent('.navbar')[0];
            if (!navbarInnerContainer || navbarInnerContainer.f7NavbarInitialized && view && !view.params.domCache) return;
            var navbarData = {
                container: navbarContainer,
                innerContainer: navbarInnerContainer
            };
            var pageData = pageContainer && pageContainer.f7PageData;
        
            var eventData = {
                page: pageData,
                navbar: navbarData
            };
        
            if (navbarInnerContainer.f7NavbarInitialized && ((view && view.params.domCache) || (!view && $(navbarContainer).parents('.popup, .popover, .login-screen, .modal, .actions-modal, .picker-modal').length > 0))) {
                // Reinit Navbar
                app.reinitNavbar(navbarContainer, navbarInnerContainer);
        
                // Plugin hook
                app.pluginHook('navbarReinit', eventData);
        
                // Event
                $(navbarInnerContainer).trigger('navbarReinit navbar:reinit', eventData);
                return;
            }
            navbarInnerContainer.f7NavbarInitialized = true;
            // Before Init
            app.pluginHook('navbarBeforeInit', navbarData, pageData);
            $(navbarInnerContainer).trigger('navbarBeforeInit navbar:beforeinit', eventData);
        
            // Initialize Navbar
            app.initNavbar(navbarContainer, navbarInnerContainer);
        
            // On init
            app.pluginHook('navbarInit', navbarData, pageData);
            $(navbarInnerContainer).trigger('navbarInit navbar:init', eventData);
        };
        // Navbar Remove Callback
        app.navbarRemoveCallback = function (view, pageContainer, navbarContainer, navbarInnerContainer) {
            if (!navbarContainer && navbarInnerContainer) navbarContainer = $(navbarInnerContainer).parent('.navbar')[0];
            var navbarData = {
                container: navbarContainer,
                innerContainer: navbarInnerContainer
            };
            var pageData;
            if (pageContainer) {
                pageData = pageContainer.f7PageData;
            }
        
            var eventData = {
                page: pageData,
                navbar: navbarData
            };
            app.pluginHook('navbarBeforeRemove', navbarData, pageData);
            $(navbarInnerContainer).trigger('navbarBeforeRemove navbar:beforeremove', eventData);
            navbarData = null;
            pageData = null;
        };
        app.initNavbar = function (navbarContainer, navbarInnerContainer) {
            // Init Subnavbar Searchbar
            if (app.initSearchbar) app.initSearchbar(navbarInnerContainer);
        };
        app.reinitNavbar = function (navbarContainer, navbarInnerContainer) {
            // Re init navbar methods
        };
        app.initNavbarWithCallback = function (navbarContainer) {
            navbarContainer = $(navbarContainer);
            var viewContainer = navbarContainer.parents('.' + app.params.viewClass);
            var view;
            if (viewContainer.length === 0) return;
            if (navbarContainer.parents('.navbar-through').length === 0 && viewContainer.find('.navbar-through').length === 0) return;
            view = viewContainer[0].f7View || undefined;
        
            navbarContainer.find('.navbar-inner').each(function () {
                var navbarInnerContainer = this;
                var pageContainer;
                if ($(navbarInnerContainer).attr('data-page')) {
                    // For dom cache
                    pageContainer = viewContainer.find('.page[data-page="' + $(navbarInnerContainer).attr('data-page') + '"]')[0];
                }
                if (!pageContainer) {
                    var pages = viewContainer.find('.page');
                    if (pages.length === 1) {
                        pageContainer = pages[0];
                    }
                    else {
                        viewContainer.find('.page').each(function () {
                            if (this.f7PageData && this.f7PageData.navbarInnerContainer === navbarInnerContainer) {
                                pageContainer = this;
                            }
                        });
                    }
                }
                app.navbarInitCallback(view, pageContainer, navbarContainer[0], navbarInnerContainer);
            });
        };
        
        // Size Navbars
        app.sizeNavbars = function (viewContainer) {
            if (app.params.material) return;
            var navbarInner = viewContainer ? $(viewContainer).find('.navbar .navbar-inner:not(.cached)') : $('.navbar .navbar-inner:not(.cached)');
            navbarInner.each(function () {
                var n = $(this);
                if (n.hasClass('cached')) return;
                var left = app.rtl ? n.find('.right') : n.find('.left'),
                    right = app.rtl ? n.find('.left') : n.find('.right'),
                    center = n.find('.center'),
                    subnavbar = n.find('.subnavbar'),
                    noLeft = left.length === 0,
                    noRight = right.length === 0,
                    leftWidth = noLeft ? 0 : left.outerWidth(true),
                    rightWidth = noRight ? 0 : right.outerWidth(true),
                    centerWidth = center.outerWidth(true),
                    navbarStyles = n.styles(),
                    navbarWidth = n[0].offsetWidth - parseInt(navbarStyles.paddingLeft, 10) - parseInt(navbarStyles.paddingRight, 10),
                    onLeft = n.hasClass('navbar-on-left'),
                    currLeft, diff;
        
                if (noRight) {
                    currLeft = navbarWidth - centerWidth;
                }
                if (noLeft) {
                    currLeft = 0;
                }
                if (!noLeft && !noRight) {
                    currLeft = (navbarWidth - rightWidth - centerWidth + leftWidth) / 2;
                }
                var requiredLeft = (navbarWidth - centerWidth) / 2;
                if (navbarWidth - leftWidth - rightWidth > centerWidth) {
                    if (requiredLeft < leftWidth) {
                        requiredLeft = leftWidth;
                    }
                    if (requiredLeft + centerWidth > navbarWidth - rightWidth) {
                        requiredLeft = navbarWidth - rightWidth - centerWidth;
                    }
                    diff = requiredLeft - currLeft;
                }
                else {
                    diff = 0;
                }
                // RTL inverter
                var inverter = app.rtl ? -1 : 1;
        
                if (center.hasClass('sliding')) {
                    center[0].f7NavbarLeftOffset = -(currLeft + diff) * inverter;
                    center[0].f7NavbarRightOffset = (navbarWidth - currLeft - diff - centerWidth) * inverter;
                    if (onLeft) {
                        if (app.params.animateNavBackIcon) {
                            var activeNavbarBackLink = n.parent().find('.navbar-on-center').find('.left.sliding .back .icon ~ span');
                            if (activeNavbarBackLink.length > 0) {
                                center[0].f7NavbarLeftOffset += activeNavbarBackLink[0].offsetLeft;
                            }
                        }
                        center.transform('translate3d(' + center[0].f7NavbarLeftOffset + 'px, 0, 0)');
                    }
                }
                if (!noLeft && left.hasClass('sliding')) {
                    if (app.rtl) {
                        left[0].f7NavbarLeftOffset = -(navbarWidth - left[0].offsetWidth) / 2 * inverter;
                        left[0].f7NavbarRightOffset = leftWidth * inverter;
                    }
                    else {
                        left[0].f7NavbarLeftOffset = -leftWidth;
                        left[0].f7NavbarRightOffset = (navbarWidth - left[0].offsetWidth) / 2;
                        if (app.params.animateNavBackIcon && left.find('.back .icon').length > 0) {
                            left[0].f7NavbarRightOffset -= left.find('.back .icon')[0].offsetWidth;
                        }
                    }
                    if (onLeft) left.transform('translate3d(' + left[0].f7NavbarLeftOffset + 'px, 0, 0)');
                }
                if (!noRight && right.hasClass('sliding')) {
                    if (app.rtl) {
                        right[0].f7NavbarLeftOffset = -rightWidth * inverter;
                        right[0].f7NavbarRightOffset = (navbarWidth - right[0].offsetWidth) / 2 * inverter;
                    }
                    else {
                        right[0].f7NavbarLeftOffset = -(navbarWidth - right[0].offsetWidth) / 2;
                        right[0].f7NavbarRightOffset = rightWidth;
                    }
                    if (onLeft) right.transform('translate3d(' + right[0].f7NavbarLeftOffset + 'px, 0, 0)');
                }
                if (subnavbar.length && subnavbar.hasClass('sliding')) {
                    subnavbar[0].f7NavbarLeftOffset = app.rtl ? subnavbar[0].offsetWidth : -subnavbar[0].offsetWidth;
                    subnavbar[0].f7NavbarRightOffset = -subnavbar[0].f7NavbarLeftOffset;
                }
        
                // Center left
                var centerLeft = diff;
                if (app.rtl && noLeft && noRight && center.length > 0) centerLeft = -centerLeft;
                center.css({left: centerLeft + 'px'});
                
            });
        };
        
        // Hide/Show Navbars/Toolbars
        app.hideNavbar = function (navbarContainer, animated) {
            if (typeof animated === 'undefined') animated = true;
            $(navbarContainer).addClass('navbar-hidden' + (!animated ? (' not-animated') : ''));
            return true;
        };
        app.showNavbar = function (navbarContainer, animated) {
            if (typeof animated === 'undefined') animated = true;
            var navbar = $(navbarContainer);
            if (animated) {
                navbar.removeClass('not-animated');
                navbar.addClass('navbar-hiding').removeClass('navbar-hidden').transitionEnd(function () {
                    navbar.removeClass('navbar-hiding');
                });
            }
            else {
                navbar.removeClass('navbar-hidden navbar-hiding not-animated');
            }
            return true;
        };
        app.hideToolbar = function (toolbarContainer, animated) {
            if (typeof animated === 'undefined') animated = true;
            $(toolbarContainer).addClass('toolbar-hidden' + (!animated ? (' not-animated') : ''));
            return true;
        };
        app.showToolbar = function (toolbarContainer, animated) {
            if (typeof animated === 'undefined') animated = true;
            var toolbar = $(toolbarContainer);
            if (animated) {
                toolbar.removeClass('not-animated');
                toolbar.addClass('toolbar-hiding').removeClass('toolbar-hidden').transitionEnd(function () {
                    toolbar.removeClass('toolbar-hiding' + (!animated ? (' not-animated') : ''));
                });
            }
            else {
                toolbar.removeClass('toolbar-hidden toolbar-hiding not-animated');
            }
                
        };
        

        /*======================================================
        ************   XHR   ************
        ======================================================*/
        // XHR Caching
        app.cache = [];
        app.removeFromCache = function (url) {
            var index = false;
            for (var i = 0; i < app.cache.length; i++) {
                if (app.cache[i].url === url) index = i;
            }
            if (index !== false) app.cache.splice(index, 1);
        };
        
        // XHR
        app.xhr = false;
        app.get = function (url, view, ignoreCache, callback) {
            // should we ignore get params or not
            var _url = url;
            if (app.params.cacheIgnoreGetParameters && url.indexOf('?') >= 0) {
                _url = url.split('?')[0];
            }
            if (app.params.cache && !ignoreCache && url.indexOf('nocache') < 0 && app.params.cacheIgnore.indexOf(_url) < 0) {
                // Check is the url cached
                for (var i = 0; i < app.cache.length; i++) {
                    if (app.cache[i].url === _url) {
                        // Check expiration
                        if ((new Date()).getTime() - app.cache[i].time < app.params.cacheDuration) {
                            // Load from cache
                            callback(app.cache[i].content);
                            return false;
                        }
                    }
                }
            }
        
            app.xhr = $.ajax({
                url: url,
                method: 'GET',
                beforeSend: app.params.onAjaxStart,
                complete: function (xhr, status) {
                    if (status !== 'error' && status !== 'timeout' && (xhr.status >= 200 && xhr.status < 300) || xhr.status === 0) {
                        if (app.params.cache && xhr.responseText !== '') {
                            app.removeFromCache(_url);
                            app.cache.push({
                                url: _url,
                                time: (new Date()).getTime(),
                                content: xhr.responseText
                            });
                        }
                        callback(xhr.responseText, false);
                    }
                    else {
                        callback(xhr.responseText, true);
                    }
                    if (app.params.onAjaxComplete) app.params.onAjaxComplete(xhr);
                },
                error: function (xhr) {
                    callback(xhr.responseText, true);
                    if (app.params.onAjaxError) app.params.onAjaxError(xhr);
                }
            });
            if (view) view.xhr = app.xhr;
        
            return app.xhr;
        };
        

        /*======================================================
        ************   Pages   ************
        ======================================================*/
        // Page Callbacks API
        app.pageCallbacks = {};
        
        app.onPage = function (callbackName, pageName, callback) {
            if (pageName && pageName.split(' ').length > 1) {
                var pageNames = pageName.split(' ');
                var returnCallbacks = [];
                for (var i = 0; i < pageNames.length; i++) {
                    returnCallbacks.push(app.onPage(callbackName, pageNames[i], callback));
                }
                returnCallbacks.remove = function () {
                    for (var i = 0; i < returnCallbacks.length; i++) {
                        returnCallbacks[i].remove();
                    }
                };
                returnCallbacks.trigger = function () {
                    for (var i = 0; i < returnCallbacks.length; i++) {
                        returnCallbacks[i].trigger();
                    }
                };
                return returnCallbacks;
            }
            var callbacks = app.pageCallbacks[callbackName][pageName];
            if (!callbacks) {
                callbacks = app.pageCallbacks[callbackName][pageName] = [];
            }
            app.pageCallbacks[callbackName][pageName].push(callback);
            return {
                remove: function () {
                    var removeIndex;
                    for (var i = 0; i < callbacks.length; i++) {
                        if (callbacks[i].toString() === callback.toString()) {
                            removeIndex = i;
                        }
                    }
                    if (typeof removeIndex !== 'undefined') callbacks.splice(removeIndex, 1);
                },
                trigger: callback
            };
        };
        
        //Create callbacks methods dynamically
        function createPageCallback(callbackName) {
            var capitalized = callbackName.replace(/^./, function (match) {
                return match.toUpperCase();
            });
            app['onPage' + capitalized] = function (pageName, callback) {
                return app.onPage(callbackName, pageName, callback);
            };
        }
        
        var pageCallbacksNames = ('beforeInit init reinit beforeAnimation afterAnimation back afterBack beforeRemove').split(' ');
        for (var i = 0; i < pageCallbacksNames.length; i++) {
            app.pageCallbacks[pageCallbacksNames[i]] = {};
            createPageCallback(pageCallbacksNames[i]);
        }
        
        app.triggerPageCallbacks = function (callbackName, pageName, pageData) {
            var allPagesCallbacks = app.pageCallbacks[callbackName]['*'];
            if (allPagesCallbacks) {
                for (var j = 0; j < allPagesCallbacks.length; j++) {
                    allPagesCallbacks[j](pageData);
                }
            }
            var callbacks = app.pageCallbacks[callbackName][pageName];
            if (!callbacks || callbacks.length === 0) return;
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](pageData);
            }
        };
        
        // On Page Init Callback
        app.pageInitCallback = function (view, params) {
            var pageContainer = params.pageContainer;
            if (!pageContainer) return;
            if (pageContainer.f7PageInitialized && view && !view.params.domCache) return;
        
            var pageQuery = params.query;
            if (!pageQuery) {
                if (params.url && params.url.indexOf('?') > 0) {
                    pageQuery = $.parseUrlQuery(params.url || '');
                }
                else if (pageContainer.f7PageData && pageContainer.f7PageData.query) {
                    pageQuery = pageContainer.f7PageData.query;
                }
                else {
                    pageQuery = {};
                }
            }
        
            // Page Data
            var pageData = {
                container: pageContainer,
                url: params.url,
                query: pageQuery,
                name: $(pageContainer).attr('data-page'),
                view: view,
                from: params.position,
                context: params.context,
                navbarInnerContainer: params.navbarInnerContainer,
                fromPage: params.fromPage
            };
            if (params.fromPage && !params.fromPage.navbarInnerContainer && params.oldNavbarInnerContainer) {
                params.fromPage.navbarInnerContainer = params.oldNavbarInnerContainer;
            }
        
            if (pageContainer.f7PageInitialized && ((view && view.params.domCache) || (!view && $(pageContainer).parents('.popup, .popover, .login-screen, .modal, .actions-modal, .picker-modal').length > 0))) {
                // Reinit Page
                app.reinitPage(pageContainer);
        
                // Callbacks
                app.pluginHook('pageReinit', pageData);
                if (app.params.onPageReinit) app.params.onPageReinit(app, pageData);
                app.triggerPageCallbacks('reinit', pageData.name, pageData);
                $(pageData.container).trigger('pageReinit page:reinit', {page: pageData});
                return;
            }
            pageContainer.f7PageInitialized = true;
        
            // Store pagedata in page
            pageContainer.f7PageData = pageData;
        
            // Update View's activePage
            if (view && !params.preloadOnly && !params.reloadPrevious) {
                // Add data-page on view
                $(view.container).attr('data-page', pageData.name);
                // Update View active page data
                view.activePage = pageData;
            }
        
            // Before Init Callbacks
            app.pluginHook('pageBeforeInit', pageData);
            if (app.params.onPageBeforeInit) app.params.onPageBeforeInit(app, pageData);
            app.triggerPageCallbacks('beforeInit', pageData.name, pageData);
            $(pageData.container).trigger('pageBeforeInit page:beforeinit', {page: pageData});
        
            // Init page
            app.initPage(pageContainer);
        
            // Init Callback
            app.pluginHook('pageInit', pageData);
            if (app.params.onPageInit) app.params.onPageInit(app, pageData);
            app.triggerPageCallbacks('init', pageData.name, pageData);
            $(pageData.container).trigger('pageInit page:init', {page: pageData});
        };
        app.pageRemoveCallback = function (view, pageContainer, position) {
            var pageContext;
            if (!pageContainer) return;
            if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;
            // Page Data
            var pageData = {
                container: pageContainer,
                name: $(pageContainer).attr('data-page'),
                view: view,
                url: pageContainer.f7PageData && pageContainer.f7PageData.url,
                query: pageContainer.f7PageData && pageContainer.f7PageData.query,
                navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
                from: position,
                context: pageContext
            };
            // Before Init Callback
            app.pluginHook('pageBeforeRemove', pageData);
            if (app.params.onPageBeforeRemove) app.params.onPageBeforeRemove(app, pageData);
            app.triggerPageCallbacks('beforeRemove', pageData.name, pageData);
            $(pageData.container).trigger('pageBeforeRemove page:beforeremove', {page: pageData});
            pageData = null;
        };
        app.pageBackCallback = function (callback, view, params) {
            // Page Data
            var pageContainer = params.pageContainer;
            var pageContext;
            if (!pageContainer) return;
            if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;
        
            var pageData = {
                container: pageContainer,
                name: $(pageContainer).attr('data-page'),
                url: pageContainer.f7PageData && pageContainer.f7PageData.url,
                query: pageContainer.f7PageData && pageContainer.f7PageData.query,
                view: view,
                from: params.position,
                context: pageContext,
                navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
                swipeBack: params.swipeBack
            };
        
            if (callback === 'after') {
                app.pluginHook('pageAfterBack', pageData);
                if (app.params.onPageAfterBack) app.params.onPageAfterBack(app, pageData);
                app.triggerPageCallbacks('afterBack', pageData.name, pageData);
                $(pageContainer).trigger('pageAfterBack page:afterback', {page: pageData});
        
            }
            if (callback === 'before') {
                app.pluginHook('pageBack', pageData);
                if (app.params.onPageBack) app.params.onPageBack(app, pageData);
                app.triggerPageCallbacks('back', pageData.name, pageData);
                $(pageData.container).trigger('pageBack page:back', {page: pageData});
            }
        };
        app.pageAnimCallback = function (callback, view, params) {
            var pageContainer = params.pageContainer;
            var pageContext;
            if (!pageContainer) return;
            if (pageContainer.f7PageData) pageContext = pageContainer.f7PageData.context;
        
            var pageQuery = params.query;
            if (!pageQuery) {
                if (params.url && params.url.indexOf('?') > 0) {
                    pageQuery = $.parseUrlQuery(params.url || '');
                }
                else if (pageContainer.f7PageData && pageContainer.f7PageData.query) {
                    pageQuery = pageContainer.f7PageData.query;
                }
                else {
                    pageQuery = {};
                }
            }
            // Page Data
            var pageData = {
                container: pageContainer,
                url: params.url,
                query: pageQuery,
                name: $(pageContainer).attr('data-page'),
                view: view,
                from: params.position,
                context: pageContext,
                swipeBack: params.swipeBack,
                navbarInnerContainer: pageContainer.f7PageData && pageContainer.f7PageData.navbarInnerContainer,
                fromPage: params.fromPage
            };
            var oldPage = params.oldPage,
                newPage = params.newPage;
        
            // Update page date
            pageContainer.f7PageData = pageData;
        
            if (callback === 'after') {
                app.pluginHook('pageAfterAnimation', pageData);
                if (app.params.onPageAfterAnimation) app.params.onPageAfterAnimation(app, pageData);
                app.triggerPageCallbacks('afterAnimation', pageData.name, pageData);
                $(pageData.container).trigger('pageAfterAnimation page:afteranimation', {page: pageData});
        
            }
            if (callback === 'before') {
                // Add data-page on view
                $(view.container).attr('data-page', pageData.name);
        
                // Update View's activePage
                if (view) view.activePage = pageData;
        
                // Hide/show navbar dynamically
                if (newPage.hasClass('no-navbar') && !oldPage.hasClass('no-navbar')) {
                    view.hideNavbar();
                }
                if (!newPage.hasClass('no-navbar') && (oldPage.hasClass('no-navbar') || oldPage.hasClass('no-navbar-by-scroll'))) {
                    view.showNavbar();
                }
                // Hide/show navbar toolbar
                if (newPage.hasClass('no-toolbar') && !oldPage.hasClass('no-toolbar')) {
                    view.hideToolbar();
                }
                if (!newPage.hasClass('no-toolbar') && (oldPage.hasClass('no-toolbar') || oldPage.hasClass('no-toolbar-by-scroll'))) {
                    view.showToolbar();
                }
                // Hide/show tabbar
                var tabBar;
                if (newPage.hasClass('no-tabbar') && !oldPage.hasClass('no-tabbar')) {
                    tabBar = $(view.container).find('.tabbar');
                    if (tabBar.length === 0) tabBar = $(view.container).parents('.' + app.params.viewsClass).find('.tabbar');
                    app.hideToolbar(tabBar);
                }
                if (!newPage.hasClass('no-tabbar') && (oldPage.hasClass('no-tabbar') || oldPage.hasClass('no-tabbar-by-scroll'))) {
                    tabBar = $(view.container).find('.tabbar');
                    if (tabBar.length === 0) tabBar = $(view.container).parents('.' + app.params.viewsClass).find('.tabbar');
                    app.showToolbar(tabBar);
                }
        
                oldPage.removeClass('no-navbar-by-scroll no-toolbar-by-scroll');
                // Callbacks
                app.pluginHook('pageBeforeAnimation', pageData);
                if (app.params.onPageBeforeAnimation) app.params.onPageBeforeAnimation(app, pageData);
                app.triggerPageCallbacks('beforeAnimation', pageData.name, pageData);
                $(pageData.container).trigger('pageBeforeAnimation page:beforeanimation', {page: pageData});
            }
        };
        
        // Init Page Events and Manipulations
        app.initPage = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length === 0) return;
            // Size navbars on page load
            if (app.sizeNavbars) app.sizeNavbars(pageContainer.parents('.' + app.params.viewClass)[0]);
            // Init messages
            if (app.initPageMessages) app.initPageMessages(pageContainer);
            // Init forms storage
            if (app.initFormsStorage) app.initFormsStorage(pageContainer);
            // Init smart select
            if (app.initSmartSelects) app.initSmartSelects(pageContainer);
            // Init slider
            if (app.initPageSwiper) app.initPageSwiper(pageContainer);
            // Init pull to refres
            if (app.initPullToRefresh) app.initPullToRefresh(pageContainer);
            // Init infinite scroll
            if (app.initPageInfiniteScroll) app.initPageInfiniteScroll(pageContainer);
            // Init searchbar
            if (app.initSearchbar) app.initSearchbar(pageContainer);
            // Init message bar
            if (app.initPageMessagebar) app.initPageMessagebar(pageContainer);
            // Init scroll toolbars
            if (app.initPageScrollToolbars) app.initPageScrollToolbars(pageContainer);
            // Init lazy images
            if (app.initImagesLazyLoad) app.initImagesLazyLoad(pageContainer);
            // Init progress bars
            if (app.initPageProgressbar) app.initPageProgressbar(pageContainer);
            // Init resizeable textareas
            if (app.initPageResizableTextarea) app.initPageResizableTextarea(pageContainer);
            // Init Data Table
            if (app.initPageDataTables) app.initPageDataTables(pageContainer);
            // Init Material Preloader
            if (app.params.material && app.initPageMaterialPreloader) app.initPageMaterialPreloader(pageContainer);
            // Init Material Inputs
            if (app.params.material && app.initPageMaterialInputs) app.initPageMaterialInputs(pageContainer);
            // Init Material Tabbar
            if (app.params.material && app.initPageMaterialTabbar) app.initPageMaterialTabbar(pageContainer);
        };
        app.reinitPage = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length === 0) return;
            // Size navbars on page reinit
            if (app.sizeNavbars) app.sizeNavbars(pageContainer.parents('.' + app.params.viewClass)[0]);
            // Reinit slider
            if (app.reinitPageSwiper) app.reinitPageSwiper(pageContainer);
            // Reinit lazy load
            if (app.reinitLazyLoad) app.reinitLazyLoad(pageContainer);
        };
        app.initPageWithCallback = function (pageContainer) {
            pageContainer = $(pageContainer);
            var viewContainer = pageContainer.parents('.' + app.params.viewClass);
            if (viewContainer.length === 0) return;
            var view = viewContainer[0].f7View || undefined;
            var url = view && view.url ? view.url : undefined;
            if (viewContainer && pageContainer.attr('data-page')) {
                viewContainer.attr('data-page', pageContainer.attr('data-page'));
            }
            app.pageInitCallback(view, {pageContainer: pageContainer[0], url: url, position: 'center'});
        };
        

        /*======================================================
        ************   Navigation / Router   ************
        ======================================================*/
        app.router = {
            _remove: function (el) {
                if (app.params.routerRemoveTimeout || app.params.routerRemoveWithTimeout) {
                    setTimeout(function () {
                        $(el).remove();
                    }, 0);
                }
                else $(el).remove();
            },
            _modalsSelector: '.popup, .modal, .popover, .actions-modal, .picker-modal, .login-screen',
            // Temporary DOM Element
            temporaryDom: document.createElement('div'),
        
            // Find page or navbar in passed container which are related to View
            findElement: function (selector, container, view, notCached) {
                container = $(container);
                if (notCached) selector = selector + ':not(.cached)';
                var found = container.find(selector).filter(function (index, el) {
                    return $(el).parents(app.router._modalsSelector).length === 0;
                });
                if (found.length > 1) {
                    if (typeof view.selector === 'string') {
                        // Search in related view
                        found = container.find(view.selector + ' ' + selector);
                    }
                    if (found.length > 1) {
                        // Search in main view
                        found = container.find('.' + app.params.viewMainClass + ' ' + selector);
                    }
                }
                if (found.length === 1) return found;
                else {
                    // Try to find non cached
                    if (!notCached) found = app.router.findElement(selector, container, view, true);
                    if (found && found.length === 1) return found;
                    if (found && found.length > 1) return $(found[0]);
                    else return undefined;
                }
            },
        
            // Set pages classes for animationEnd
            animatePages: function (leftPage, rightPage, direction) {
                // Loading new page
                var removeClasses = 'page-on-center page-on-right page-on-left';
                if (direction === 'to-left') {
                    leftPage.removeClass(removeClasses).addClass('page-from-center-to-left');
                    rightPage.removeClass(removeClasses).addClass('page-from-right-to-center');
                }
                // Go back
                if (direction === 'to-right') {
                    leftPage.removeClass(removeClasses).addClass('page-from-left-to-center');
                    rightPage.removeClass(removeClasses).addClass('page-from-center-to-right');
        
                }
            },
        
            // Prepare navbar before animarion
            prepareNavbar: function (newNavbarInner, oldNavbarInner, newNavbarPosition) {
                $(newNavbarInner).find('.sliding').each(function () {
                    var sliding = $(this);
                    var slidingOffset = newNavbarPosition === 'right' ? this.f7NavbarRightOffset : this.f7NavbarLeftOffset;
        
                    if (app.params.animateNavBackIcon) {
                        if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                            sliding.find('.back .icon').transform('translate3d(' + (-slidingOffset) + 'px,0,0)');
                        }
                    }
                    sliding.transform('translate3d(' + slidingOffset + 'px,0,0)');
                });
            },
        
            // Set navbars classes for animation
            animateNavbars: function (leftNavbarInner, rightNavbarInner, direction) {
                // Loading new page
                var removeClasses = 'navbar-on-right navbar-on-center navbar-on-left';
                if (direction === 'to-left') {
                    rightNavbarInner.removeClass(removeClasses).addClass('navbar-from-right-to-center');
                    rightNavbarInner.find('.sliding').each(function () {
                        var sliding = $(this);
                        sliding.transform('translate3d(0px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                                sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                            }
                        }
                    });
        
                    leftNavbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-left');
                    leftNavbarInner.find('.sliding').each(function () {
                        var sliding = $(this);
                        var rightText;
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('center') && rightNavbarInner.find('.sliding.left .back .icon').length > 0) {
                                rightText = rightNavbarInner.find('.sliding.left .back span');
                                if (rightText.length > 0) this.f7NavbarLeftOffset += rightText[0].offsetLeft;
                            }
                            if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                                sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarLeftOffset) + 'px,0,0)');
                            }
                        }
                        sliding.transform('translate3d(' + (this.f7NavbarLeftOffset) + 'px,0,0)');
                    });
                }
                // Go back
                if (direction === 'to-right') {
                    leftNavbarInner.removeClass(removeClasses).addClass('navbar-from-left-to-center');
                    leftNavbarInner.find('.sliding').each(function () {
                        var sliding = $(this);
                        sliding.transform('translate3d(0px,0,0)');
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                                sliding.find('.back .icon').transform('translate3d(0px,0,0)');
                            }
                        }
                    });
        
                    rightNavbarInner.removeClass(removeClasses).addClass('navbar-from-center-to-right');
                    rightNavbarInner.find('.sliding').each(function () {
                        var sliding = $(this);
                        if (app.params.animateNavBackIcon) {
                            if (sliding.hasClass('left') && sliding.find('.back .icon').length > 0) {
                                sliding.find('.back .icon').transform('translate3d(' + (-this.f7NavbarRightOffset) + 'px,0,0)');
                            }
                        }
                        sliding.transform('translate3d(' + (this.f7NavbarRightOffset) + 'px,0,0)');
                    });
                }
            },
        
            preprocess: function(view, content, url, next) {
                // Plugin hook
                app.pluginHook('routerPreprocess', view, content, url, next);
        
                // Preprocess by plugin
                content = app.pluginProcess('preprocess', content);
        
                if (view && view.params && view.params.preprocess) {
                    content = view.params.preprocess(content, url, next);
                    if (typeof content !== 'undefined') {
                        next(content);
                    }
                }
                else if (app.params.preprocess) {
                    content = app.params.preprocess(content, url, next);
                    if (typeof content !== 'undefined') {
                        next(content);
                    }
                }
                else {
                    next(content);
                }
            },
            preroute: function(view, options, isBack) {
                if (isBack) options.isBack = true;
                app.pluginHook('routerPreroute', view, options);
                if ((app.params.preroute && app.params.preroute(view, options) === false) || (view && view.params.preroute && view.params.preroute(view, options) === false)) {
                    return true;
                }
                else {
                    return false;
                }
            },
        
            template7Render: function (view, options) {
                var url = options.url,
                    content = options.content, //initial content
                    t7_rendered_content = options.content, // will be rendered using Template7
                    context = options.context, // Context data for Template7
                    contextName = options.contextName,
                    template = options.template; // Template 7 compiled template
        
                var t7_ctx, t7_template;
                if (typeof content === 'string') {
                    if (url) {
                        if (app.template7Cache[url] && !options.ignoreCache) t7_template = t7.cache[url];
                        else {
                            t7_template = t7.compile(content);
                            t7.cache[url] = t7_template;
                        }
                    }
                    else t7_template = t7.compile(content);
                }
                else if (template) {
                    t7_template = template;
                }
        
                if (context) {
                    t7_ctx = context;
                    if (context && url) {
                        view.contextCache[url] = context;
                    }
                }
                else {
                    if (contextName) {
                        if (contextName.indexOf('.') >= 0) {
                            var _ctx_path = contextName.split('.');
                            var _ctx = t7.data[_ctx_path[0]];
                            for (var i = 1; i < _ctx_path.length; i++) {
                                if (_ctx_path[i]) _ctx = _ctx[_ctx_path[i]];
                            }
                            t7_ctx = _ctx;
                        }
                        else t7_ctx = t7.data[contextName];
                    }
                    if (!t7_ctx && url) {
                        t7_ctx = t7.data['url:' + url];
                    }
                    if (!t7_ctx && typeof content === 'string' && !template) {
                        //try to find by page name in content
                        var pageNameMatch = content.match(/(data-page=["'][^"^']*["'])/);
                        if (pageNameMatch) {
                            var page = pageNameMatch[0].split('data-page=')[1].replace(/['"]/g, '');
                            if (page) t7_ctx = t7.data['page:' + page];
                        }
                    }
                    if (!t7_ctx && template && t7.templates) {
                        // Try to find matched template name in t7.templates
                        for (var templateName in t7.templates) {
                            if (t7.templates[templateName] === template) t7_ctx = t7.data[templateName];
                        }
                    }
                    if (!t7_ctx && url && url in view.contextCache) {
                        t7_ctx = view.contextCache[url];
                    }
                    if (!t7_ctx) {
                        t7_ctx = {};
                    }
                }
        
                if (t7_template && t7_ctx) {
                    if (typeof t7_ctx === 'function') t7_ctx = t7_ctx();
                    if (url) {
                        // Extend data with URL query
                        var query = $.parseUrlQuery(url);
                        t7_ctx.url_query = {};
                        for (var key in query) {
                            t7_ctx.url_query[key] = query[key];
                        }
                    }
                    try {
                        t7_rendered_content = t7_template(t7_ctx);
                    }
                    catch (e) {
                        t7_rendered_content = '';
                        if (window.console && window.console.error) {
                            console.error(e);
                        }
                    }
                }
        
                return {content: t7_rendered_content, context: t7_ctx};
            }
        };
        
        
        app.router._load = function (view, options) {
            // Plugin hook
            app.pluginHook('routerLoad', view, options);
        
            var url = options.url,
                content = options.content, //initial content
                t7_rendered = {content: options.content},
                template = options.template, // Template 7 compiled template
                pageName = options.pageName,
                viewContainer = $(view.container),
                pagesContainer = $(view.pagesContainer),
                animatePages = options.animatePages,
                newPage, oldPage, pagesInView, i, oldNavbarInner, newNavbarInner, navbar, dynamicNavbar, reloadPosition,
                isDynamicPage = typeof url === 'undefined' && content || template,
                pushState = options.pushState,
                pageElement = options.pageElement;
        
            if (typeof animatePages === 'undefined') animatePages = view.params.animatePages;
        
            // Render with Template7
            if (app.params.template7Pages && typeof content === 'string' || template) {
                t7_rendered = app.router.template7Render(view, options);
                if (t7_rendered.content && !content) {
                    content = t7_rendered.content;
                }
            }
        
            app.router.temporaryDom.innerHTML = '';
        
            // Parse DOM
            if (!pageName && !pageElement) {
                if ((typeof content === 'string') || (url && (typeof content === 'string'))) {
                    app.router.temporaryDom.innerHTML = t7_rendered.content;
                } else {
                    if ('length' in content && content.length > 1) {
                        for (var ci = 0; ci < content.length; ci++) {
                            $(app.router.temporaryDom).append(content[ci]);
                        }
                    } else {
                        $(app.router.temporaryDom).append(content);
                    }
                }
            }
        
            // Reload position
            reloadPosition = options.reload && (options.reloadPrevious ? 'left' : 'center');
        
            // Find new page
            if (pageName) newPage = pagesContainer.find('.page[data-page="' + pageName + '"]');
            else {
                if (pageElement) newPage = $(pageElement);
                else newPage = app.router.findElement('.page', app.router.temporaryDom, view);
            }
            // If page not found exit
            if (!newPage || newPage.length === 0 || (pageName && view.activePage && view.activePage.name === pageName)) {
                view.allowPageChange = true;
                return;
            }
        
            newPage.addClass(options.reload ? 'page-on-' + reloadPosition : 'page-on-right');
        
            // Find old page (should be the last one) and remove older pages
            pagesInView = pagesContainer.children('.page:not(.cached)');
            if (pageElement) {
                pagesInView = pagesInView.filter(function (index, page) {
                    if (page !== pageElement) return page;
                });
            }
        
            if (options.reload && options.reloadPrevious && pagesInView.length === 1)  {
                view.allowPageChange = true;
                return;
            }
        
            if (options.reload) {
                oldPage = pagesInView.eq(pagesInView.length - 1);
            }
            else {
                if (pagesInView.length > 1) {
                    for (i = 0; i < pagesInView.length - 2; i++) {
                        if (!view.params.domCache) {
                            app.pageRemoveCallback(view, pagesInView[i], 'left');
                            app.router._remove(pagesInView[i]);
                        }
                        else {
                            $(pagesInView[i]).addClass('cached');
                        }
                    }
                    if (!view.params.domCache) {
                        app.pageRemoveCallback(view, pagesInView[i], 'left');
                        app.router._remove(pagesInView[i]);
                    }
                    else {
                        $(pagesInView[i]).addClass('cached');
                    }
                }
                oldPage = pagesContainer.children('.page:not(.cached)');
            }
            if (pageElement && oldPage.length > 1) {
                oldPage = oldPage.filter(function (index, page) {
                    if (page !== pageElement) return page;
                });
            }
            if(view.params.domCache || pageElement) newPage.removeClass('cached');
        
            // Dynamic navbar
            if (view.params.dynamicNavbar) {
                dynamicNavbar = true;
                // Find navbar
                if (pageName) {
                    newNavbarInner = viewContainer.find('.navbar-inner[data-page="' + pageName + '"]');
                }
                else {
                    newNavbarInner = app.router.findElement('.navbar-inner', app.router.temporaryDom, view);
                }
                if (!newNavbarInner || newNavbarInner.length === 0) {
                    // Look in page
                    newNavbarInner = newPage.find('.navbar-inner');
                    if (!newNavbarInner || newNavbarInner.length === 0) {
                        // Set false
                        dynamicNavbar = false;
                    }
                    else {
                        if (newNavbarInner.parent('.navbar').length > 0) {
                            newNavbarInner.prependTo(newPage);
                        }
                    }
                }
                if (dynamicNavbar && newPage.find('.navbar').length > 0) {
                    app.router._remove(newPage.find('.navbar').filter(function(index, el){
                        return $(el).parents(app.router._modalsSelector).length === 0;
                    }));
                }
                navbar = viewContainer.children('.navbar');
                if (options.reload) {
                    oldNavbarInner = navbar.find('.navbar-inner:not(.cached):last-child');
                }
                else {
                    oldNavbarInner = navbar.find('.navbar-inner:not(.cached)');
        
                    if (oldNavbarInner.length > 0) {
                        for (i = 0; i < oldNavbarInner.length - 1; i++) {
                            if (!view.params.domCache) {
                                app.navbarRemoveCallback(view, pagesInView[i], navbar[0], oldNavbarInner[i]);
                                app.router._remove(oldNavbarInner[i]);
                            }
                            else
                                $(oldNavbarInner[i]).addClass('cached');
                        }
                        if (!newNavbarInner && oldNavbarInner.length === 1) {
                            if (!view.params.domCache) {
                                app.navbarRemoveCallback(view, pagesInView[0], navbar[0], oldNavbarInner[0]);
                                app.router._remove(oldNavbarInner[0]);
                            }
                            else
                                $(oldNavbarInner[0]).addClass('cached');
                        }
                        oldNavbarInner = navbar.find('.navbar-inner:not(.cached)');
                    }
                }
            }
            if (dynamicNavbar) {
                newNavbarInner.addClass(options.reload ? 'navbar-on-' + reloadPosition : 'navbar-on-right');
                if(view.params.domCache || pageElement) newNavbarInner.removeClass('cached');
                newPage[0].f7RelatedNavbar = newNavbarInner[0];
                newNavbarInner[0].f7RelatedPage = newPage[0];
            }
        
            // save content areas into view's cache
            if (!url) {
                var newPageName = pageName || newPage.attr('data-page');
                if (isDynamicPage) url = '#' + app.params.dynamicPageUrl.replace(/{{name}}/g, newPageName).replace(/{{index}}/g, view.history.length - (options.reload ? 1 : 0));
                else url = '#' + newPageName;
                if (!view.params.domCache) {
                    view.contentCache[url] = content;
                }
                if (view.params.domCache && pageName) {
                    view.pagesCache[url] = pageName;
                }
            }
            else if (url && pageElement) {
                view.pageElementsCache[url] = {
                    page: newPage,
                    navbarInner: newNavbarInner
                };
            }
        
            // Push State
            if (app.params.pushState && !options.reloadPrevious && view.main)  {
                if (typeof pushState === 'undefined') pushState = true;
                var pushStateRoot = app.params.pushStateRoot || '';
                var method = options.reload ? 'replaceState' : 'pushState';
                if (pushState) {
                    if (!isDynamicPage && !pageName) {
                        history[method]({url: url, viewIndex: app.views.indexOf(view)}, '', pushStateRoot + app.params.pushStateSeparator + url);
                    }
                    else if (isDynamicPage && content) {
                        history[method]({content: typeof content === 'string' ? content : '', url: url, viewIndex: app.views.indexOf(view)}, '', pushStateRoot + app.params.pushStateSeparator + url);
                    }
                    else if (pageName) {
                        history[method]({pageName: pageName, url: url, viewIndex: app.views.indexOf(view)}, '', pushStateRoot + app.params.pushStateSeparator + url);
                    }
                }
            }
        
            // Update View history
            view.url = url;
            if (options.reload) {
                var lastUrl = view.history[view.history.length - (options.reloadPrevious ? 2 : 1)];
                if (lastUrl &&
                    lastUrl.indexOf('#') === 0 &&
                    lastUrl in view.contentCache &&
                    lastUrl !== url &&
                    view.history.indexOf(lastUrl) === -1) {
                    view.contentCache[lastUrl] = null;
                    delete view.contentCache[lastUrl];
                }
                else if (lastUrl &&
                    lastUrl in view.pageElementsCache &&
                    lastUrl !== url &&
                    (view.history.indexOf(lastUrl) === -1 || view.history.indexOf(lastUrl) === view.history.length - 1)) {
                    view.pageElementsCache[lastUrl] = null;
                    delete view.pageElementsCache[lastUrl];
                }
                if (lastUrl &&
                    lastUrl in view.contextCache &&
                    lastUrl !== url &&
                    (view.history.indexOf(lastUrl) === -1 || view.history.indexOf(lastUrl) === view.history.length - 1)) {
                    view.contextCache[lastUrl] = null;
                    delete view.contextCache[lastUrl];
                }
                view.history[view.history.length - (options.reloadPrevious ? 2 : 1)] = url;
            }
            else {
                view.history.push(url);
            }
        
            // Unique history
            var historyBecameUnique = false;
            if (view.params.uniqueHistory) {
                var _history = view.history;
                var _url = url;
                if (view.params.uniqueHistoryIgnoreGetParameters) {
                    _history = [];
                    _url = url.split('?')[0];
                    for (i = 0; i < view.history.length; i++) {
                        _history.push(view.history[i].split('?')[0]);
                    }
                }
        
                if (_history.indexOf(_url) !== _history.lastIndexOf(_url)) {
                    view.history = view.history.slice(0, _history.indexOf(_url));
                    view.history.push(url);
                    historyBecameUnique = true;
                }
            }
            // Dom manipulations
            if (options.reloadPrevious) {
                oldPage = oldPage.prev('.page');
                newPage.insertBefore(oldPage);
                if (dynamicNavbar) {
                    oldNavbarInner = oldNavbarInner.prev('.navbar-inner');
                    newNavbarInner.insertAfter(oldNavbarInner);
                }
            }
            else {
                pagesContainer.append(newPage[0]);
                if (dynamicNavbar) navbar.append(newNavbarInner[0]);
            }
            // Remove Old Page And Navbar
            if (options.reload) {
                if (view.params.domCache && view.initialPages.indexOf(oldPage[0]) >= 0) {
                    oldPage.addClass('cached');
                    if (dynamicNavbar) oldNavbarInner.addClass('cached');
                }
                else {
                    app.pageRemoveCallback(view, oldPage[0], reloadPosition);
                    if (dynamicNavbar) app.navbarRemoveCallback(view, oldPage[0], navbar[0], oldNavbarInner[0]);
                    app.router._remove(oldPage);
                    if (dynamicNavbar) app.router._remove(oldNavbarInner);
                }
            }
        
            // Page Init Events
            app.pageInitCallback(view, {
                pageContainer: newPage[0],
                url: url,
                position: options.reload ? reloadPosition : 'right',
                navbarInnerContainer: dynamicNavbar ? newNavbarInner && newNavbarInner[0] : undefined,
                oldNavbarInnerContainer: dynamicNavbar ? oldNavbarInner && oldNavbarInner[0] : undefined,
                context: t7_rendered.context || options.context,
                query: options.query,
                fromPage: oldPage && oldPage.length && oldPage[0].f7PageData,
                reload: options.reload,
                reloadPrevious: options.reloadPrevious
            });
        
            // Navbar init event
            if (dynamicNavbar) {
                app.navbarInitCallback(view, newPage[0], navbar[0], newNavbarInner[0], url, options.reload ? reloadPosition : 'right');
            }
        
            if (options.reload) {
                view.allowPageChange = true;
                if (historyBecameUnique) view.refreshPreviousPage();
                return;
            }
        
            if (dynamicNavbar && animatePages) {
                app.router.prepareNavbar(newNavbarInner, oldNavbarInner, 'right');
            }
            // Force reLayout
            var clientLeft = newPage[0].clientLeft;
        
            // Before Anim Callback
            app.pageAnimCallback('before', view, {
                pageContainer: newPage[0],
                url: url,
                position: 'right',
                oldPage: oldPage,
                newPage: newPage,
                query: options.query,
                fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
            });
        
            function afterAnimation() {
                view.allowPageChange = true;
                newPage.removeClass('page-from-right-to-center page-on-right page-on-left').addClass('page-on-center');
                oldPage.removeClass('page-from-center-to-left page-on-center page-on-right').addClass('page-on-left');
                if (dynamicNavbar) {
                    newNavbarInner.removeClass('navbar-from-right-to-center navbar-on-left navbar-on-right').addClass('navbar-on-center');
                    oldNavbarInner.removeClass('navbar-from-center-to-left navbar-on-center navbar-on-right').addClass('navbar-on-left');
                }
                app.pageAnimCallback('after', view, {
                    pageContainer: newPage[0],
                    url: url,
                    position: 'right',
                    oldPage: oldPage,
                    newPage: newPage,
                    query: options.query,
                    fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
                });
                if (app.params.pushState && view.main) app.pushStateClearQueue();
                if (!(view.params.swipeBackPage || view.params.preloadPreviousPage)) {
                    if (view.params.domCache) {
                        oldPage.addClass('cached');
                        if (dynamicNavbar) oldNavbarInner.addClass('cached');
                    }
                    else {
                        if (!(url.indexOf('#') === 0 && newPage.attr('data-page').indexOf('smart-select-') === 0)) {
                            app.pageRemoveCallback(view, oldPage[0], 'left');
                            if (dynamicNavbar) app.navbarRemoveCallback(view, oldPage[0], navbar[0], oldNavbarInner[0]);
                            app.router._remove(oldPage);
                            if (dynamicNavbar) app.router._remove(oldNavbarInner);
                        }
                    }
                }
                if (view.params.uniqueHistory && historyBecameUnique) {
                    view.refreshPreviousPage();
                }
            }
            if (animatePages) {
                // Set pages before animation
                if (app.params.material && app.params.materialPageLoadDelay) {
                    setTimeout(function () {
                        app.router.animatePages(oldPage, newPage, 'to-left', view);
                    }, app.params.materialPageLoadDelay);
                }
                else {
                    app.router.animatePages(oldPage, newPage, 'to-left', view);
                }
        
                // Dynamic navbar animation
                if (dynamicNavbar) {
                    setTimeout(function() {
                        app.router.animateNavbars(oldNavbarInner, newNavbarInner, 'to-left', view);
                    }, 0);
                }
                newPage.animationEnd(function () {
                    afterAnimation();
                });
            }
            else {
                if (dynamicNavbar) newNavbarInner.find('.sliding, .sliding .back .icon').transform('');
                afterAnimation();
            }
        
        };
        
        app.router.load = function (view, options) {
            options = options || {};
            if (app.routerPreOptions) {
                options = app.routerPreOptions(view, options) || {};
            }
            if (options.component && app.componentLoader) {
                try {
                    app.componentLoader(view, options, function (newOptions) {
                        app.router.load(view, newOptions);
                    });
                } catch (e) {}
                return;
            }
            if (app.router.preroute(view, options)) {
                return false;
            }
            var url = options.url;
            var content = options.content;
            var pageName = options.pageName;
            var pageElement = options.pageElement;
            if (pageName) {
                if (pageName.indexOf('?') > 0) {
                    options.query = $.parseUrlQuery(pageName);
                    options.pageName = pageName = pageName.split('?')[0];
                }
            }
            var template = options.template;
            if (view.params.reloadPages === true) options.reload = true;
        
            if (!view.allowPageChange) return false;
            if (url && view.url === url && !options.reload && !view.params.allowDuplicateUrls) return false;
            view.allowPageChange = false;
            if (app.xhr && view.xhr && view.xhr === app.xhr) {
                app.xhr.abort();
                app.xhr = false;
            }
            function proceed(content) {
                app.router.preprocess(view, content, url, function (content) {
                    options.content = content;
                    app.router._load(view, options);
                });
            }
            if (content || pageName || pageElement) {
                proceed(content);
                return;
            }
            else if (template) {
                app.router._load(view, options);
                return;
            }
        
            if (!options.url || options.url === '#') {
                view.allowPageChange = true;
                return;
            }
            app.get(options.url, view, options.ignoreCache, function (content, error) {
                if (error) {
                    view.allowPageChange = true;
                    return;
                }
                proceed(content);
            });
        };
        
        app.router._back = function (view, options) {
            options = options || {};
        
            app.pluginHook('routerBack', view, options);
        
            var url = options.url,
                content = options.content,
                t7_rendered = {content: options.content}, // will be rendered using Template7
                template = options.template, // Template 7 compiled template
                animatePages = options.animatePages,
                preloadOnly = options.preloadOnly,
                pushState = options.pushState,
                ignoreCache = options.ignoreCache,
                force = options.force,
                pageName = options.pageName,
                pageElement = options.pageElement;
        
            var viewContainer = $(view.container),
                pagesContainer = $(view.pagesContainer),
                pagesInView = pagesContainer.children('.page:not(.cached)'),
                oldPage, newPage, oldNavbarInner, newNavbarInner, navbar, navbarInners, dynamicNavbar, manipulateDom = true;
        
            if (typeof animatePages === 'undefined') animatePages = view.params.animatePages;
        
            // Render with Template7
            if (app.params.template7Pages && typeof content === 'string' || template) {
                t7_rendered = app.router.template7Render(view, options);
                if (t7_rendered.content && !content) {
                    content = t7_rendered.content;
                }
            }
        
            // Animation
            function afterAnimation() {
                app.pageBackCallback('after', view, {
                    pageContainer: oldPage[0],
                    url: url,
                    position: 'center',
                    oldPage: oldPage,
                    newPage: newPage,
                });
                app.pageAnimCallback('after', view, {
                    pageContainer: newPage[0],
                    url: url,
                    position: 'left',
                    oldPage: oldPage,
                    newPage: newPage,
                    query: options.query,
                    fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
                });
                app.router.afterBack(view, oldPage[0], newPage[0]);
            }
            function animateBack() {
                // Page before animation callback
                app.pageBackCallback('before', view, {
                    pageContainer: oldPage[0],
                    url: url,
                    position: 'center',
                    oldPage: oldPage,
                    newPage: newPage,
                });
                app.pageAnimCallback('before', view, {
                    pageContainer: newPage[0],
                    url: url,
                    position: 'left',
                    oldPage: oldPage,
                    newPage: newPage,
                    query: options.query,
                    fromPage: oldPage && oldPage.length && oldPage[0].f7PageData
                });
        
                if (animatePages) {
                    // Set pages before animation
                    app.router.animatePages(newPage, oldPage, 'to-right', view);
        
                    // Dynamic navbar animation
                    if (dynamicNavbar) {
                        setTimeout(function () {
                            app.router.animateNavbars(newNavbarInner, oldNavbarInner, 'to-right', view);
                        }, 0);
                    }
        
                    newPage.animationEnd(function () {
                        afterAnimation();
                    });
                }
                else {
                    if (dynamicNavbar) newNavbarInner.find('.sliding, .sliding .back .icon').transform('');
                    afterAnimation();
                }
            }
        
            function parseNewPage() {
                app.router.temporaryDom.innerHTML = '';
                // Parse DOM
                if ((typeof content === 'string') || (url && (typeof content === 'string'))) {
                    app.router.temporaryDom.innerHTML = t7_rendered.content;
                } else {
                    if ('length' in content && content.length > 1) {
                        for (var ci = 0; ci < content.length; ci++) {
                            $(app.router.temporaryDom).append(content[ci]);
                        }
                    } else {
                        $(app.router.temporaryDom).append(content);
                    }
                }
                if (pageElement) newPage = $(pageElement);
                else newPage = app.router.findElement('.page', app.router.temporaryDom, view);
        
                if (view.params.dynamicNavbar) {
                    // Find navbar
                    newNavbarInner = app.router.findElement('.navbar-inner', app.router.temporaryDom, view);
                }
            }
            function setPages() {
                // If pages not found or there are still more than one, exit
                if (!newPage || newPage.length === 0) {
                    view.allowPageChange = true;
                    return;
                }
                if (view.params.dynamicNavbar && typeof dynamicNavbar === 'undefined') {
                    if (!newNavbarInner || newNavbarInner.length === 0) {
                        dynamicNavbar = false;
                    }
                    else {
                        dynamicNavbar = true;
                    }
                }
        
                newPage.addClass('page-on-left').removeClass('cached');
                if (dynamicNavbar) {
                    navbar = viewContainer.children('.navbar');
                    navbarInners = navbar.find('.navbar-inner:not(.cached)');
                    newNavbarInner.addClass('navbar-on-left').removeClass('cached');
                }
                // Remove/hide previous page in force mode
                if (force) {
                    var pageToRemove, navbarToRemove;
                    pageToRemove = $(pagesInView[pagesInView.length - 2]);
        
                    if (dynamicNavbar) navbarToRemove = $(pageToRemove[0] && pageToRemove[0].f7RelatedNavbar || navbarInners[navbarInners.length - 2]);
                    if (view.params.domCache && view.initialPages.indexOf(pageToRemove[0]) >= 0) {
                        if (pageToRemove.length && pageToRemove[0] !== newPage[0]) pageToRemove.addClass('cached');
                        if (dynamicNavbar && navbarToRemove.length && navbarToRemove[0] !== newNavbarInner[0]) {
                            navbarToRemove.addClass('cached');
                        }
                    }
                    else {
                        var removeNavbar = dynamicNavbar && navbarToRemove.length;
                        if (pageToRemove.length) {
                            app.pageRemoveCallback(view, pageToRemove[0], 'right');
                            if (removeNavbar) {
                                app.navbarRemoveCallback(view, pageToRemove[0], navbar[0], navbarToRemove[0]);
                            }
                            app.router._remove(pageToRemove);
                            if (removeNavbar) app.router._remove(navbarToRemove);
                        }
                        else if (removeNavbar) {
                            app.navbarRemoveCallback(view, pageToRemove[0], navbar[0], navbarToRemove[0]);
                            app.router._remove(navbarToRemove);
                        }
                    }
                    pagesInView = pagesContainer.children('.page:not(.cached)');
                    if (dynamicNavbar) {
                        navbarInners = viewContainer.children('.navbar').find('.navbar-inner:not(.cached)');
                    }
                    if (view.history.indexOf(url) >= 0) {
                        view.history = view.history.slice(0, view.history.indexOf(url) + 2);
                    }
                    else {
                        if (view.history[[view.history.length - 2]]) {
                            view.history[view.history.length - 2] = url;
                        }
                        else {
                            view.history.unshift(url);
                        }
                    }
                }
        
                oldPage = $(pagesInView[pagesInView.length - 1]);
                if (view.params.domCache) {
                    if (oldPage[0] === newPage[0]) {
                        oldPage = pagesContainer.children('.page.page-on-center');
                        if (oldPage.length === 0 && view.activePage) oldPage = $(view.activePage.container);
                    }
                }
        
                if (dynamicNavbar && !oldNavbarInner) {
                    oldNavbarInner = $(navbarInners[navbarInners.length - 1]);
                    if (view.params.domCache) {
                        if (oldNavbarInner[0] === newNavbarInner[0]) {
                            oldNavbarInner = navbar.children('.navbar-inner.navbar-on-center:not(.cached)');
                        }
                        if (oldNavbarInner.length === 0) {
                            oldNavbarInner = navbar.children('.navbar-inner[data-page="'+oldPage.attr('data-page')+'"]');
                        }
                    }
                    if (oldNavbarInner.length === 0 || newNavbarInner[0] === oldNavbarInner[0]) dynamicNavbar = false;
                }
        
                if (dynamicNavbar) {
                    if (manipulateDom) newNavbarInner.insertBefore(oldNavbarInner);
                    newNavbarInner[0].f7RelatedPage = newPage[0];
                    newPage[0].f7RelatedNavbar = newNavbarInner[0];
                }
                if (manipulateDom) newPage.insertBefore(oldPage);
        
                // Page Init Events
                app.pageInitCallback(view, {
                    pageContainer: newPage[0],
                    url: url,
                    position: 'left',
                    navbarInnerContainer: dynamicNavbar ? newNavbarInner[0] : undefined,
                    oldNavbarInnerContainer: dynamicNavbar ? oldNavbarInner && oldNavbarInner[0] : undefined,
                    context: t7_rendered.context,
                    query: options.query,
                    fromPage: oldPage && oldPage.length && oldPage[0].f7PageData,
                    preloadOnly: preloadOnly
                });
                if (dynamicNavbar) {
                    app.navbarInitCallback(view, newPage[0], navbar[0], newNavbarInner[0], url, 'right');
                }
        
                if (dynamicNavbar && newNavbarInner.hasClass('navbar-on-left') && animatePages) {
                    app.router.prepareNavbar(newNavbarInner,  oldNavbarInner, 'left');
                }
        
                if (preloadOnly) {
                    view.allowPageChange = true;
                    return;
                }
        
                // Update View's URL
                view.url = url;
        
                // Force reLayout
                var clientLeft = newPage[0].clientLeft;
        
                animateBack();
        
                // Push state
                if (app.params.pushState && view.main)  {
                    if (typeof pushState === 'undefined') pushState = true;
                    if (!preloadOnly && history.state && pushState) {
                        history.back();
                    }
                }
                return;
            }
        
            // Simple go back when we have pages on left
            if (pagesInView.length > 1 && !force) {
                // Exit if only preloadOnly
                if (preloadOnly) {
                    view.allowPageChange = true;
                    return;
                }
                // Update View's URL
                view.url = view.history[view.history.length - 2];
                url = view.url;
        
                // Define old and new pages
                newPage = $(pagesInView[pagesInView.length - 2]);
                oldPage = $(pagesInView[pagesInView.length - 1]);
        
                // Dynamic navbar
                if (view.params.dynamicNavbar) {
                    dynamicNavbar = true;
                    // Find navbar
                    navbarInners = viewContainer.children('.navbar').find('.navbar-inner:not(.cached)');
                    newNavbarInner = $(navbarInners[0]);
                    oldNavbarInner = $(navbarInners[1]);
                    if (newNavbarInner.length === 0 || oldNavbarInner.length === 0 || oldNavbarInner[0] === newNavbarInner[0]) {
                        dynamicNavbar = false;
                    }
                }
                manipulateDom = false;
                setPages();
                return;
            }
        
            if (!force) {
                // Go back when there is no pages on left
                if (!preloadOnly) {
                    view.url = view.history[view.history.length - 2];
                    url = view.url;
                }
        
                if (content) {
                    parseNewPage();
                    setPages();
                    return;
                }
                else if (pageName) {
                    // Get dom cached pages
                    newPage = $(viewContainer).find('.page[data-page="' + pageName + '"]');
                    if (view.params.dynamicNavbar) {
                        newNavbarInner = $(viewContainer).children('.navbar').find('.navbar-inner[data-page="' + pageName + '"]');
                        if (newNavbarInner.length === 0 && newPage[0].f7RelatedNavbar) {
                            newNavbarInner = $(newPage[0].f7RelatedNavbar);
                        }
                        if (newNavbarInner.length === 0 && newPage[0].f7PageData) {
                            newNavbarInner = $(newPage[0].f7PageData.navbarInnerContainer);
                        }
                    }
                    setPages();
                    return;
                }
                else if (url && url in view.pageElementsCache) {
                    newPage = view.pageElementsCache[url].page;
                    newNavbarInner = view.pageElementsCache[url].navbarInner;
                    setPages();
                    return;
                }
                else {
                    view.allowPageChange = true;
                    return;
                }
            }
            else {
                if (url && url === view.url || pageName && view.activePage && view.activePage.name === pageName) {
                    view.allowPageChange = true;
                    return;
                }
                // Go back with force url
                if (content) {
                    parseNewPage();
                    setPages();
                    return;
                }
                else if (pageName && view.params.domCache) {
                    if (pageName) url = '#' + pageName;
        
                    newPage = $(viewContainer).find('.page[data-page="' + pageName + '"]');
                    if (newPage[0].f7PageData && newPage[0].f7PageData.url) {
                        url = newPage[0].f7PageData.url;
                    }
                    if (view.params.dynamicNavbar) {
                        newNavbarInner = $(viewContainer).children('.navbar').find('.navbar-inner[data-page="' + pageName + '"]');
                        if (newNavbarInner.length === 0 && newPage[0].f7RelatedNavbar) {
                            newNavbarInner = $(newPage[0].f7RelatedNavbar);
                        }
                        if (newNavbarInner.length === 0 && newPage[0].f7PageData) {
                            newNavbarInner = $(newPage[0].f7PageData.navbarInnerContainer);
                        }
                    }
                    setPages();
                    return;
                }
                else if (pageElement && url) {
                    newPage = $(pageElement);
                    if (view.params.dynamicNavbar) {
                        newNavbarInner = newPage.find('.navbar-inner').filter(function (index, el) {
                            return $(el).parents(app.router._modalsSelector).length === 0;
                        });
                        if (newNavbarInner.length > 0) {
                            newPage.prepend(newNavbarInner);
                            app.router._remove(newPage.find('.navbar').filter(function (index, el) {
                                return $(el).parents(app.router._modalsSelector).length === 0;
                            }));
                        }
                    }
                    setPages();
                    return;
                }
                else {
                    view.allowPageChange = true;
                    return;
                }
            }
        
        };
        app.router.back = function (view, options) {
            options = options || {};
            if (app.routerPreOptions) {
                options = app.routerPreOptions(view, options) || {};
            }
            if (options.component && app.componentLoader) {
                try {
                    app.componentLoader(view, options, function (newOptions) {
                        app.router.load(view, newOptions);
                    });
                } catch (e) {}
                return;
            }
            if (app.router.preroute(view, options, true)) {
                return false;
            }
            var url = options.url;
            var content = options.content;
            var pageName = options.pageName;
            var pageElement = options.pageElement;
            if (pageName) {
                if (pageName.indexOf('?') > 0) {
                    options.query = $.parseUrlQuery(pageName);
                    options.pageName = pageName = pageName.split('?')[0];
                }
            }
            var force = options.force;
            if (!view.allowPageChange) return false;
            view.allowPageChange = false;
            if (app.xhr && view.xhr && view.xhr === app.xhr) {
                app.xhr.abort();
                app.xhr = false;
            }
            var pagesInView = $(view.pagesContainer).find('.page:not(.cached)');
        
            function proceed(content) {
                app.router.preprocess(view, content, url, function (content) {
                    options.content = content;
                    app.router._back(view, options);
                });
            }
            if (pagesInView.length > 1 && !force) {
                // Simple go back to previos page in view
                app.router._back(view, options);
                return;
            }
            if (!force) {
                url = view.history[view.history.length - 2] || options.url;
                if (!options.url) options.url = url;
                if (!url) {
                    view.allowPageChange = true;
                    return;
                }
                if (url.indexOf('#') === 0 && view.contentCache[url]) {
                    proceed(view.contentCache[url]);
                    return;
                }
                else if (url.indexOf('#') === 0 && view.params.domCache) {
                    if (!pageName) options.pageName = url.split('#')[1];
                    proceed();
                    return;
                }
                else if (url && url in view.pageElementsCache) {
                    proceed();
                }
                else if (url.indexOf('#') !== 0) {
                    // Load ajax page
                    app.get(options.url, view, options.ignoreCache, function (content, error) {
                        if (error) {
                            view.allowPageChange = true;
                            return;
                        }
                        proceed(content);
                    });
                    return;
                }
            }
            else {
                // Go back with force url
                if (!url && content) {
                    proceed(content);
                    return;
                }
                else if (!url && pageName) {
                    if (pageName) url = '#' + pageName;
                    proceed();
                    return;
                }
                else if (url && pageElement) {
                    proceed();
                    return;
                }
                else if (url) {
                    app.get(options.url, view, options.ignoreCache, function (content, error) {
                        if (error) {
                            view.allowPageChange = true;
                            return;
                        }
                        proceed(content);
                    });
                    return;
                }
            }
            view.allowPageChange = true;
            return;
        };
        
        app.router.afterBack = function (view, oldPage, newPage) {
            // Remove old page and set classes on new one
            oldPage = $(oldPage);
            newPage = $(newPage);
        
            if (view.params.domCache && view.initialPages.indexOf(oldPage[0]) >= 0) {
                oldPage.removeClass('page-from-center-to-right').addClass('cached');
            }
            else {
                app.pageRemoveCallback(view, oldPage[0], 'right');
                app.router._remove(oldPage);
            }
        
            newPage.removeClass('page-from-left-to-center page-on-left').addClass('page-on-center');
            view.allowPageChange = true;
        
            // Update View's History
            var previousURL = view.history.pop();
        
            var newNavbar;
        
            // Updated dynamic navbar
            if (view.params.dynamicNavbar) {
                var inners = $(view.container).children('.navbar').find('.navbar-inner:not(.cached)');
                var oldNavbar = $(oldPage[0].f7RelatedNavbar || inners[1]);
                if (view.params.domCache && view.initialNavbars.indexOf(oldNavbar[0]) >= 0) {
                    oldNavbar.removeClass('navbar-from-center-to-right').addClass('cached');
                }
                else {
                    app.navbarRemoveCallback(view, oldPage[0], undefined, oldNavbar[0]);
                    app.router._remove(oldNavbar);
                }
                newNavbar = $(inners[0]).removeClass('navbar-on-left navbar-from-left-to-center').addClass('navbar-on-center');
            }
        
            // Remove pages in dom cache
            if (view.params.domCache) {
                $(view.container).find('.page.cached').each(function () {
                    var page = $(this);
                    var pageUrl = page[0].f7PageData && page[0].f7PageData.url;
                    if (pageUrl && view.history.indexOf(pageUrl) < 0 && view.initialPages.indexOf(this) < 0) {
                        app.pageRemoveCallback(view, page[0], 'right');
                        if (page[0].f7RelatedNavbar && view.params.dynamicNavbar) app.navbarRemoveCallback(view, page[0], undefined, page[0].f7RelatedNavbar);
                        app.router._remove(page);
                        if (page[0].f7RelatedNavbar && view.params.dynamicNavbar) app.router._remove(page[0].f7RelatedNavbar);
                    }
                });
            }
        
            // Check previous page is content based only and remove it from content cache
            if (!view.params.domCache &&
                previousURL &&
                previousURL.indexOf('#') > -1 &&
                (previousURL in view.contentCache) &&
                // If the same page is in the history multiple times, don't remove it.
                view.history.indexOf(previousURL) === -1) {
                view.contentCache[previousURL] = null;
                delete view.contentCache[previousURL];
            }
            if (previousURL &&
                (previousURL in view.pageElementsCache) &&
                // If the same page is in the history multiple times, don't remove it.
                view.history.indexOf(previousURL) === -1) {
                view.pageElementsCache[previousURL] = null;
                delete view.pageElementsCache[previousURL];
            }
            // Check for context cache
            if (previousURL &&
                (previousURL in view.contextCache) &&
                // If the same page is in the history multiple times, don't remove it.
                view.history.indexOf(previousURL) === -1) {
                view.contextCache[previousURL] = null;
                delete view.contextCache[previousURL];
            }
        
            if (app.params.pushState && view.main) app.pushStateClearQueue();
        
            // Preload previous page
            if (view.params.preloadPreviousPage) {
                if (view.params.domCache && view.history.length > 1) {
                    var preloadUrl = view.history[view.history.length - 2];
                    var previousPage;
                    var previousNavbar;
                    if (preloadUrl && view.pagesCache[preloadUrl]) {
                        // Load by page name
                        previousPage = $(view.container).find('.page[data-page="' + view.pagesCache[preloadUrl] + '"]');
                        if (previousPage.next('.page')[0] !== newPage[0]) previousPage.insertBefore(newPage);
                        if (newNavbar) {
                            previousNavbar = $(view.container).children('.navbar').find('.navbar-inner[data-page="' + view.pagesCache[preloadUrl] + '"]');
                            if(!previousNavbar || previousNavbar.length === 0) previousNavbar = newNavbar.prev('.navbar-inner.cached');
                            if (previousNavbar.next('.navbar-inner')[0] !== newNavbar[0]) previousNavbar.insertBefore(newNavbar);
                        }
                    }
                    else {
                        // Just load previous page
                        previousPage = newPage.prev('.page.cached');
                        if (newNavbar) previousNavbar = newNavbar.prev('.navbar-inner.cached');
                    }
                    if (previousPage && previousPage.length > 0) previousPage.removeClass('cached page-on-right page-on-center').addClass('page-on-left');
                    if (previousNavbar && previousNavbar.length > 0) previousNavbar.removeClass('cached navbar-on-right navbar-on-center').addClass('navbar-on-left');
                }
                else {
                    app.router.back(view, {preloadOnly: true});
                }
            }
        };
        

        /*===============================================================================
        ************   Handle clicks and make them fast (on tap);   ************
        ===============================================================================*/
        app.initClickEvents = function () {
            function handleScrollTop(e) {
                /*jshint validthis:true */
                var clicked = $(this);
                var target = $(e.target);
                var isLink = clicked[0].nodeName.toLowerCase() === 'a' ||
                             clicked.parents('a').length > 0 ||
                             target[0].nodeName.toLowerCase() === 'a' ||
                             target.parents('a').length > 0;
        
                if (isLink) return;
                var pageContent, page;
                if (app.params.scrollTopOnNavbarClick && clicked.is('.navbar .center')) {
                    // Find active page
                    var navbar = clicked.parents('.navbar');
        
                    // Static Layout
                    pageContent = navbar.parents('.page-content');
        
                    if (pageContent.length === 0) {
                        // Fixed Layout
                        if (navbar.parents('.page').length > 0) {
                            pageContent = navbar.parents('.page').find('.page-content');
                        }
                        // Through Layout
                        if (pageContent.length === 0) {
                            if (navbar.nextAll('.pages').length > 0) {
                                pageContent = navbar.nextAll('.pages').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                            }
                        }
                    }
                }
                if (app.params.scrollTopOnStatusbarClick && clicked.is('.statusbar-overlay')) {
                    if ($('.popup.modal-in').length > 0) {
                        // Check for opened popup
                        pageContent = $('.popup.modal-in').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else if ($('.panel.active').length > 0) {
                        // Check for opened panel
                        pageContent = $('.panel.active').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else if ($('.views > .view.active').length > 0) {
                        // View in tab bar app layout
                        pageContent = $('.views > .view.active').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                    else {
                        // Usual case
                        pageContent = $('.views').find('.page:not(.page-on-left):not(.page-on-right):not(.cached)').find('.page-content');
                    }
                }
        
                if (pageContent && pageContent.length > 0) {
                    // Check for tab
                    if (pageContent.hasClass('tab')) {
                        pageContent = pageContent.parent('.tabs').children('.page-content.active');
                    }
                    if (pageContent.length > 0) pageContent.scrollTop(0, 300);
                }
            }
            function handleClicks(e) {
                /*jshint validthis:true */
                var clicked = $(this);
                var url = clicked.attr('href');
                var isLink = clicked[0].nodeName.toLowerCase() === 'a';
        
                // Check if link is external
                if (isLink) {
                    if (clicked.is(app.params.externalLinks) || (url && url.indexOf('javascript:') >= 0)) {
                        if(url && clicked.attr('target') === '_system') {
                            e.preventDefault();
                            window.open(url, '_system');
                        }
                        return;
                    }
                }
        
                // Collect Clicked data- attributes
                var clickedData = clicked.dataset();
        
                // Smart Select
                if (clicked.hasClass('smart-select')) {
                    if (app.smartSelectOpen) app.smartSelectOpen(clicked);
                }
        
                // Open Panel
                if (clicked.hasClass('open-panel')) {
                    if ($('.panel').length === 1) {
                        if ($('.panel').hasClass('panel-left')) app.openPanel('left');
                        else app.openPanel('right');
                    }
                    else {
                        if (clickedData.panel === 'right') app.openPanel('right');
                        else app.openPanel('left');
                    }
                }
                
                // Close Panel
                if (clicked.hasClass('close-panel')) {
                    app.closePanel();
                }
        
                // Panel Overlay
                if (clicked.hasClass('panel-overlay')) {
                    $('.panel.active').trigger('panel:overlay-click');
                    if (app.params.panelsCloseByOutside) app.closePanel();
                }
        
                // Popover
                if (clicked.hasClass('open-popover')) {
                    var popover;
                    if (clickedData.popover) {
                        popover = clickedData.popover;
                    }
                    else popover = '.popover';
                    app.popover(popover, clicked);
                }
                if (clicked.hasClass('close-popover')) {
                    app.closeModal('.popover.modal-in');
                }
                // Popup
                var popup;
                if (clicked.hasClass('open-popup')) {
                    if (clickedData.popup) {
                        popup = clickedData.popup;
                    }
                    else popup = '.popup';
                    app.popup(popup);
                }
                if (clicked.hasClass('close-popup')) {
                    if (clickedData.popup) {
                        popup = clickedData.popup;
                    }
                    else popup = '.popup.modal-in';
                    app.closeModal(popup);
                }
                // Login Screen
                var loginScreen;
                if (clicked.hasClass('open-login-screen')) {
                    if (clickedData.loginScreen) {
                        loginScreen = clickedData.loginScreen;
                    }
                    else loginScreen = '.login-screen';
                    app.loginScreen(loginScreen);
                }
                if (clicked.hasClass('close-login-screen')) {
                    app.closeModal('.login-screen.modal-in');
                }
                // Close Modal
                if (clicked.hasClass('modal-overlay')) {
                    if ($('.modal.modal-in').length > 0 && app.params.modalCloseByOutside)
                        app.closeModal('.modal.modal-in');
                    if ($('.actions-modal.modal-in').length > 0 && app.params.actionsCloseByOutside)
                        app.closeModal('.actions-modal.modal-in');
        
                    if ($('.popover.modal-in').length > 0 && app.params.popoverCloseByOutside)
                        app.closeModal('.popover.modal-in');
                }
                if (clicked.hasClass('popup-overlay')) {
                    if ($('.popup.modal-in').length > 0 && app.params.popupCloseByOutside)
                        app.closeModal('.popup.modal-in');
                }
                if (clicked.hasClass('picker-modal-overlay')) {
                    if ($('.picker-modal.modal-in').length > 0)
                        app.closeModal('.picker-modal.modal-in');
                }
        
                // Picker
                if (clicked.hasClass('close-picker')) {
                    var pickerToClose = $('.picker-modal.modal-in');
                    if (pickerToClose.length > 0) {
                        app.closeModal(pickerToClose);
                    }
                    else {
                        pickerToClose = $('.popover.modal-in .picker-modal');
                        if (pickerToClose.length > 0) {
                            app.closeModal(pickerToClose.parents('.popover'));
                        }
                    }
                }
                if (clicked.hasClass('open-picker')) {
                    var pickerToOpen;
                    if (clickedData.picker) {
                        pickerToOpen = clickedData.picker;
                    }
                    else pickerToOpen = '.picker-modal';
                    app.pickerModal(pickerToOpen, clicked);
                }
        
                // Tabs
                var isTabLink;
                if (clicked.hasClass('tab-link')) {
                    isTabLink = true;
                    app.showTab(clickedData.tab || clicked.attr('href'), clicked);
                }
                // Swipeout Close
                if (clicked.hasClass('swipeout-close')) {
                    app.swipeoutClose(clicked.parents('.swipeout-opened'));
                }
                // Swipeout Delete
                if (clicked.hasClass('swipeout-delete')) {
                    if (clickedData.confirm) {
                        var text = clickedData.confirm;
                        var title = clickedData.confirmTitle;
                        if (title) {
                            app.confirm(text, title, function () {
                                app.swipeoutDelete(clicked.parents('.swipeout'));
                            }, function () {
                                if (clickedData.closeOnCancel) app.swipeoutClose(clicked.parents('.swipeout'));
                            });
                        }
                        else {
                            app.confirm(text, function () {
                                app.swipeoutDelete(clicked.parents('.swipeout'));
                            }, function () {
                                if (clickedData.closeOnCancel) app.swipeoutClose(clicked.parents('.swipeout'));
                            });
                        }
                    }
                    else {
                        app.swipeoutDelete(clicked.parents('.swipeout'));
                    }
        
                }
                // Sortable
                if (clicked.hasClass('toggle-sortable')) {
                    app.sortableToggle(clickedData.sortable);
                }
                if (clicked.hasClass('open-sortable')) {
                    app.sortableOpen(clickedData.sortable);
                }
                if (clicked.hasClass('close-sortable')) {
                    app.sortableClose(clickedData.sortable);
                }
                // Accordion
                if (clicked.hasClass('accordion-item-toggle') || (clicked.hasClass('item-link') && clicked.parent().hasClass('accordion-item'))) {
                    var accordionItem = clicked.parent('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('.accordion-item');
                    if (accordionItem.length === 0) accordionItem = clicked.parents('li');
                    app.accordionToggle(accordionItem);
                }
        
                // Speed Dial
                if (clicked.hasClass('floating-button') && clicked.parent().hasClass('speed-dial')) {
                    clicked.parent().toggleClass('speed-dial-opened');
                }
                if (clicked.hasClass('close-speed-dial')) {
                    $('.speed-dial-opened').removeClass('speed-dial-opened');
                }
        
                // Load Page
                if (app.params.ajaxLinks && !clicked.is(app.params.ajaxLinks) || !isLink || !app.params.router) {
                    return;
                }
                if (isLink) {
                    e.preventDefault();
                }
        
                var validUrl = url && url.length > 0 && url !== '#' && !isTabLink;
                var template = clickedData.template;
                if (validUrl || clicked.hasClass('back') || template) {
                    var view;
                    if (clickedData.view) {
                        view = $(clickedData.view)[0].f7View;
                    }
                    else {
                        view = clicked.parents('.' + app.params.viewClass)[0] && clicked.parents('.' + app.params.viewClass)[0].f7View;
                        if (view && view.params.linksView) {
                            if (typeof view.params.linksView === 'string') view = $(view.params.linksView)[0].f7View;
                            else if (view.params.linksView instanceof View) view = view.params.linksView;
                        }
                    }
                    if (!view) {
                        if (app.mainView) view = app.mainView;
                    }
                    if (!view) return;
        
                    var pageName;
                    if (!template) {
                        if (url && url.indexOf('#') === 0 && url !== '#')  {
                            if (view.params.domCache) {
                                pageName = url.split('#')[1];
                            }
                            else return;
                        }
                        if (url === '#' && !clicked.hasClass('back')) return;
                    }
                    else {
                        url = undefined;
                    }
        
                    var animatePages;
                    if (typeof clickedData.animatePages !== 'undefined') {
                        animatePages = clickedData.animatePages;
                    }
                    else {
                        if (clicked.hasClass('with-animation')) animatePages = true;
                        if (clicked.hasClass('no-animation')) animatePages = false;
                    }
        
                    var options = {
                        animatePages: animatePages,
                        ignoreCache: clickedData.ignoreCache,
                        force: clickedData.force,
                        reload: clickedData.reload,
                        reloadPrevious: clickedData.reloadPrevious,
                        pageName: pageName,
                        pushState: clickedData.pushState,
                        url: url
                    };
        
                    if (app.params.template7Pages) {
                        options.contextName = clickedData.contextName;
                        var context = clickedData.context;
                        if (context) {
                            options.context = JSON.parse(context);
                        }
                    }
                    if (template && template in t7.templates) {
                        options.template = t7.templates[template];
                    }
        
                    if (clicked.hasClass('back')) view.router.back(options);
                    else view.router.load(options);
                }
            }
            $(document).on('click', 'a, .open-panel, .close-panel, .panel-overlay, .modal-overlay, .popup-overlay, .swipeout-delete, .swipeout-close, .close-popup, .open-popup, .open-popover, .open-login-screen, .close-login-screen .smart-select, .toggle-sortable, .open-sortable, .close-sortable, .accordion-item-toggle, .close-picker, .picker-modal-overlay', handleClicks);
            if (app.params.scrollTopOnNavbarClick || app.params.scrollTopOnStatusbarClick) {
                $(document).on('click', '.statusbar-overlay, .navbar .center', handleScrollTop);
            }
        
            // Prevent scrolling on overlays
            function preventScrolling(e) {
                e.preventDefault();
            }
            if (app.support.touch && !app.device.android) {
                var activeListener = app.support.passiveListener ? {passive: false, capture: false} : false;
                $(document).on((app.params.fastClicks ? 'touchstart' : 'touchmove'), '.panel-overlay, .modal-overlay, .preloader-indicator-overlay, .popup-overlay, .searchbar-overlay', preventScrolling, activeListener);
            }
        };
        

        /*======================================================
        ************   App Resize Actions   ************
        ======================================================*/
        // Prevent iPad horizontal body scrolling when soft keyboard is opened
        function _fixIpadBodyScrolLeft() {
            if (app.device.ipad) {
                document.body.scrollLeft = 0;
                setTimeout(function () {
                    document.body.scrollLeft = 0;
                }, 0);
            }
        }
        var appResizeCallbacks = [];
        app.getSize = function () {
            var offset = app.root.offset();
            app.width = app.root[0].offsetWidth;
            app.height = app.root[0].offsetHeight;
            app.left = offset.left;
            app.top = offset.top;
        };
        app.onResize = function (callback) {
            appResizeCallbacks.push(callback);
        };
        app.offResize = function (callback) {
            for (var i = 0; i < appResizeCallbacks.length; i++) {
                if (appResizeCallbacks[i] === callback) {
                    appResizeCallbacks.splice(i, 1);
                }
            }
        };
        app.resize = function () {
            _fixIpadBodyScrolLeft();
            app.getSize();
            if (app.sizeNavbars) app.sizeNavbars();
            for (var i = 0; i < appResizeCallbacks.length; i++) {
                appResizeCallbacks[i]();
            }
        };
        app.orientationchange = function () {
            if (app.device && app.device.minimalUi) {
                if (window.orientation === 90 || window.orientation === -90) document.body.scrollTop = 0;
            }
            _fixIpadBodyScrolLeft();
        };
        app.initResize = function () {
            $(window).on('resize', app.resize);
            $(window).on('orientationchange', app.orientationchange);
            app.getSize();
        };
        

        /*======================================================
        ************   Panels   ************
        ======================================================*/
        app.allowPanelOpen = true;
        app.openPanel = function (panelPosition, animated) {
            if (typeof animated === 'undefined') animated = true;
            if (!app.allowPanelOpen) return false;
            var panel = $('.panel-' + panelPosition);
            if (panel.length === 0 || panel.hasClass('active') || panel.hasClass('panel-visible-by-breakpoint')) return false;
            app.closePanel(); // Close if some panel is opened
            app.allowPanelOpen = false;
            var effect = panel.hasClass('panel-reveal') ? 'reveal' : 'cover';
            panel[animated ? 'removeClass' : 'addClass']('not-animated');
            panel.css({display: 'block'}).addClass('active');
            panel.trigger('open panel:open');
        
            var panelOverlay = $('.panel-overlay');
            panelOverlay[animated ? 'removeClass' : 'addClass']('not-animated');
            panelOverlay.show();
        
            if (panel.find('.' + app.params.viewClass).length > 0) {
                if (app.sizeNavbars) app.sizeNavbars(panel.find('.' + app.params.viewClass)[0]);
            }
        
            // Trigger reLayout
            var clientLeft = panel[0].clientLeft;
        
            // Transition End;
            var transitionEndTarget = effect === 'reveal' ? $('.' + app.params.viewsClass) : panel;
        
            function panelTransitionEnd() {
                transitionEndTarget.transitionEnd(function (e) {
                    if ($(e.target).is(transitionEndTarget)) {
                        if (panel.hasClass('active')) {
                            panel.trigger('opened panel:opened');
                        }
                        else {
                            panel.trigger('closed panel:closed');
                        }
                        panelOverlay.css({display: ''});
                        app.allowPanelOpen = true;
                    }
                    else panelTransitionEnd();
                });
            }
            if (animated) {
                panelTransitionEnd();
            }
            else {
                panel.trigger('opened panel:opened');
                panelOverlay.css({display: ''});
                app.allowPanelOpen = true;
            }
        
            $('body').addClass('with-panel-' + panelPosition + '-' + effect);
            return true;
        };
        app.closePanel = function (animated) {
            if (typeof animated === 'undefined') animated = true;
            var activePanel = $('.panel.active');
            if (activePanel.length === 0 || activePanel.hasClass('panel-visible-by-breakpoint')) return false;
            var effect = activePanel.hasClass('panel-reveal') ? 'reveal' : 'cover';
            var panelPosition = activePanel.hasClass('panel-left') ? 'left' : 'right';
            activePanel[animated ? 'removeClass' : 'addClass']('not-animated');
            activePanel.removeClass('active');
        
            var panelOverlay = $('.panel-overlay');
            panelOverlay.removeClass('not-animated');
        
            var transitionEndTarget = effect === 'reveal' ? $('.' + app.params.viewsClass) : activePanel;
            activePanel.trigger('close panel:close');
            app.allowPanelOpen = false;
            if (animated) {
                transitionEndTarget.transitionEnd(function () {
                    if (activePanel.hasClass('active')) return;
                    activePanel.css({display: ''});
                    activePanel.trigger('closed panel:closed');
                    $('body').removeClass('panel-closing');
                    app.allowPanelOpen = true;
                });
                $('body').addClass('panel-closing').removeClass('with-panel-' + panelPosition + '-' + effect);
            }
            else {
                activePanel.css({display: ''});
                activePanel.trigger('closed panel:closed');
                activePanel.removeClass('not-animated');
                $('body').removeClass('with-panel-' + panelPosition + '-' + effect);
                app.allowPanelOpen = true;
            }
        };
        /*======================================================
        ************   Panels breakpoints   ************
        ======================================================*/
        app.initPanelsBreakpoints = function () {
            var panelLeft = $('.panel-left');
            var panelRight = $('.panel-right');
            var views = app.root.children('.views');
            var wasVisible;
            function setPanels() {
                // Left Panel
                if (app.params.panelLeftBreakpoint && panelLeft.length > 0) {
                    wasVisible = panelLeft.hasClass('panel-visible-by-breakpoint');
                    if (app.width >= app.params.panelLeftBreakpoint) {
                        if (!wasVisible) {
                            $('body').removeClass('with-panel-left-reveal with-panel-left-cover');
                            panelLeft.css('display', '').addClass('panel-visible-by-breakpoint').removeClass('active');
                            panelLeft.trigger('open panel:open opened panel:opened');
                            views.css({
                                'margin-left': panelLeft.width() + 'px'
                            });
                            app.allowPanelOpen = true;
                        }
                    }
                    else {
                        if (wasVisible) {
                            panelLeft.css('display', '').removeClass('panel-visible-by-breakpoint active');
                            panelLeft.trigger('close panel:close closed panel:closed');
                            views.css({
                                'margin-left': ''
                            });
                            app.allowPanelOpen = true;
                        }
                    }
                }
                // Right Panel
                if (app.params.panelRightBreakpoint && panelRight.length > 0) {
                    wasVisible = panelRight.hasClass('panel-visible-by-breakpoint');
                    if (app.width >= app.params.panelRightBreakpoint) {
                        if (!wasVisible) {
                            $('body').removeClass('with-panel-right-reveal with-panel-right-cover');
                            panelRight.css('display', '').addClass('panel-visible-by-breakpoint').removeClass('active');
                            panelRight.trigger('open panel:open opened panel:opened');
                            views.css({
                                'margin-right': panelRight.width() + 'px'
                            });
                            app.allowPanelOpen = true;
                        }
                    }
                    else {
                        if (wasVisible) {
                            panelRight.css('display', '').removeClass('panel-visible-by-breakpoint active');
                            panelRight.trigger('close panel:close closed panel:closed');
                            views.css({
                                'margin-right': ''
                            });
                            app.allowPanelOpen = true;
                        }
                    }
                }
            }
            app.onResize(setPanels);
            setPanels();
        };
        /*======================================================
        ************   Swipe panels   ************
        ======================================================*/
        app.initSwipePanels = function () {
            var panel, side;
            if (app.params.swipePanel) {
                panel = $('.panel.panel-' + app.params.swipePanel);
                side = app.params.swipePanel;
                if (panel.length === 0 && side !== 'both') return;
            }
            else {
                if (app.params.swipePanelOnlyClose) {
                    if ($('.panel').length === 0) return;
                }
                else return;
            }
        
            var panelOverlay = $('.panel-overlay');
            var isTouched, isMoved, isScrolling, touchesStart = {}, touchStartTime, touchesDiff, translate, overlayOpacity, opened, panelWidth, effect, direction;
            var views = $('.' + app.params.viewsClass);
        
            function handleTouchStart(e) {
                if (!app.allowPanelOpen || (!app.params.swipePanel && !app.params.swipePanelOnlyClose) || isTouched) return;
                if ($('.modal-in, .photo-browser-in').length > 0) return;
                if (!(app.params.swipePanelCloseOpposite || app.params.swipePanelOnlyClose)) {
                    if ($('.panel.active').length > 0 && !panel.hasClass('active')) return;
                }
                if (e.target && e.target.nodeName.toLowerCase() === 'input' && e.target.type === 'range') return;
                if ($(e.target).closest('.tabs-swipeable-wrap').length > 0) return;
                touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
                if (app.params.swipePanelCloseOpposite || app.params.swipePanelOnlyClose) {
                    if ($('.panel.active').length > 0) {
                        side = $('.panel.active').hasClass('panel-left') ? 'left' : 'right';
                    }
                    else {
                        if (app.params.swipePanelOnlyClose) return;
                        side = app.params.swipePanel;
                    }
                    if (!side) return;
                }
                panel = $('.panel.panel-' + side);
                opened = panel.hasClass('active');
                if (app.params.swipePanelActiveArea && !opened) {
                    if (side === 'left') {
                        if (touchesStart.x > app.params.swipePanelActiveArea) return;
                    }
                    if (side === 'right') {
                        if (touchesStart.x < app.width - app.params.swipePanelActiveArea) return;
                    }
                }
                isMoved = false;
                isTouched = true;
                isScrolling = undefined;
        
                touchStartTime = (new Date()).getTime();
                direction = undefined;
            }
            function handleTouchMove(e) {
                if (!isTouched) return;
                if (e.f7PreventPanelSwipe) return;
                var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                if (typeof isScrolling === 'undefined') {
                    isScrolling = !!(isScrolling || Math.abs(pageY - touchesStart.y) > Math.abs(pageX - touchesStart.x));
                }
                if (isScrolling) {
                    isTouched = false;
                    return;
                }
                if (!direction) {
                    if (pageX > touchesStart.x) {
                        direction = 'to-right';
                    }
                    else {
                        direction = 'to-left';
                    }
        
                    if(side === 'both'){
                        if ($('.panel.active').length > 0) {
                            side = $('.panel.active').hasClass('panel-left') ? 'left' : 'right';
                        }
                        else {
                            side = direction === 'to-right' ? 'left' : 'right';
                        }
                        if (app.params.swipePanelActiveArea > 0) {
                            if (side === 'left' && touchesStart.x > app.params.swipePanelActiveArea) {
                                isTouched = false;
                                return;
                            }
                            if (side === 'right' && touchesStart.x < app.width - app.params.swipePanelActiveArea) {
                                isTouched = false;
                                return;
                            }
                        }
                        panel = $('.panel.panel-' + side);
                    }
                    if (panel.hasClass('panel-visible-by-breakpoint')) {
                        isTouched = false;
                        return;
                    }
        
                    if (
                        side === 'left' &&
                        (
                            direction === 'to-left' && !panel.hasClass('active')
                        ) ||
                        side === 'right' &&
                        (
                            direction === 'to-right' && !panel.hasClass('active')
                        )
                    )
                    {
                        isTouched = false;
                        return;
                    }
                }
        
                if (app.params.swipePanelNoFollow) {
                    var timeDiff = (new Date()).getTime() - touchStartTime;
                    if (timeDiff < 300) {
                        if (direction === 'to-left') {
                            if (side === 'right') app.openPanel(side);
                            if (side === 'left' && panel.hasClass('active')) app.closePanel();
                        }
                        if (direction === 'to-right') {
                            if (side === 'left') app.openPanel(side);
                            if (side === 'right' && panel.hasClass('active')) app.closePanel();
                        }
                    }
                    isTouched = false;
                    isMoved = false;
                    return;
                }
        
                if (!isMoved) {
                    effect = panel.hasClass('panel-cover') ? 'cover' : 'reveal';
                    if (!opened) {
                        panel.show();
                        panelOverlay.show();
                    }
                    panelWidth = panel[0].offsetWidth;
                    panel.transition(0);
                    if (panel.find('.' + app.params.viewClass).length > 0) {
                        if (app.sizeNavbars) app.sizeNavbars(panel.find('.' + app.params.viewClass)[0]);
                    }
                }
        
                isMoved = true;
        
                e.preventDefault();
                var threshold = opened ? 0 : -app.params.swipePanelThreshold;
                if (side === 'right') threshold = -threshold;
        
                touchesDiff = pageX - touchesStart.x + threshold;
        
                if (side === 'right') {
                    if (effect === 'cover') {
                        translate = touchesDiff + (opened ? 0 : panelWidth);
                        if (translate < 0) translate = 0;
                        if (translate > panelWidth) {
                            translate = panelWidth;
                        }
                    }
                    else {
                        translate = touchesDiff - (opened ? panelWidth : 0);
                        if (translate > 0) translate = 0;
                        if (translate < -panelWidth) {
                            translate = -panelWidth;
                        }
                    }
                }
                else {
                    translate = touchesDiff + (opened ? panelWidth : 0);
                    if (translate < 0) translate = 0;
                    if (translate > panelWidth) {
                        translate = panelWidth;
                    }
                }
                if (effect === 'reveal') {
                    views.transform('translate3d(' + translate + 'px,0,0)').transition(0);
                    panelOverlay.transform('translate3d(' + translate + 'px,0,0)').transition(0);
        
                    panel.trigger('panel:swipe', {progress: Math.abs(translate / panelWidth)});
                    app.pluginHook('swipePanelSetTransform', views[0], panel[0], Math.abs(translate / panelWidth));
                }
                else {
                    if (side === 'left') translate = translate - panelWidth;
                    panel.transform('translate3d(' + (translate) + 'px,0,0)').transition(0);
        
                    panelOverlay.transition(0);
                    overlayOpacity = 1 - Math.abs(translate/panelWidth);
                    panelOverlay.css({opacity: overlayOpacity});
        
                    panel.trigger('panel:swipe', {progress: Math.abs(translate / panelWidth)});
                    app.pluginHook('swipePanelSetTransform', views[0], panel[0], Math.abs(translate / panelWidth));
                }
            }
            function handleTouchEnd(e) {
                if (!isTouched || !isMoved) {
                    isTouched = false;
                    isMoved = false;
                    return;
                }
                isTouched = false;
                isMoved = false;
                var timeDiff = (new Date()).getTime() - touchStartTime;
                var action;
                var edge = (translate === 0 || Math.abs(translate) === panelWidth);
        
                if (!opened) {
                    if (effect === 'cover') {
                        if (translate === 0) {
                            action = 'swap'; //open
                        }
                        else if (timeDiff < 300 && Math.abs(translate) > 0) {
                            action = 'swap'; //open
                        }
                        else if (timeDiff >= 300 && Math.abs(translate) < panelWidth / 2) {
                            action = 'swap'; //open
                        }
                        else {
                            action = 'reset'; //close
                        }
                    }
                    else {
                        if (translate === 0) {
                            action = 'reset';
                        }
                        else if (
                            timeDiff < 300 && Math.abs(translate) > 0 ||
                            timeDiff >= 300 && (Math.abs(translate) >= panelWidth / 2)
                        ) {
                            action = 'swap';
                        }
                        else {
                            action = 'reset';
                        }
                    }
                }
                else {
                    if (effect === 'cover') {
                        if (translate === 0) {
                            action = 'reset'; //open
                        }
                        else if (timeDiff < 300 && Math.abs(translate) > 0) {
                            action = 'swap'; //open
                        }
                        else if (timeDiff >= 300 && Math.abs(translate) < panelWidth / 2) {
                            action = 'reset'; //open
                        }
                        else {
                            action = 'swap'; //close
                        }
                    }
                    else {
                        if (translate === -panelWidth) {
                            action = 'reset';
                        }
                        else if (
                            timeDiff < 300 && Math.abs(translate) >= 0 ||
                            timeDiff >= 300 && (Math.abs(translate) <= panelWidth / 2)
                        ) {
                            if (side === 'left' && translate === panelWidth) action = 'reset';
                            else action = 'swap';
                        }
                        else {
                            action = 'reset';
                        }
                    }
                }
                if (action === 'swap') {
                    app.allowPanelOpen = true;
                    if (opened) {
                        app.closePanel();
                        if (edge) {
                            panel.css({display: ''});
                            $('body').removeClass('panel-closing');
                        }
                    }
                    else {
                        app.openPanel(side);
                    }
                    if (edge) app.allowPanelOpen = true;
                }
                if (action === 'reset') {
                    if (opened) {
                        app.allowPanelOpen = true;
                        app.openPanel(side);
                    }
                    else {
                        app.closePanel();
                        if (edge) {
                            app.allowPanelOpen = true;
                            panel.css({display: ''});
                        }
                        else {
                            var target = effect === 'reveal' ? views : panel;
                            panel.trigger('close panel:close');
                            $('body').addClass('panel-closing');
                            target.transitionEnd(function () {
                                if (panel.hasClass('active')) return;
                                panel.trigger('close panel:closed');
                                panel.css({display: ''});
                                $('body').removeClass('panel-closing');
                                app.allowPanelOpen = true;
                            });
                        }
                    }
                }
                if (effect === 'reveal') {
                    views.transition('');
                    views.transform('');
                }
                panel.transition('').transform('');
                panelOverlay.css({display: ''}).transform('').transition('').css('opacity', '');
            }
            var passiveListener = app.touchEvents.start === 'touchstart' && app.support.passiveListener ? {passive: true, capture: false} : false;
            var activeListener = app.support.passiveListener ? {passive: false, capture: false} : false;
            $(document).on(app.touchEvents.start, handleTouchStart, passiveListener);
            $(document).on(app.touchEvents.move, handleTouchMove, activeListener);
            $(document).on(app.touchEvents.end, handleTouchEnd, passiveListener);
        };
        

        /*======================================================
        ************   Image Lazy Loading   ************
        ************   Based on solution by Marc Godard, https://github.com/MarcGodard   ************
        ======================================================*/
        app.initImagesLazyLoad = function (pageContainer) {
            pageContainer = $(pageContainer);
        
            // Lazy images
            var lazyLoadImages;
            if (pageContainer.hasClass('lazy')) {
                lazyLoadImages = pageContainer;
                pageContainer = lazyLoadImages.parents('.page');
            }
            else {
                lazyLoadImages = pageContainer.find('.lazy');
            }
            if (lazyLoadImages.length === 0) return;
        
            // Scrollable page content
            var pageContent;
            if (pageContainer.hasClass('page-content'))  {
                pageContent = pageContainer;
                pageContainer = pageContainer.parents('.page');
            }
            else  {
                pageContent = pageContainer.find('.page-content');
            }
            if (pageContent.length === 0) return;
        
            // Placeholder
            var placeholderSrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXCwsK592mkAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==';
            if (typeof app.params.imagesLazyLoadPlaceholder === 'string') {
                placeholderSrc = app.params.imagesLazyLoadPlaceholder;
            }
            if (app.params.imagesLazyLoadPlaceholder !== false) lazyLoadImages.each(function(){
                if ($(this).attr('data-src') && !$(this).attr('src')) $(this).attr('src', placeholderSrc);
            });
        
            // load image
            var imagesSequence = [];
            var imageIsLoading = false;
            function loadImage(el) {
                el = $(el);
        
                var bg = el.attr('data-background');
                var src = bg ? bg : el.attr('data-src');
                if (!src) return;
        
                function onLoad() {
                    el.removeClass('lazy').addClass('lazy-loaded');
                    if (bg) {
                        el.css('background-image', 'url(' + src + ')');
                    }
                    else {
                        el.attr('src', src);
                    }
        
                    if (app.params.imagesLazyLoadSequential) {
                        imageIsLoading = false;
                        if (imagesSequence.length > 0) {
                            loadImage(imagesSequence.shift());
                        }
                    }
                    el.trigger('lazy-loaded');
                    if (app.params.onLazyLoaded) app.params.onLazyLoaded(el);
                }
        
                function onError() {
                    el.removeClass('lazy').addClass('lazy-loaded');
                    if (bg) {
                        el.css('background-image', 'url(' + placeholderSrc + ')');
                    }
                    else {
                        el.attr('src', placeholderSrc);
                    }
        
                    if (app.params.imagesLazyLoadSequential) {
                        imageIsLoading = false;
                        if (imagesSequence.length > 0) {
                            loadImage(imagesSequence.shift());
                        }
                    }
                    el.trigger('lazy-error');
                    if (app.params.onLazyError) app.params.onLazyError(el);
                }
        
                if (app.params.imagesLazyLoadSequential) {
                    if (imageIsLoading) {
                        if (imagesSequence.indexOf(el[0]) < 0) imagesSequence.push(el[0]);
                        return;
                    }
                }
        
                // Loading flag
                imageIsLoading = true;
        
                var image = new Image();
                image.onload = onLoad;
                image.onerror = onError;
                image.src =src;
        
                // Add loaded callback and events
                el.trigger('lazy-load');
                if (app.params.onLazyLoad && !el.hasClass('lazy-loaded')) app.params.onLazyLoad(el);
            }
            function lazyHandler() {
                lazyLoadImages = pageContainer.find('.lazy');
                lazyLoadImages.each(function(index, el) {
                    el = $(el);
                    if (el.parents('.tab:not(.active)').length > 0) {
                        return;
                    }
                    if (isElementInViewport(el[0])) {
                        loadImage(el);
                    }
                });
            }
        
            function isElementInViewport (el) {
                var rect = el.getBoundingClientRect();
                var threshold = app.params.imagesLazyLoadThreshold || 0;
                return (
                    rect.top >= (0 - threshold) &&
                    rect.left >= (0 - threshold) &&
                    rect.top <= (app.height + threshold) &&
                    rect.left <= (app.width + threshold)
                );
            }
        
            function attachEvents(destroy) {
                var method = destroy ? 'off' : 'on';
                lazyLoadImages[method]('lazy', lazyHandler);
                lazyLoadImages.parents('.tab')[method]('show', lazyHandler);
                pageContainer[method]('lazy', lazyHandler);
                pageContent[method]('lazy', lazyHandler);
                pageContent[method]('scroll', lazyHandler);
                app[method === 'on' ? 'onResize' : 'offResize'](lazyHandler);
            }
            function detachEvents() {
                attachEvents(true);
            }
        
            // Store detach function
            pageContainer[0].f7DestroyImagesLazyLoad = detachEvents;
        
            // Attach events
            attachEvents();
        
            // Destroy on page remove
            if (pageContainer.hasClass('page')) {
                pageContainer.once('page:beforeremove', detachEvents);
            }
        
            // Run loader on page load/init
            lazyHandler();
        
            // Run after page animation
            pageContainer.once('page:afteranimation', lazyHandler);
        };
        app.destroyImagesLazyLoad = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length > 0 && pageContainer[0].f7DestroyImagesLazyLoad) {
                pageContainer[0].f7DestroyImagesLazyLoad();
            }
        };
        app.reinitImagesLazyLoad = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length > 0) {
                pageContainer.trigger('lazy');
            }
        };
        

        /*======================================================
        ************   Material Preloader   ************
        ======================================================*/
        app.initPageMaterialPreloader = function (pageContainer) {
            $(pageContainer).find('.preloader').each(function () {
                if ($(this).children().length === 0) {
                    $(this).html(app.params.materialPreloaderHtml);
                }
            });
        };

        /*======================================================
        ************   Modals   ************
        ======================================================*/
        var _modalTemplateTempDiv = document.createElement('div');
        app.modalStack = [];
        app.modalStackClearQueue = function () {
            if (app.modalStack.length) {
                (app.modalStack.shift())();
            }
        };
        app.modal = function (params) {
            params = params || {};
            var modalHTML = '';
            if (app.params.modalTemplate) {
                if (!app._compiledTemplates.modal) app._compiledTemplates.modal = t7.compile(app.params.modalTemplate);
                modalHTML = app._compiledTemplates.modal(params);
            }
            else {
                var buttonsHTML = '';
                if (params.buttons && params.buttons.length > 0) {
                    for (var i = 0; i < params.buttons.length; i++) {
                        buttonsHTML += '<span class="modal-button' + (params.buttons[i].bold ? ' modal-button-bold' : '') + '">' + params.buttons[i].text + '</span>';
                    }
                }
                var titleHTML = params.title ? '<div class="modal-title">' + params.title + '</div>' : '';
                var textHTML = params.text ? '<div class="modal-text">' + params.text + '</div>' : '';
                var afterTextHTML = params.afterText ? params.afterText : '';
                var noButtons = !params.buttons || params.buttons.length === 0 ? 'modal-no-buttons' : '';
                var verticalButtons = params.verticalButtons ? 'modal-buttons-vertical': '';
                var modalButtonsHTML = params.buttons && params.buttons.length > 0 ? '<div class="modal-buttons modal-buttons-' + params.buttons.length + ' ' + verticalButtons + '">' + buttonsHTML + '</div>' : '';
                modalHTML = '<div class="modal ' + noButtons + ' ' + (params.cssClass || '') + '"><div class="modal-inner">' + (titleHTML + textHTML + afterTextHTML) + '</div>' + modalButtonsHTML + '</div>';
            }
        
            _modalTemplateTempDiv.innerHTML = modalHTML;
        
            var modal = $(_modalTemplateTempDiv).children();
        
            app.root.append(modal[0]);
        
            // Add events on buttons
            modal.find('.modal-button').each(function (index, el) {
                $(el).on('click', function (e) {
                    if (params.buttons[index].close !== false) app.closeModal(modal);
                    if (params.buttons[index].onClick) params.buttons[index].onClick(modal, e);
                    if (params.onClick) params.onClick(modal, index);
                });
            });
            app.openModal(modal);
            return modal[0];
        };
        app.alert = function (text, title, callbackOk) {
            if (typeof title === 'function') {
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                buttons: [ {text: app.params.modalButtonOk, bold: true, onClick: callbackOk} ]
            });
        };
        app.confirm = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                buttons: [
                    {text: app.params.modalButtonCancel, onClick: callbackCancel},
                    {text: app.params.modalButtonOk, bold: true, onClick: callbackOk}
                ]
            });
        };
        app.prompt = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<div class="input-field"><input type="text" class="modal-text-input"></div>',
                buttons: [
                    {
                        text: app.params.modalButtonCancel
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true
                    }
                ],
                onClick: function (modal, index) {
                    if (index === 0 && callbackCancel) callbackCancel($(modal).find('.modal-text-input').val());
                    if (index === 1 && callbackOk) callbackOk($(modal).find('.modal-text-input').val());
                }
            });
        };
        app.modalLogin = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<div class="input-field modal-input-double"><input type="text" name="modal-username" placeholder="' + app.params.modalUsernamePlaceholder + '" class="modal-text-input"></div><div class="input-field modal-input-double"><input type="password" name="modal-password" placeholder="' + app.params.modalPasswordPlaceholder + '" class="modal-text-input"></div>',
                buttons: [
                    {
                        text: app.params.modalButtonCancel
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true
                    }
                ],
                onClick: function (modal, index) {
                    var username = $(modal).find('.modal-text-input[name="modal-username"]').val();
                    var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
                    if (index === 0 && callbackCancel) callbackCancel(username, password);
                    if (index === 1 && callbackOk) callbackOk(username, password);
                }
            });
        };
        app.modalPassword = function (text, title, callbackOk, callbackCancel) {
            if (typeof title === 'function') {
                callbackCancel = arguments[2];
                callbackOk = arguments[1];
                title = undefined;
            }
            return app.modal({
                text: text || '',
                title: typeof title === 'undefined' ? app.params.modalTitle : title,
                afterText: '<div class="input-field"><input type="password" name="modal-password" placeholder="' + app.params.modalPasswordPlaceholder + '" class="modal-text-input"></div>',
                buttons: [
                    {
                        text: app.params.modalButtonCancel
                    },
                    {
                        text: app.params.modalButtonOk,
                        bold: true
                    }
                ],
                onClick: function (modal, index) {
                    var password = $(modal).find('.modal-text-input[name="modal-password"]').val();
                    if (index === 0 && callbackCancel) callbackCancel(password);
                    if (index === 1 && callbackOk) callbackOk(password);
                }
            });
        };
        app.showPreloader = function (title) {
            return app.modal({
                title: title || app.params.modalPreloaderTitle,
                text: '<div class="preloader">' + (app.params.material ? app.params.materialPreloaderHtml : '') + '</div>',
                cssClass: 'modal-preloader'
            });
        };
        app.hidePreloader = function () {
            app.closeModal('.modal-preloader');
        };
        app.showIndicator = function () {
            if ($('.preloader-indicator-overlay').length > 0) return;
            app.root.append('<div class="preloader-indicator-overlay"></div><div class="preloader-indicator-modal"><span class="preloader preloader-white">' + (app.params.material ? app.params.materialPreloaderHtml : '') + '</span></div>');
        };
        app.hideIndicator = function () {
            $('.preloader-indicator-overlay, .preloader-indicator-modal').remove();
        };
        // Action Sheet
        app.actions = function (target, params, animated) {
            var toPopover = false, modal, groupSelector, buttonSelector;
            if (arguments.length === 1 || arguments.length === 2 && typeof arguments[1] === 'boolean') {
                // Actions
                params = arguments[0];
                animated = arguments[1];
            }
            else {
                // Popover
                if (app.device.ios) {
                    if (app.device.ipad) toPopover = true;
                }
                else {
                    if (app.width >= 768) toPopover = true;
                }
            }
            if (typeof animated === 'undefined') animated = true;
        
            params = params || [];
        
            if (params.length > 0 && !Array.isArray(params[0])) {
                params = [params];
            }
            var modalHTML;
            if (toPopover) {
                var actionsToPopoverTemplate = app.params.modalActionsToPopoverTemplate ||
                    '<div class="popover actions-popover">' +
                      '<div class="popover-inner">' +
                        '{{#each this}}' +
                        '<div class="list-block">' +
                          '<ul>' +
                            '{{#each this}}' +
                            '{{#if label}}' +
                            '<li class="actions-popover-label {{#if color}}color-{{color}}{{/if}} {{#if bold}}actions-popover-bold{{/if}}">{{text}}</li>' +
                            '{{else}}' +
                            '<li><a href="#" class="item-link list-button {{#if color}}color-{{color}}{{/if}} {{#if bg}}bg-{{bg}}{{/if}} {{#if bold}}actions-popover-bold{{/if}} {{#if disabled}}disabled{{/if}}">{{text}}</a></li>' +
                            '{{/if}}' +
                            '{{/each}}' +
                          '</ul>' +
                        '</div>' +
                        '{{/each}}' +
                      '</div>' +
                    '</div>';
                if (!app._compiledTemplates.actionsToPopover) {
                    app._compiledTemplates.actionsToPopover = t7.compile(actionsToPopoverTemplate);
                }
                var popoverHTML = app._compiledTemplates.actionsToPopover(params);
                modal = $(app.popover(popoverHTML, target, true, animated));
                groupSelector = '.list-block ul';
                buttonSelector = '.list-button';
            }
            else {
                if (app.params.modalActionsTemplate) {
                    if (!app._compiledTemplates.actions) app._compiledTemplates.actions = t7.compile(app.params.modalActionsTemplate);
                    modalHTML = app._compiledTemplates.actions(params);
                }
                else {
                    var buttonsHTML = '';
                    for (var i = 0; i < params.length; i++) {
                        for (var j = 0; j < params[i].length; j++) {
                            if (j === 0) buttonsHTML += '<div class="actions-modal-group">';
                            var button = params[i][j];
                            var buttonClass = button.label ? 'actions-modal-label' : 'actions-modal-button';
                            if (button.bold) buttonClass += ' actions-modal-button-bold';
                            if (button.color) buttonClass += ' color-' + button.color;
                            if (button.bg) buttonClass += ' bg-' + button.bg;
                            if (button.disabled) buttonClass += ' disabled';
                            buttonsHTML += '<div class="' + buttonClass + '">' + button.text + '</div>';
                            if (j === params[i].length - 1) buttonsHTML += '</div>';
                        }
                    }
                    modalHTML = '<div class="actions-modal">' + buttonsHTML + '</div>';
                }
                _modalTemplateTempDiv.innerHTML = modalHTML;
                modal = $(_modalTemplateTempDiv).children();
                app.root.append(modal[0]);
                groupSelector = '.actions-modal-group';
                buttonSelector = '.actions-modal-button';
            }
        
            var groups = modal.find(groupSelector);
            groups.each(function (index, el) {
                var groupIndex = index;
                $(el).children().each(function (index, el) {
                    var buttonIndex = index;
                    var buttonParams = params[groupIndex][buttonIndex];
                    var clickTarget;
                    if (!toPopover && $(el).is(buttonSelector)) clickTarget = $(el);
                    if (toPopover && $(el).find(buttonSelector).length > 0) clickTarget = $(el).find(buttonSelector);
        
                    if (clickTarget) {
                        clickTarget.on('click', function (e) {
                            if (buttonParams.close !== false) app.closeModal(modal);
                            if (buttonParams.onClick) buttonParams.onClick(modal, e);
                        });
                    }
                });
            });
            if (!toPopover) app.openModal(modal, animated);
            return modal[0];
        };
        app.popover = function (modal, target, removeOnClose, animated, closeByOutside) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof closeByOutside === 'undefined') closeByOutside = true;
            if (typeof animated === 'undefined') animated = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                var _modal = document.createElement('div');
                _modal.innerHTML = modal.trim();
                if (_modal.childNodes.length > 0) {
                    modal = _modal.childNodes[0];
                    if (removeOnClose) modal.classList.add('remove-on-close');
                    if (!closeByOutside) modal.classList.add('ignore-close-by-outside');
                    app.root.append(modal);
                }
                else return false; //nothing found
            }
            modal = $(modal);
            target = $(target);
            if (modal.length === 0 || target.length === 0) return false;
            if (modal.parents('body').length === 0) {
                if (removeOnClose) modal.addClass('remove-on-close');
                if (!closeByOutside) modal.addClass.add('ignore-close-by-outside');
                app.root.append(modal[0]);
            }
            if (modal.find('.popover-angle').length === 0 && !app.params.material) {
                modal.append('<div class="popover-angle"></div>');
            }
            modal.show();
        
            var material = app.params.material;
        
            function sizePopover() {
                modal.css({left: '', top: ''});
                var modalWidth =  modal.width();
                var modalHeight =  modal.height(); // 13 - height of angle
                var modalAngle, modalAngleSize = 0, modalAngleLeft, modalAngleTop;
                if (!material) {
                    modalAngle = modal.find('.popover-angle');
                    modalAngleSize = modalAngle.width() / 2;
                    modalAngle.removeClass('on-left on-right on-top on-bottom').css({left: '', top: ''});
                }
                else {
                    modal.removeClass('popover-on-left popover-on-right popover-on-top popover-on-bottom').css({left: '', top: ''});
                }
        
                var targetWidth = target.outerWidth();
                var targetHeight = target.outerHeight();
                var targetOffset = target.offset();
                var targetOffsetLeft = targetOffset.left - app.left;
                var targetOffsetTop = targetOffset.top - app.top;
                var targetParentPage = target.parents('.page');
                if (targetParentPage.length > 0) {
                    targetOffsetTop = targetOffsetTop - targetParentPage[0].scrollTop;
                }
        
                var modalTop = 0;
                var modalLeft = 0;
                var diff = 0;
                // Top Position
                var modalPosition = material ? 'bottom' : 'top';
                if (material) {
                    if (modalHeight < app.height - targetOffsetTop - targetHeight) {
                        // On bottom
                        modalPosition = 'bottom';
                        modalTop = targetOffsetTop;
                    }
                    else if (modalHeight < targetOffsetTop) {
                        // On top
                        modalTop = targetOffsetTop - modalHeight + targetHeight;
                        modalPosition = 'top';
                    }
                    else {
                        // On middle
                        modalPosition = 'bottom';
                        modalTop = targetOffsetTop;
                    }
        
                    if (modalTop <= 0) {
                        modalTop = 8;
                    }
                    else if (modalTop + modalHeight >= app.height) {
                        modalTop = app.height - modalHeight - 8;
                    }
        
                    // Horizontal Position
                    modalLeft = targetOffsetLeft;
                    if (modalLeft + modalWidth >= app.width - 8) {
                        modalLeft = targetOffsetLeft + targetWidth - modalWidth - 8;
                    }
                    if (modalLeft < 8) {
                        modalLeft = 8;
                    }
                    if (modalPosition === 'top') {
                        modal.addClass('popover-on-top');
                    }
                    if (modalPosition === 'bottom') {
                        modal.addClass('popover-on-bottom');
                    }
                    if (target.hasClass('floating-button-to-popover') && !modal.hasClass('modal-in')) {
                        modal.addClass('popover-floating-button');
                        var diffX = (modalLeft + modalWidth / 2) - (targetOffsetLeft + targetWidth / 2),
                            diffY = (modalTop + modalHeight / 2) - (targetOffsetTop + targetHeight / 2);
                        target
                            .addClass('floating-button-to-popover-in')
                            .transform('translate3d(' + diffX + 'px, ' + diffY + 'px,0)')
                            .transitionEnd(function (e) {
                                if (!target.hasClass('floating-button-to-popover-in')) return;
                                target
                                    .addClass('floating-button-to-popover-scale')
                                    .transform('translate3d(' + diffX + 'px, ' + diffY + 'px,0) scale(' + (modalWidth/targetWidth) + ', ' + (modalHeight/targetHeight) + ')');
                            });
        
                        modal.once('popover:close', function () {
                            target
                                .removeClass('floating-button-to-popover-in floating-button-to-popover-scale')
                                .addClass('floating-button-to-popover-out')
                                .transform('')
                                .transitionEnd(function (e) {
                                    target.removeClass('floating-button-to-popover-out');
                                });
                        });
                        modal.once('popover:closed', function () {
                            modal.removeClass('popover-floating-button');
                        });
                    }
                    else if (target.hasClass('floating-button-to-popover') && modal.hasClass('modal-in')) {
                        modalLeft = targetOffsetLeft;
                        modalTop = targetOffsetTop;
                    }
        
                }
                else {
                    if ((modalHeight + modalAngleSize) < targetOffsetTop) {
                        // On top
                        modalTop = targetOffsetTop - modalHeight - modalAngleSize;
                    }
                    else if ((modalHeight + modalAngleSize) < app.height - targetOffsetTop - targetHeight) {
                        // On bottom
                        modalPosition = 'bottom';
                        modalTop = targetOffsetTop + targetHeight + modalAngleSize;
                    }
                    else {
                        // On middle
                        modalPosition = 'middle';
                        modalTop = targetHeight / 2 + targetOffsetTop - modalHeight / 2;
                        diff = modalTop;
                        if (modalTop <= 0) {
                            modalTop = 5;
                        }
                        else if (modalTop + modalHeight >= app.height) {
                            modalTop = app.height - modalHeight - 5;
                        }
                        diff = diff - modalTop;
                    }
        
                    // Horizontal Position
                    if (modalPosition === 'top' || modalPosition === 'bottom') {
                        modalLeft = targetWidth / 2 + targetOffsetLeft - modalWidth / 2;
                        diff = modalLeft;
                        if (modalLeft < 5) modalLeft = 5;
                        if (modalLeft + modalWidth > app.width) modalLeft = app.width - modalWidth - 5;
                        if (modalPosition === 'top') {
                            modalAngle.addClass('on-bottom');
                        }
                        if (modalPosition === 'bottom') {
                            modalAngle.addClass('on-top');
                        }
                        diff = diff - modalLeft;
                        modalAngleLeft = (modalWidth / 2 - modalAngleSize + diff);
                        modalAngleLeft = Math.max(Math.min(modalAngleLeft, modalWidth - modalAngleSize * 2 - 13), 13);
                        modalAngle.css({left: modalAngleLeft + 'px'});
        
                    }
                    else if (modalPosition === 'middle') {
                        modalLeft = targetOffsetLeft - modalWidth - modalAngleSize;
                        modalAngle.addClass('on-right');
                        if (modalLeft < 5 || (modalLeft + modalWidth > app.width)) {
                            if (modalLeft < 5) modalLeft = targetOffsetLeft + targetWidth + modalAngleSize;
                            if (modalLeft + modalWidth > app.width) modalLeft = app.width - modalWidth - 5;
                            modalAngle.removeClass('on-right').addClass('on-left');
                        }
                        modalAngleTop = (modalHeight / 2 - modalAngleSize + diff);
                        modalAngleTop = Math.max(Math.min(modalAngleTop, modalHeight - modalAngleSize * 2 - 13), 13);
                        modalAngle.css({top: modalAngleTop + 'px'});
                    }
                }
        
        
                // Apply Styles
                modal.css({top: modalTop + 'px', left: modalLeft + 'px'});
            }
        
            sizePopover();
        
            app.onResize(sizePopover);
        
            modal.on('popover:close', function () {
                app.offResize(sizePopover);
            });
        
            app.openModal(modal, animated);
            return modal[0];
        };
        app.popup = function (modal, removeOnClose, animated) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof animated === 'undefined') animated = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                var _modal = document.createElement('div');
                _modal.innerHTML = modal.trim();
                if (_modal.childNodes.length > 0) {
                    modal = _modal.childNodes[0];
                    if (removeOnClose) modal.classList.add('remove-on-close');
                    app.root.append(modal);
                }
                else return false; //nothing found
            }
            modal = $(modal);
            if (modal.length === 0) return false;
            if (modal.parents('body').length === 0) {
                if (removeOnClose) modal.addClass('remove-on-close');
                app.root.append(modal[0]);
            }
            modal.show();
        
            app.openModal(modal, animated);
            return modal[0];
        };
        app.pickerModal = function (modal, removeOnClose, animated) {
            if (typeof removeOnClose === 'undefined') removeOnClose = true;
            if (typeof animated === 'undefined') animated = true;
            if (typeof modal === 'string' && modal.indexOf('<') >= 0) {
                modal = $(modal);
                if (modal.length > 0) {
                    if (removeOnClose) modal.addClass('remove-on-close');
                    app.root.append(modal[0]);
                }
                else return false; //nothing found
            }
            modal = $(modal);
            if (modal.length === 0) return false;
            if (modal.parents('body').length === 0) {
                if (removeOnClose) modal.addClass('remove-on-close');
                app.root.append(modal[0]);
            }
            if ($('.picker-modal.modal-in:not(.modal-out)').length > 0 && !modal.hasClass('modal-in')) {
                app.closeModal('.picker-modal.modal-in:not(.modal-out)');
            }
            modal.show();
            app.openModal(modal, animated);
            return modal[0];
        };
        app.loginScreen = function (modal, animated) {
            if (!modal) modal = '.login-screen';
            if (typeof animated === 'undefined') animated = true;
            modal = $(modal);
            if (modal.length === 0) return false;
            if ($('.login-screen.modal-in:not(.modal-out)').length > 0 && !modal.hasClass('modal-in')) {
                app.closeModal('.login-screen.modal-in:not(.modal-out)');
            }
            modal.show();
        
            app.openModal(modal, animated);
            return modal[0];
        };
        app.openModal = function (modal, animated) {
            if (typeof animated === 'undefined') animated = true;
            modal = $(modal);
            modal[animated ? 'removeClass' : 'addClass']('not-animated');
        
            var isModal = modal.hasClass('modal');
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var isLoginScreen = modal.hasClass('login-screen');
            var isPickerModal = modal.hasClass('picker-modal');
            var isActions = modal.hasClass('actions-modal');
        
            // Modal Event Prefix
            var modalType = 'modal';
            if (isPopover) modalType = 'popover';
            if (isPopup) modalType = 'popup';
            if (isLoginScreen) modalType = 'loginscreen';
            if (isPickerModal) modalType = 'picker';
            if (isActions) modalType = 'actions';
        
            if ($('.modal.modal-in:not(.modal-out)').length && app.params.modalStack && isModal) {
                app.modalStack.push(function () {
                    app.openModal(modal);
                });
                return;
            }
        
            // do nothing if this modal already shown
            if (true === modal.data('f7-modal-shown')) {
                return;
            }
            modal.data('f7-modal-shown', true);
        
            // Move modal
            var modalParent = modal.parent();
            if (app.params.modalsMoveToRoot && !modalParent.is(app.root)) {
                app.root.append(modal);
                modal.once(modalType + ':closed', function() {
                   modalParent.append(modal);
                });
            }
        
            modal.once(modalType + ':close', function() {
               modal.removeData('f7-modal-shown');
            });
        
            if (isModal) {
                modal.show();
                modal.css({
                    marginTop: - Math.round(modal.outerHeight() / 2) + 'px'
                });
            }
        
            var overlay;
            if (!isLoginScreen && !isPickerModal) {
                if ($('.modal-overlay').length === 0 && !isPopup) {
                    app.root.append('<div class="modal-overlay"></div>');
                }
                if ($('.popup-overlay').length === 0 && isPopup) {
                    app.root.append('<div class="popup-overlay"></div>');
                }
                overlay = isPopup ? $('.popup-overlay') : $('.modal-overlay');
            }
            if (app.params.material && isPickerModal) {
                if (modal.hasClass('picker-calendar')) {
                    if ($('.picker-modal-overlay').length === 0 && !isPopup) {
                        app.root.append('<div class="picker-modal-overlay"></div>');
                    }
                    overlay = $('.picker-modal-overlay');
                }
            }
            if (overlay) {
                overlay[animated ? 'removeClass' : 'addClass']('not-animated');
            }
        
            //Make sure that styles are applied, trigger relayout;
            var clientLeft = modal[0].clientLeft;
        
            // Trugger open event
            modal.trigger('open ' + modalType + ':open');
        
            // Picker modal body class
            if (isPickerModal) {
                $('body').addClass('with-picker-modal');
            }
        
            // Init Pages and Navbars in modal
            if (modal.find('.' + app.params.viewClass).length > 0) {
                modal.find('.page').each(function () {
                    app.initPageWithCallback(this);
                });
                modal.find('.navbar').each(function () {
                    app.initNavbarWithCallback(this);
                });
            }
        
            // Classes for transition in
            if (!isLoginScreen && !isPickerModal) overlay.addClass('modal-overlay-visible');
            if (app.params.material && isPickerModal && overlay) overlay.addClass('modal-overlay-visible');
            if (animated) {
                modal.removeClass('modal-out').addClass('modal-in').transitionEnd(function (e) {
                    if (modal.hasClass('modal-out')) modal.trigger('closed ' + modalType + ':closed');
                    else modal.trigger('opened ' + modalType + ':opened');
                });
            }
            else {
                modal.removeClass('modal-out').addClass('modal-in');
                modal.trigger('opened ' + modalType + ':opened');
            }
            return true;
        };
        app.closeModal = function (modal, animated) {
            if (typeof animated === 'undefined') animated = true;
            modal = $(modal || '.modal-in');
            if (typeof modal !== 'undefined' && modal.length === 0) {
                return;
            }
            modal[animated ? 'removeClass' : 'addClass']('not-animated');
            var isModal = modal.hasClass('modal');
            var isPopover = modal.hasClass('popover');
            var isPopup = modal.hasClass('popup');
            var isLoginScreen = modal.hasClass('login-screen');
            var isPickerModal = modal.hasClass('picker-modal');
            var isActions = modal.hasClass('actions-modal');
        
            // Modal Event Prefix
            var modalType = 'modal';
            if (isPopover) modalType = 'popover';
            if (isPopup) modalType = 'popup';
            if (isLoginScreen) modalType = 'loginscreen';
            if (isPickerModal) modalType = 'picker';
            if (isActions) modalType = 'actions';
        
            var removeOnClose = modal.hasClass('remove-on-close');
            
            // ignore close popover
            if (isPopover && !removeOnClose && modal.hasClass('ignore-close-by-outside')) {
        	return;
            }
        
            // For Actions
            var keepOnClose = modal.hasClass('keep-on-close');
        
            var overlay;
        
            if (isPopup) overlay = $('.popup-overlay');
            else {
                if (isPickerModal && app.params.material) overlay = $('.picker-modal-overlay');
                else if (!isPickerModal) overlay = $('.modal-overlay');
            }
        
            if (isPopup){
                if (modal.length === $('.popup.modal-in').length) {
                    overlay.removeClass('modal-overlay-visible');
                }
            }
            else if (overlay && overlay.length > 0) {
                overlay.removeClass('modal-overlay-visible');
            }
            if (overlay) overlay[animated ? 'removeClass' : 'addClass']('not-animated');
        
            modal.trigger('close ' + modalType + ':close');
        
            // Picker modal body class
            if (isPickerModal) {
                $('body').removeClass('with-picker-modal');
                $('body').addClass('picker-modal-closing');
            }
        
            if (!(isPopover && !app.params.material)) {
                if (animated) {
                    modal.removeClass('modal-in').addClass('modal-out').transitionEnd(function (e) {
                        if (modal.hasClass('modal-out')) modal.trigger('closed ' + modalType + ':closed');
                        else {
                            modal.trigger('opened ' + modalType + ':opened');
                            if (isPopover) return;
                        }
        
                        if (isPickerModal) {
                            $('body').removeClass('picker-modal-closing');
                        }
                        if (isPopup || isLoginScreen || isPickerModal || isPopover) {
                            modal.removeClass('modal-out').hide();
                            if (removeOnClose && modal.length > 0) {
                                modal.remove();
                            }
                        }
                        else if (!keepOnClose) {
                            modal.remove();
                        }
                    });
                }
                else {
                    modal.trigger('closed ' + modalType + ':closed');
                    modal.removeClass('modal-in modal-out');
                    if (isPickerModal) {
                        $('body').removeClass('picker-modal-closing');
                    }
                    if (isPopup || isLoginScreen || isPickerModal || isPopover) {
                        modal.hide();
                        if (removeOnClose && modal.length > 0) {
                            modal.remove();
                        }
                    }
                    else if (!keepOnClose) {
                        modal.remove();
                    }
                }
                if (isModal && app.params.modalStack) {
                    app.modalStackClearQueue();
                }
            }
            else {
                modal.removeClass('modal-in modal-out not-animated').trigger('closed ' + modalType + ':closed').hide();
                if (removeOnClose) {
                    modal.remove();
                }
            }
            return true;
        };
        

        /*===============================================================================
        ************   Store and parse forms data   ************
        ===============================================================================*/
        app.formsData = {};
        app.formStoreData = function (formId, formJSON) {
            // Store form data in app.formsData
            app.formsData[formId] = formJSON;
        
            // Store form data in local storage also
            app.ls['f7form-' + formId] = JSON.stringify(formJSON);
        };
        app.formDeleteData = function (formId) {
            // Delete form data from app.formsData
            if (app.formsData[formId]) {
                app.formsData[formId] = '';
                delete app.formsData[formId];
            }
        
            // Delete form data from local storage also
            if (app.ls['f7form-' + formId]) {
                app.ls['f7form-' + formId] = '';
                app.ls.removeItem('f7form-' + formId);
            }
        };
        app.formGetData = function (formId) {
            // First of all check in local storage
            if (app.ls['f7form-' + formId]) {
                return JSON.parse(app.ls['f7form-' + formId]);
            }
            // Try to get it from formsData obj
            else if (app.formsData[formId]) return app.formsData[formId];
        };
        app.formToData = function (form) {
            form = $(form);
            if (form.length !== 1) return false;
        
            // Form data
            var formData = {};
        
            // Skip input types
            var skipTypes = ['submit', 'image', 'button', 'file'];
            var skipNames = [];
            form.find('input, select, textarea').each(function () {
                var input = $(this);
                var name = input.attr('name');
                var type = input.attr('type');
                var tag = this.nodeName.toLowerCase();
                if (skipTypes.indexOf(type) >= 0) return;
                if (skipNames.indexOf(name) >= 0 || !name) return;
                if (tag === 'select' && input.prop('multiple')) {
                    skipNames.push(name);
                    formData[name] = [];
                    form.find('select[name="' + name + '"] option').each(function () {
                        if (this.selected) formData[name].push(this.value);
                    });
                }
                else {
                    switch (type) {
                        case 'checkbox' :
                            skipNames.push(name);
                            formData[name] = [];
                            form.find('input[name="' + name + '"]').each(function () {
                                if (this.checked) formData[name].push(this.value);
                            });
                            break;
                        case 'radio' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (this.checked) formData[name] = this.value;
                            });
                            break;
                        default :
                            formData[name] = input.val();
                            break;
                    }
                }
            });
            form.trigger('formToJSON formToData form:todata', {formData: formData});
        
            return formData;
        };
        app.formToJSON = app.formToData;
        app.formFromData = function (form, formData) {
            form = $(form);
            if (form.length !== 1) return false;
        
            // Skip input types
            var skipTypes = ['submit', 'image', 'button', 'file'];
            var skipNames = [];
        
            form.find('input, select, textarea').each(function () {
                var input = $(this);
                var name = input.attr('name');
                var type = input.attr('type');
                var tag = this.nodeName.toLowerCase();
                if (typeof formData[name] === 'undefined' || formData[name] === null) return;
                if (skipTypes.indexOf(type) >= 0) return;
                if (skipNames.indexOf(name) >= 0 || !name) return;
                if (tag === 'select' && input.prop('multiple')) {
                    skipNames.push(name);
                    form.find('select[name="' + name + '"] option').each(function () {
                        if (formData[name].indexOf(this.value) >= 0) this.selected = true;
                        else this.selected = false;
                    });
                }
                else {
                    switch (type) {
                        case 'checkbox' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (formData[name].indexOf(this.value) >= 0) this.checked = true;
                                else this.checked = false;
                            });
                            break;
                        case 'radio' :
                            skipNames.push(name);
                            form.find('input[name="' + name + '"]').each(function () {
                                if (formData[name] === this.value) this.checked = true;
                                else this.checked = false;
                            });
                            break;
                        default :
                            input.val(formData[name]);
                            break;
                    }
                }
                if (tag === 'select' || tag === 'input' || tag === 'textarea') {
                    input.trigger('change');
                }
            });
            form.trigger('formFromJSON formFromData form:fromdata', {formData: formData});
        };
        app.formFromJSON = app.formFromData;
        
        app.initFormsStorage = function (pageContainer) {
            pageContainer = $(pageContainer);
            var forms = pageContainer.find('form.store-data');
            if (forms.length === 0) return;
        
            // Parse forms data and fill form if there is such data
            forms.each(function () {
                var id = this.getAttribute('id');
                if (!id) return;
                var formData = app.formGetData(id);
                if (formData) app.formFromData(this, formData);
            });
            // Update forms data on inputs change
            function storeForm() {
                /*jshint validthis:true */
                var form = $(this);
                var formId = form[0].id;
                if (!formId) return;
                var formJSON = app.formToData(form);
                if (!formJSON) return;
                app.formStoreData(formId, formJSON);
                form.trigger('store form:storedata', {data: formJSON});
            }
            forms.on('change submit', storeForm);
        
            // Detach Listeners
            function pageBeforeRemove() {
                forms.off('change submit', storeForm);
                pageContainer.off('page:beforeremove', pageBeforeRemove);
            }
            pageContainer.on('page:beforeremove', pageBeforeRemove);
        };

        /*===============================================================================
        ************   Ajax submit for forms   ************
        ===============================================================================*/
        // Ajax submit on forms
        $(document).on('submit change', 'form.ajax-submit, form.ajax-submit-onchange', function (e) {
            var form = $(this);
            if (e.type === 'change' && !form.hasClass('ajax-submit-onchange')) return;
            if (e.type === 'submit') e.preventDefault();
        
            var method = (form.attr('method') || 'GET').toUpperCase();
            var contentType = form.prop('enctype') || form.attr('enctype');
        
            var url = form.attr('action');
            if (!url) return;
        
            var data;
            if (method === 'POST') data = new FormData(form[0]);
            else data = $.serializeObject(app.formToJSON(form[0]));
        
            var xhr = $.ajax({
                method: method,
                url: url,
                contentType: contentType,
                data: data,
                beforeSend: function (xhr) {
                    form.trigger('beforeSubmit form:beforesend', {data:data, xhr: xhr});
                },
                error: function (xhr) {
                    form.trigger('submitError form:error', {data:data, xhr: xhr});
                },
                success: function (data) {
                    form.trigger('submitted form:success', {data: data, xhr: xhr});
                }
            });
        });
        
        

        /*===============================================================================
        ************   Resizable textarea   ************
        ===============================================================================*/
        app.resizeTextarea = function (textarea) {
            textarea = $(textarea);
            if (!textarea.hasClass('resizable')) {
                return;
            }
            textarea.css({'height': ''});
            var height = textarea[0].offsetHeight;
            var diff = height - textarea[0].clientHeight;
            var scrollHeight = textarea[0].scrollHeight;
        
            if (scrollHeight + diff > height) {
                var newAreaHeight = scrollHeight + diff;
                textarea.css('height', newAreaHeight + 'px');
            }
        };
        app.resizableTextarea = function (textarea) {
            textarea = $(textarea);
            if (textarea.length === 0) return;
            var textareaTimeout;
            function handleTextarea() {
                clearTimeout(textareaTimeout);
                textareaTimeout = setTimeout(function () {
                    app.resizeTextarea(textarea);
                }, 0);
            }
            textarea[0].f7DestroyResizableTextarea = function () {
                textarea.off('change keydown keypress keyup paste cut', handleTextarea);
            };
            return textarea.on('change keydown keypress keyup paste cut', handleTextarea);
        };
        app.destroyResizableTextarea = function (pageContainer) {
            pageContainer = $(pageContainer);
            if (pageContainer.length > 0 && pageContainer.is('textarea') && pageContainer[0].f7DestroyResizableTextarea) {
                pageContainer[0].f7DestroyResizableTextarea();
            }
            else if (pageContainer.length > 0) {
                pageContainer.find('textarea.resiable').each(function () {
                    var textarea = this;
                    if (textarea.f7DestroyResizableTextarea) {
                        textarea.f7DestroyResizableTextarea ();
                    }
                });
            }
        };
        app.initPageResizableTextarea = function (pageContainer) {
            pageContainer = $(pageContainer);
            var textareas = pageContainer.find('textarea.resizable');
            textareas.each(function () {
                app.resizableTextarea(this);
            });
        };

        /*======================================================
        ************   Material Text Inputs   ************
        ======================================================*/
        app.initPageMaterialInputs = function (pageContainer) {
            pageContainer = $(pageContainer);
            var textareas = pageContainer.find('textarea.resizable');
            pageContainer.find('.item-input').each(function () {
                var itemInput = $(this);
                var notInputs = ['checkbox', 'button', 'submit', 'range', 'radio', 'image'];
                itemInput.find('input, select, textarea').each(function () {
                    var input = $(this);
                    if (notInputs.indexOf(input.attr('type')) < 0) {
                        itemInput.addClass('item-input-field');
                        if (input.val().trim() !== '') {
                            input.parents('.item-input, .input-field').add(input.parents('.item-inner')).addClass('not-empty-state');
                        }
                    }
                });
                if (itemInput.parents('.input-item, .inputs-list').length > 0) return;
                itemInput.parents('.list-block').eq(0).addClass('inputs-list');
            });
        };
        /*======================================================
        ************   Material Focus Inputs   ************
        ======================================================*/
        app.initMaterialWatchInputs = function () {
            var notInputs = ['checkbox', 'button', 'submit', 'range', 'radio', 'image'];
            function addFocusState(e) {
                /*jshint validthis:true*/
                var i = $(this);
                var type = i.attr('type');
                if (notInputs.indexOf(type) >= 0) return;
                var els = i.add(i.parents('.item-input, .input-field')).add(i.parents('.item-inner').eq(0));
                els.removeClass('not-empty-state').addClass('focus-state');
            }
            function removeFocusState(e) {
                /*jshint validthis:true*/
                var i = $(this), value = i.val();
                var type = i.attr('type');
                if (notInputs.indexOf(type) >= 0) return;
                var els = i.add(i.parents('.item-input, .input-field')).add(i.parents('.item-inner').eq(0));
                els.removeClass('focus-state');
                if (value && value.trim() !== '') {
                    els.removeClass('focus-state').addClass('not-empty-state');
                }
                else {
                    els.removeClass('not-empty-state');
                }
            }
            function watchChangeState(e) {
                /*jshint validthis:true*/
                var input = $(this),
                    value = input.val();
                var type = input.attr('type');
                if (notInputs.indexOf(type) >= 0) return;
                var els = input.add(input.parents('.item-input, .input-field')).add(input.parents('.item-inner').eq(0));
                if (els.length === 0) return;
                if (value && (typeof value === 'string' && value.trim() !== '') || (Array.isArray(value) && value.length > 0)) {
                    els.addClass('not-empty-state');
                }
                else {
                    els.removeClass('not-empty-state');
                }
            }
            $(document).on('change', 'input, textarea, select', watchChangeState, true);
            $(document).on('focus', 'input, textarea, select', addFocusState, true);
            $(document).on('blur', 'input, textarea, select', removeFocusState, true);
        };
        

        /*===============================================================================
        ************   Fast Clicks   ************
        ************   Inspired by https://github.com/ftlabs/fastclick   ************
        ===============================================================================*/
        app.initFastClicks = function () {
            if (app.params.activeState) {
                $('html').addClass('watch-active-state');
            }
            if (app.device.ios && app.device.webView) {
                // Strange hack required for iOS 8 webview to work on inputs
                window.addEventListener('touchstart', function () {});
            }
        
            var touchStartX, touchStartY, touchStartTime, targetElement, trackClick, activeSelection, scrollParent, lastClickTime, isMoved, tapHoldFired, tapHoldTimeout;
            var activableElement, activeTimeout, needsFastClick, needsFastClickTimeOut;
            var rippleWave, rippleTarget, rippleTransform, rippleTimeout;
            function findActivableElement(el) {
                var target = $(el);
                var parents = target.parents(app.params.activeStateElements);
                var activable;
                if (target.is(app.params.activeStateElements)) {
                    activable = target;
                }
                if (parents.length > 0) {
                    activable = activable ? activable.add(parents) : parents;
                }
                return activable ? activable : target;
            }
            function isInsideScrollableView(el) {
                var pageContent = el.parents('.page-content, .panel');
        
                if (pageContent.length === 0) {
                    return false;
                }
        
                // This event handler covers the "tap to stop scrolling".
                if (pageContent.prop('scrollHandlerSet') !== 'yes') {
                    pageContent.on('scroll', function() {
                      clearTimeout(activeTimeout);
                      clearTimeout(rippleTimeout);
                    });
                    pageContent.prop('scrollHandlerSet', 'yes');
                }
        
                return true;
            }
            function addActive() {
                if (!activableElement) return;
                activableElement.addClass('active-state');
            }
            function removeActive(el) {
                if (!activableElement) return;
                activableElement.removeClass('active-state');
                activableElement = null;
            }
            function isFormElement(el) {
                var nodes = ('input select textarea label').split(' ');
                if (el.nodeName && nodes.indexOf(el.nodeName.toLowerCase()) >= 0) return true;
                return false;
            }
            function androidNeedsBlur(el) {
                var noBlur = ('button input textarea select').split(' ');
                if (document.activeElement && el !== document.activeElement && document.activeElement !== document.body) {
                    if (noBlur.indexOf(el.nodeName.toLowerCase()) >= 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    return false;
                }
            }
            function targetNeedsFastClick(el) {
                var $el = $(el);
                if (el.nodeName.toLowerCase() === 'input' && (el.type === 'file' || el.type === 'range')) return false;
                if (el.nodeName.toLowerCase() === 'select' && app.device.android) return false;
                if ($el.hasClass('no-fastclick') || $el.parents('.no-fastclick').length > 0) return false;
                if (app.params.fastClicksExclude && $el.is(app.params.fastClicksExclude)) return false;
                return true;
            }
            function targetNeedsFocus(el) {
                if (document.activeElement === el) {
                    return false;
                }
                var tag = el.nodeName.toLowerCase();
                var skipInputs = ('button checkbox file image radio submit').split(' ');
                if (el.disabled || el.readOnly) return false;
                if (tag === 'textarea') return true;
                if (tag === 'select') {
                    if (app.device.android) return false;
                    else return true;
                }
                if (tag === 'input' && skipInputs.indexOf(el.type) < 0) return true;
            }
            function targetNeedsPrevent(el) {
                el = $(el);
                var prevent = true;
                if (el.is('label') || el.parents('label').length > 0) {
                    if (app.device.android) {
                        prevent = false;
                    }
                    else if (app.device.ios && el.is('input')) {
                        prevent = true;
                    }
                    else prevent = false;
                }
                return prevent;
            }
        
            // Mouse Handlers
            function handleMouseDown (e) {
                findActivableElement(e.target).addClass('active-state');
                if ('which' in e && e.which === 3) {
                    setTimeout(function () {
                        $('.active-state').removeClass('active-state');
                    }, 0);
                }
                if (app.params.material && app.params.materialRipple) {
                    touchStartX = e.pageX;
                    touchStartY = e.pageY;
                    rippleTouchStart(e.target, e.pageX, e.pageY);
                }
            }
            function handleMouseMove (e) {
                $('.active-state').removeClass('active-state');
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchMove();
                }
            }
            function handleMouseUp (e) {
                $('.active-state').removeClass('active-state');
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
            }
        
            // Material Touch Ripple Effect
            function findRippleElement(el) {
                var needsRipple = app.params.materialRippleElements;
                var $el = $(el);
                if ($el.is(needsRipple)) {
                    if ($el.hasClass('no-ripple')) {
                        return false;
                    }
                    return $el;
                }
                else if ($el.parents(needsRipple).length > 0) {
                    var rippleParent = $el.parents(needsRipple).eq(0);
                    if (rippleParent.hasClass('no-ripple')) {
                        return false;
                    }
                    return rippleParent;
                }
                else return false;
            }
            function createRipple(x, y, el) {
                if (!el) return;
                var box = el[0].getBoundingClientRect();
                var center = {
                    x: x - box.left,
                    y: y - box.top
                },
                    height = box.height,
                    width = box.width;
                var diameter = Math.max(Math.pow((Math.pow(height, 2) + Math.pow(width, 2)), 0.5), 48);
        
                rippleWave = $(
                    '<div class="ripple-wave" style="width: ' + diameter + 'px; height: '+diameter+'px; margin-top:-'+diameter/2+'px; margin-left:-'+diameter/2+'px; left:'+center.x+'px; top:'+center.y+'px;"></div>'
                );
                el.prepend(rippleWave);
                var clientLeft = rippleWave[0].clientLeft;
                rippleTransform = 'translate3d('+(-center.x + width/2)+'px, '+(-center.y + height/2)+'px, 0) scale(1)';
                rippleWave.transform(rippleTransform);
            }
        
            function removeRipple() {
                if (!rippleWave) return;
                var toRemove = rippleWave;
        
                var removeTimeout = setTimeout(function () {
                    toRemove.remove();
                }, 400);
        
                rippleWave
                    .addClass('ripple-wave-fill')
                    .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'))
                    .transitionEnd(function () {
                        clearTimeout(removeTimeout);
        
                        var rippleWave = $(this)
                            .addClass('ripple-wave-out')
                            .transform(rippleTransform.replace('scale(1)', 'scale(1.01)'));
        
                        removeTimeout = setTimeout(function () {
                            rippleWave.remove();
                        }, 700);
        
                        setTimeout(function () {
                            rippleWave.transitionEnd(function(){
                                clearTimeout(removeTimeout);
                                $(this).remove();
                            });
                        }, 0);
                    });
        
                rippleWave = rippleTarget = undefined;
            }
        
            function rippleTouchStart (el, x, y) {
                rippleTarget = findRippleElement(el);
                if (!rippleTarget || rippleTarget.length === 0) {
                    rippleTarget = undefined;
                    return;
                }
                if (!isInsideScrollableView(rippleTarget)) {
                    createRipple(touchStartX, touchStartY, rippleTarget);
                }
                else {
                    rippleTimeout = setTimeout(function () {
                        createRipple(touchStartX, touchStartY, rippleTarget);
                    }, 80);
                }
            }
            function rippleTouchMove() {
                clearTimeout(rippleTimeout);
                removeRipple();
            }
            function rippleTouchEnd() {
                if (rippleWave) {
                    removeRipple();
                }
                else if (rippleTarget && !isMoved) {
                    clearTimeout(rippleTimeout);
                    createRipple(touchStartX, touchStartY, rippleTarget);
                    setTimeout(removeRipple, 0);
                }
                else {
                    removeRipple();
                }
            }
        
            // Send Click
            function sendClick(e) {
                var touch = e.changedTouches[0];
                var evt = document.createEvent('MouseEvents');
                var eventType = 'click';
                if (app.device.android && targetElement.nodeName.toLowerCase() === 'select') {
                    eventType = 'mousedown';
                }
                evt.initMouseEvent(eventType, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
                evt.forwardedTouchEvent = true;
                targetElement.dispatchEvent(evt);
            }
        
            // Touch Handlers
            function handleTouchStart(e) {
                isMoved = false;
                tapHoldFired = false;
                if (e.targetTouches.length > 1) {
                    if (activableElement) removeActive();
                    return true;
                }
                if (e.touches.length > 1 && activableElement) {
                    removeActive();
                }
                if (app.params.tapHold) {
                    if (tapHoldTimeout) clearTimeout(tapHoldTimeout);
                    tapHoldTimeout = setTimeout(function () {
                        if (e && e.touches && e.touches.length > 1) return;
                        tapHoldFired = true;
                        e.preventDefault();
                        $(e.target).trigger('taphold');
                    }, app.params.tapHoldDelay);
                }
                if (needsFastClickTimeOut) clearTimeout(needsFastClickTimeOut);
                needsFastClick = targetNeedsFastClick(e.target);
        
                if (!needsFastClick) {
                    trackClick = false;
                    return true;
                }
                if (app.device.ios || (app.device.android && 'getSelection' in window)) {
                    var selection = window.getSelection();
                    if (selection.rangeCount && selection.focusNode !== document.body && (!selection.isCollapsed || document.activeElement === selection.focusNode)) {
                        activeSelection = true;
                        return true;
                    }
                    else {
                        activeSelection = false;
                    }
                }
                if (app.device.android)  {
                    if (androidNeedsBlur(e.target)) {
                        document.activeElement.blur();
                    }
                }
        
                trackClick = true;
                targetElement = e.target;
                touchStartTime = (new Date()).getTime();
                touchStartX = e.targetTouches[0].pageX;
                touchStartY = e.targetTouches[0].pageY;
        
                // Detect scroll parent
                if (app.device.ios) {
                    scrollParent = undefined;
                    $(targetElement).parents().each(function () {
                        var parent = this;
                        if (parent.scrollHeight > parent.offsetHeight && !scrollParent) {
                            scrollParent = parent;
                            scrollParent.f7ScrollTop = scrollParent.scrollTop;
                        }
                    });
                }
                if ((e.timeStamp - lastClickTime) < app.params.fastClicksDelayBetweenClicks) {
                    e.preventDefault();
                }
        
                if (app.params.activeState) {
                    activableElement = findActivableElement(targetElement);
                    // If it's inside a scrollable view, we don't trigger active-state yet,
                    // because it can be a scroll instead. Based on the link:
                    // http://labnote.beedesk.com/click-scroll-and-pseudo-active-on-mobile-webk
                    if (!isInsideScrollableView(activableElement)) {
                        addActive();
                    } else {
                        activeTimeout = setTimeout(addActive, 80);
                    }
                }
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchStart(targetElement, touchStartX, touchStartY);
                }
            }
            function handleTouchMove(e) {
                if (!trackClick) return;
                var _isMoved = false;
                var distance = app.params.fastClicksDistanceThreshold;
                if (distance) {
                    var pageX = e.targetTouches[0].pageX;
                    var pageY = e.targetTouches[0].pageY;
                    if (Math.abs(pageX - touchStartX) > distance ||  Math.abs(pageY - touchStartY) > distance) {
                        _isMoved = true;
                    }
                }
                else {
                    _isMoved = true;
                }
                if (_isMoved) {
                    trackClick = false;
                    targetElement = null;
                    isMoved = true;
                    if (app.params.tapHold) {
                        clearTimeout(tapHoldTimeout);
                    }
        			if (app.params.activeState) {
        				clearTimeout(activeTimeout);
        				removeActive();
        			}
                    if (app.params.material && app.params.materialRipple) {
                        rippleTouchMove();
                    }
                }
            }
            function handleTouchEnd(e) {
                clearTimeout(activeTimeout);
                clearTimeout(tapHoldTimeout);
        
                if (!trackClick) {
                    if (!activeSelection && needsFastClick) {
                        if (!(app.device.android && !e.cancelable)) {
                            e.preventDefault();
                        }
                    }
                    return true;
                }
        
                if (document.activeElement === e.target) {
                    if (app.params.activeState) removeActive();
                    if (app.params.material && app.params.materialRipple) {
                        rippleTouchEnd();
                    }
                    return true;
                }
        
                if (!activeSelection) {
                    e.preventDefault();
                }
        
                if ((e.timeStamp - lastClickTime) < app.params.fastClicksDelayBetweenClicks) {
                    setTimeout(removeActive, 0);
                    return true;
                }
        
                lastClickTime = e.timeStamp;
        
                trackClick = false;
        
                if (app.device.ios && scrollParent) {
                    if (scrollParent.scrollTop !== scrollParent.f7ScrollTop) {
                        return false;
                    }
                }
        
                // Add active-state here because, in a very fast tap, the timeout didn't
                // have the chance to execute. Removing active-state in a timeout gives
                // the chance to the animation execute.
                if (app.params.activeState) {
                    addActive();
                    setTimeout(removeActive, 0);
                }
                // Remove Ripple
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
        
                // Trigger focus when required
                if (targetNeedsFocus(targetElement)) {
                    if (app.device.ios && app.device.webView) {
                        if ((event.timeStamp - touchStartTime) > 159) {
                            targetElement = null;
                            return false;
                        }
                        targetElement.focus();
                        return false;
                    }
                    else {
                        targetElement.focus();
                    }
                }
        
                // Blur active elements
                if (document.activeElement && targetElement !== document.activeElement && document.activeElement !== document.body && targetElement.nodeName.toLowerCase() !== 'label') {
                    document.activeElement.blur();
                }
        
                // Send click
                e.preventDefault();
                sendClick(e);
                return false;
            }
            function handleTouchCancel(e) {
                trackClick = false;
                targetElement = null;
        
                // Remove Active State
                clearTimeout(activeTimeout);
                clearTimeout(tapHoldTimeout);
                if (app.params.activeState) {
                    removeActive();
                }
        
                // Remove Ripple
                if (app.params.material && app.params.materialRipple) {
                    rippleTouchEnd();
                }
            }
        
            function handleClick(e) {
                var allowClick = false;
        
                if (trackClick) {
                    targetElement = null;
                    trackClick = false;
                    return true;
                }
                if (e.target.type === 'submit' && e.detail === 0 || e.target.type === 'file') {
                    return true;
                }
                if (!targetElement) {
                    if (!isFormElement(e.target)) {
                        allowClick =  true;
                    }
                }
                if (!needsFastClick) {
                    allowClick = true;
                }
                if (document.activeElement === targetElement) {
                    allowClick =  true;
                }
                if (e.forwardedTouchEvent) {
                    allowClick =  true;
                }
                if (!e.cancelable) {
                    allowClick =  true;
                }
                if (app.params.tapHold && app.params.tapHoldPreventClicks && tapHoldFired) {
                    allowClick = false;
                }
                if (!allowClick) {
                    e.stopImmediatePropagation();
                    e.stopPropagation();
                    if (targetElement) {
                        if (targetNeedsPrevent(targetElement) || isMoved) {
                            e.preventDefault();
                        }
                    }
                    else {
                        e.preventDefault();
                    }
                    targetElement = null;
                }
                needsFastClickTimeOut = setTimeout(function () {
                    needsFastClick = false;
                }, (app.device.ios || app.device.androidChrome ? 100 : 400));
        
                if (app.params.tapHold) {
                    tapHoldTimeout = setTimeout(function () {
                        tapHoldFired = false;
                    }, (app.device.ios || app.device.androidChrome ? 100 : 400));
                }
        
                return allowClick;
            }
            if (app.support.touch) {
                document.addEventListener('click', handleClick, true);
        
                document.addEventListener('touchstart', handleTouchStart);
                document.addEventListener('touchmove', handleTouchMove);
                document.addEventListener('touchend', handleTouchEnd);
                document.addEventListener('touchcancel', handleTouchCancel);
            }
            else {
                if (app.params.activeState) {
                    document.addEventListener('mousedown', handleMouseDown);
                    document.addEventListener('mousemove', handleMouseMove);
                    document.addEventListener('mouseup', handleMouseUp);
                }
            }
            if (app.params.material && app.params.materialRipple) {
                document.addEventListener('contextmenu', function (e) {
                    if (activableElement) removeActive();
                    rippleTouchEnd();
                });
            }
        
        };
        

        /*===========================
        Compile Template7 Templates On App Init
        ===========================*/
        app.initTemplate7Templates = function () {
            if (!window.Template7) return;
            Template7.templates = Template7.templates || app.params.templates || {};
            Template7.data = Template7.data || app.params.template7Data || {};
            Template7.cache = Template7.cache || {};
        
            app.templates = Template7.templates;
            app.template7Data = Template7.data;
            app.template7Cache = Template7.cache;
        
            // Precompile templates on app init
            if (!app.params.precompileTemplates) return;
            $('script[type="text/template7"]').each(function () {
                var id = $(this).attr('id');
                if (!id) return;
                Template7.templates[id] = Template7.compile($(this).html());
            });
        };
        

        /*=======================================
        ************   Plugins API   ************
        =======================================*/
        var _plugins = [];
        app.initPlugins = function () {
            // Initialize plugins
            for (var plugin in app.plugins) {
                var p = app.plugins[plugin](app, app.params[plugin]);
                if (p) _plugins.push(p);
            }
        };
        // Plugin Hooks
        app.pluginHook = function (hook) {
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].hooks && hook in _plugins[i].hooks) {
                    _plugins[i].hooks[hook](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };
        // Prevented by plugin
        app.pluginPrevent = function (action) {
            var prevent = false;
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].prevents && action in _plugins[i].prevents) {
                    if (_plugins[i].prevents[action](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])) prevent = true;
                }
            }
            return prevent;
        };
        // Preprocess content by plugin
        app.pluginProcess = function (process, data) {
            var processed = data;
            for (var i = 0; i < _plugins.length; i++) {
                if (_plugins[i].preprocess && process in _plugins[i].preprocess) {
                    processed = _plugins[i].preprocess[process](data, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
                }
            }
            return processed;
        };
        
        

        /*======================================================
        ************   App Init   ************
        ======================================================*/
        app.init = function () {
            // Compile Template7 templates on app load
            if (app.initTemplate7Templates) app.initTemplate7Templates();
        
            // Init Plugins
            if (app.initPlugins) app.initPlugins();
        
            // Init Device
            if (app.getDeviceInfo) app.getDeviceInfo();
        
            // Init resize events and calc app sizes
            if (app.initResize) app.initResize();
        
            // Init Panels Breakpoints
            if (app.initPanelsBreakpoints && (app.params.panelLeftBreakpoint || app.params.panelRightBreakpoint)) app.initPanelsBreakpoints();
        
            // Init Click events
            if (app.initFastClicks && app.params.fastClicks) app.initFastClicks();
            if (app.initClickEvents) app.initClickEvents();
        
            // Init each page callbacks
            $('.page:not(.cached)').each(function () {
                app.initPageWithCallback(this);
            });
        
            // Init each navbar callbacks
            $('.navbar:not(.cached)').each(function () {
                app.initNavbarWithCallback(this);
            });
        
            // Init push state
            if (app.initPushState && app.params.pushState) app.initPushState();
        
            // Init Live Swipeouts events
            if (app.initSwipeout && app.params.swipeout) app.initSwipeout();
        
            // Init Live Sortable events
            if (app.initSortable && app.params.sortable) app.initSortable();
        
            // Init Live Swipe Panels
            if (app.initSwipePanels && (app.params.swipePanel || app.params.swipePanelOnlyClose)) app.initSwipePanels();
        
            // Init Material Inputs
            if (app.params.material && app.initMaterialWatchInputs) app.initMaterialWatchInputs();
        
            // Init Material Tabbar
            if (app.params.material) {
                $('.tabbar').each(function (index, el) {
                    if ($(el).parents('.page').length === 0) {
                        app.initMaterialTabbar(el);
                    }
                });
            }
        
            // App Init callback
            if (app.params.onAppInit) app.params.onAppInit();
        
            // Plugin app init hook
            app.pluginHook('appInit');
        };
        if (app.params.init) app.init();
        

        //Return instance
        return app;
    };
    
    // Save Dom7
    Framework7.$ = window.Dom7;
    

    /*===========================
    Features Support Detection
    ===========================*/
    Framework7.prototype.support = (function () {
        var support = {
            touch: !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch),
            passiveListener: (function () {
                var supportsPassive = false;
                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener('testPassiveListener', null, opts);
                } catch (e) {}
                return supportsPassive;
            })()
        };
    
        // Export object
        return support;
    })();
    

    /*===========================
    Device/OS Detection
    ===========================*/
    Framework7.prototype.device = (function () {
        var device = {};
        var ua = navigator.userAgent;
        var $ = Dom7;
    
        var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/);
        var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    
        device.ios = device.android = device.windows = device.iphone = device.ipod = device.ipad = device.androidChrome = false;
    
        // Windows
        if (windows) {
            device.os = 'windows';
            device.osVersion = windows[2];
            device.windows = true;
        }
        // Android
        if (android && !windows) {
            device.os = 'android';
            device.osVersion = android[2];
            device.android = true;
            device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
        }
        if (ipad || iphone || ipod) {
            device.os = 'ios';
            device.ios = true;
        }
        // iOS
        if (iphone && !ipod) {
            device.osVersion = iphone[2].replace(/_/g, '.');
            device.iphone = true;
        }
        if (ipad) {
            device.osVersion = ipad[2].replace(/_/g, '.');
            device.ipad = true;
        }
        if (ipod) {
            device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
            device.iphone = true;
        }
        // iOS 8+ changed UA
        if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
            if (device.osVersion.split('.')[0] === '10') {
                device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
            }
        }
    
        // Webview
        device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
    
        // Minimal UI
        if (device.os && device.os === 'ios') {
            var osVersionArr = device.osVersion.split('.');
            device.minimalUi = !device.webView &&
                                (ipod || iphone) &&
                                (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
                                $('meta[name="viewport"]').length > 0 && $('meta[name="viewport"]').attr('content').indexOf('minimal-ui') >= 0;
        }
    
        // Check for status bar and fullscreen app mode
        var windowWidth = $(window).width();
        var windowHeight = $(window).height();
    
        device.needsStatusBar = function () {
            if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
                return true;
            }
            return false;
        };
        device.statusBar = device.needsStatusBar();
    
        // Classes
        var classNames = [];
    
        // Pixel Ratio
        device.pixelRatio = window.devicePixelRatio || 1;
        classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio));
        if (device.pixelRatio >= 2) {
            classNames.push('retina');
        }
    
        // OS classes
        if (device.os) {
            classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
            if (device.os === 'ios') {
                var major = parseInt(device.osVersion.split('.')[0], 10);
                for (var i = major - 1; i >= 6; i--) {
                    classNames.push('ios-gt-' + i);
                }
            }
    
        }
        // Status bar classes
        if (device.statusBar) {
            classNames.push('with-statusbar-overlay');
        }
        else {
            $('html').removeClass('with-statusbar-overlay');
        }
    
        // Add html classes
        if (classNames.length > 0) $('html').addClass(classNames.join(' '));
    
        // Export object
        return device;
    })();
    

    /*===========================
    Plugins prototype
    ===========================*/
    Framework7.prototype.plugins = {};
    

})();
