# Chinese-to-Pinyin [![npm package](https://img.shields.io/npm/v/chinese-to-pinyin.svg?style=flat-square)](https://www.npmjs.org/package/chinese-to-pinyin) [![NPM downloads](https://img.shields.io/npm/dm/chinese-to-pinyin.svg?style=flat-square)](https://npmjs.org/package/chinese-to-pinyin) [![Dependency Status](https://david-dm.org/zhujun24/chinese-to-pinyin.svg?style=flat-square)](https://david-dm.org/zhujun24/chinese-to-pinyin)

一个将中文翻译成拼音的库,支持多音字

## 安装
```bash
npm install chinese-to-pinyin
```

## 提示
clone 至本地调试代码的时候建议开启 grunt 以便监听改动实时编译
```bash
grunt
```

## 示例
```js
var pinyin = require("chinese-to-pinyin");
pinyin('今天天气真好'); // jīn tiān tiān qì zhēn hǎo
```

## 支持多音字
```js
var pinyin = require("chinese-to-pinyin");
pinyin('蚌埠六安哪吒都灵'); // bèng bù lù ān né zhā dū líng
```

## 略去声调
```js
var pinyin = require("chinese-to-pinyin");
pinyin('今天天气真好', {noTone: true}); // jin tian tian qi zhen hao
```

## 声调转数字
```js
var pinyin = require("chinese-to-pinyin");
pinyin('今天天气真好', {numberTone: true}); // jin1 tian1 tian1 qi4 zhen1 hao3
```

## 不忽略非中文字符
```js
var pinyin = require("chinese-to-pinyin");
pinyin('1今a天bb天ccc气dd dd真e好fff', {filterChinese: true}); // 1 jīn a tiān bb tiān ccc qì dd dd zhēn e hǎo fff
```
