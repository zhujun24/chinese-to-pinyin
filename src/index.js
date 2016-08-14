import dictionary1 from '../dictionary/dictionary_1';
import dictionary2 from '../dictionary/dictionary_2';
import dictionary3 from '../dictionary/dictionary_3';
import dictionary4 from '../dictionary/dictionary_4';
import dictionary5 from '../dictionary/dictionary_5';
import dictionary6 from '../dictionary/dictionary_6';
import surnames from '../dictionary/surnames';
import tone from './tone';

const reg = new RegExp(/[\u4E00-\u9FA5]/);

let dictionarys = [dictionary1,
  dictionary2,
  dictionary3,
  dictionary4,
  dictionary5,
  dictionary6,
  surnames
];

let noTone = (str) => {
  Object.keys(tone).forEach((key) => {
    if (str.indexOf(key) !== -1) {
      str = str.replace(new RegExp(key, 'g'), tone[key][0]);
    }
  });
  return str;
};

let numberTone = (str) => {
  let strs = str.split(' ');
  strs.forEach((val, index) => {
    let thisKey = null;

    Object.keys(tone).forEach((key) => {
      if (val.indexOf(key) !== -1) {
        thisKey = key;
        strs[index] = val.replace(new RegExp(key, 'g'), tone[key][0]);
      }
    });
    strs[index] += tone[thisKey][1];
  });

  return strs.join(' ');
};

const convert = (str, options) => {
  options = options || {};

  let chn = str.match(/[\u4E00-\u9FA5]*/g).join('');

  let i = 0;
  let lens = dictionarys.length;
  for (; i < lens; i++) {
    let complete = false;
    for (let key of Object.keys(dictionarys[i])) {
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

    if (complete) {
      break;
    }
  }
  if (options.filterChinese) {
    chn = chn.split(' ');
    let otherArr = ['']; // 特殊字符映射
    let preIsChinese = false;
    let len = str.length;
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
    let res = '';
    if (otherArr[0]) {
      res = `${otherArr[0]} `;
    }

    let k = 0;
    otherArr.forEach((val, index) => {
      if (index !== 0) {
        if (val) {
          res += `${val} `;
        } else {
          res += `${chn[k]} `;
          k++;
        }
      }
    });
    chn = res;
  }
  return chn.trim();
};

module.exports = convert;
