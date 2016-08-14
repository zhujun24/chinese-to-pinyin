'use strict';

var _dictionary_ = require('../dictionary/dictionary_1');

var _dictionary_2 = _interopRequireDefault(_dictionary_);

var _dictionary_3 = require('../dictionary/dictionary_2');

var _dictionary_4 = _interopRequireDefault(_dictionary_3);

var _dictionary_5 = require('../dictionary/dictionary_3');

var _dictionary_6 = _interopRequireDefault(_dictionary_5);

var _dictionary_7 = require('../dictionary/dictionary_4');

var _dictionary_8 = _interopRequireDefault(_dictionary_7);

var _dictionary_9 = require('../dictionary/dictionary_5');

var _dictionary_10 = _interopRequireDefault(_dictionary_9);

var _dictionary_11 = require('../dictionary/dictionary_6');

var _dictionary_12 = _interopRequireDefault(_dictionary_11);

var _surnames = require('../dictionary/surnames');

var _surnames2 = _interopRequireDefault(_surnames);

var _tone = require('./tone');

var _tone2 = _interopRequireDefault(_tone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reg = new RegExp(/[\u4E00-\u9FA5]/);

var dictionarys = [_dictionary_2.default, _dictionary_4.default, _dictionary_6.default, _dictionary_8.default, _dictionary_10.default, _dictionary_12.default, _surnames2.default];

var noTone = function noTone(str) {
  Object.keys(_tone2.default).forEach(function (key) {
    if (str.indexOf(key) !== -1) {
      str = str.replace(new RegExp(key, 'g'), _tone2.default[key][0]);
    }
  });
  return str;
};

var numberTone = function numberTone(str) {
  var strs = str.split(' ');
  strs.forEach(function (val, index) {
    var thisKey = null;

    Object.keys(_tone2.default).forEach(function (key) {
      if (val.indexOf(key) !== -1) {
        thisKey = key;
        strs[index] = val.replace(new RegExp(key, 'g'), _tone2.default[key][0]);
      }
    });
    strs[index] += _tone2.default[thisKey][1];
  });

  return strs.join(' ');
};

var convert = function convert(str, options) {
  options = options || {};

  var chn = str.match(/[\u4E00-\u9FA5]*/g).join('');

  var i = 0;
  var lens = dictionarys.length;
  for (; i < lens; i++) {
    var complete = false;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = Object.keys(dictionarys[i])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var key = _step.value;

        if (chn.indexOf(key) !== -1) {
          chn = chn.replace(new RegExp(key, 'g'), dictionarys[i][key]);
          if (!reg.test(chn)) {
            chn = chn.replace(/ /, '');
            if (options.numberTone) {
              chn = numberTone(chn);
            } else if (options.noTone) {
              chn = noTone(chn);
            }
            complete = true;
            break;
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (complete) {
      break;
    }
  }
  if (options.filterChinese) {
    (function () {
      chn = chn.split(' ');
      var otherArr = ['']; // 特殊字符映射
      var preIsChinese = false;
      var len = str.length;
      for (i = 0; i < len; i++) {
        if (!reg.test(str[i])) {
          // 非汉字字符
          if (preIsChinese) {
            otherArr[otherArr.length] = str[i];
          } else {
            otherArr[otherArr.length - 1] += str[i];
          }
          preIsChinese = false;
        } else {
          // 汉字
          otherArr.push('');
          preIsChinese = true;
        }
      }
      var res = '';
      if (otherArr[0]) {
        res = otherArr[0] + ' ';
      }

      var k = 0;
      otherArr.forEach(function (val, index) {
        if (index !== 0) {
          if (val) {
            res += val + ' ';
          } else {
            res += chn[k] + ' ';
            k++;
          }
        }
      });
      chn = res;
    })();
  }
  return chn.trim();
};

module.exports = convert;
