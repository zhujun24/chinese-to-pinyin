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

  str = str.match(/[\u4E00-\u9FA5]*/g).join('');

  let i = 0;
  let lens = dictionarys.length;
  for (; i < lens; i++) {
    let complete = false;
    for (let key of Object.keys(dictionarys[i])) {
      if (str.indexOf(key) !== -1) {
        str = str.replace(new RegExp(key, 'g'), dictionarys[i][key]);
        if (!reg.test(str)) {
          str = str.replace(/ /, '');
          if (options.numberTone) {
            str = numberTone(str);
          } else if (options.noTone) {
            str = noTone(str);
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
  return str;
};

export default convert;

// console.log(convert('我但是abc发挥技术22', {numberTone: '1'}));

