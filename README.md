# Chinese-to-Pinyin - 一个将中文翻译成拼音的库,支持多音字

[![npm package](https://nodei.co/npm/chinese-to-pinyin.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/request/)

[![npm package](https://img.shields.io/npm/v/chinese-to-pinyin.svg?style=flat-square)](https://www.npmjs.org/package/chinese-to-pinyin)
[![NPM downloads](https://img.shields.io/npm/dm/chinese-to-pinyin.svg?style=flat-square)](https://npmjs.org/package/chinese-to-pinyin)
[![Dependency Status](https://david-dm.org/zhujun24/chinese-to-pinyin.svg?style=flat-square)](https://david-dm.org/zhujun24/chinese-to-pinyin)

## 安装
```bash
npm install chinese-to-pinyin
```

## 开发
```bash
npm start
```

## 测试
```bash
npm test
```

## 编译
```bash
npm run build
```

## 使用
```js
var pinyin = require("chinese-to-pinyin");
pinyin('中文语句')
```

## 示例
```js
pinyin('今天天气真好'); // jīn tiān tiān qì zhēn hǎo
```

## 支持多音字
```js
pinyin('蚌埠六安哪吒都灵'); // bèng bù lù ān né zhā dū líng
```

## 略去声调
```js
pinyin('今天天气真好', {removeTone: true}); // jin tian tian qi zhen hao
```

## 声调转数字
```js
pinyin('今天天气真好', {toneToNumber: true}); // jin1 tian1 tian1 qi4 zhen1 hao3
```

## 声调转数字,只输出音调
```js
pinyin('今天天气真好', {toneToNumberOnly: true}); // 1 1 1 4 1 3
```

## 保留未翻译的非中文字符
```js
pinyin('1今a天bb天ccc气dd dd真e好fff', {keepRest: true}); // 1 jīn a tiān bb tiān ccc qì dd dd zhēn e hǎo fff
```

## 获取中文首字母
```js
pinyin('今天天气真好', { firstCharacter: true }); // j t t q z h
// 获取中文首字母时，保留未翻译的非中文字符
pinyin('1今2天3天4气5真6好aaa', { keepRest: true, firstCharacter: true }); // 1 j 2 t 3 t 4 q 5 z 6 h aaa
// 获取中文首字母时，不保留未翻译的非中文字符
pinyin('1今2天3天4气5真6好aaa', { firstCharacter: true }); // j t t q z h
```