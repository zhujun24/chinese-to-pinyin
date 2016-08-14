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
  let chinese = chn;
  let fullLength = str.length;

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
    i = 1;
    let otherArr = [];
    let newChn = `k${chinese}`;
    let fullLen = newChn.length;
    str = `k${str}`;
    for (; i < fullLen; i++) {
      let splitReg = new RegExp(`${newChn[i - 1]}.*?${newChn[i]}`);
      let result = str.match(splitReg);
      if (result) {
        result = result[0];
        let len = result.length;
        otherArr.push(result.substr(1, len - 2));
        str = str.substr(result.length - 1, fullLength);
      }
    }
    otherArr.push(str.substr(1, fullLength + 1));
    let res = '';
    chn = chn.split(' ');
    otherArr.forEach((val, index) => {
      if (val) {
        otherArr[index] = `${val} `;
      }
      if (index === fullLen - 1) {
        res += otherArr[index];
      } else {
        res += `${otherArr[index]}${chn[index]} `;
      }
    });
    chn = res;
  }
  return chn.trim();
};

module.exports = convert;
