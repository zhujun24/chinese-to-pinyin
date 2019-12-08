# Chinese-to-Pinyin - 一个将中文翻译成拼音的库,支持多音字

[![npm package](https://nodei.co/npm/chinese-to-pinyin.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/chinese-to-pinyin/)

[![Build Status](https://travis-ci.org/zhujun24/chinese-to-pinyin.svg)](https://travis-ci.org/zhujun24/chinese-to-pinyin)
[![Coverage Status](https://coveralls.io/repos/github/zhujun24/chinese-to-pinyin/badge.svg)](https://coveralls.io/github/zhujun24/chinese-to-pinyin)
[![Known Vulnerabilities](https://snyk.io//test/github/zhujun24/chinese-to-pinyin/badge.svg?targetFile=package.json)](https://snyk.io//test/github/zhujun24/chinese-to-pinyin?targetFile=package.json)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fzhujun24%2Fchinese-to-pinyin.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fzhujun24%2Fchinese-to-pinyin?ref=badge_shield)
[![npm package](https://img.shields.io/npm/v/chinese-to-pinyin.svg)](https://www.npmjs.com/package/chinese-to-pinyin)

[![NPM downloads](https://img.shields.io/npm/dm/chinese-to-pinyin.svg)](https://www.npmjs.com/package/chinese-to-pinyin)
[![Dependency Status](https://david-dm.org/zhujun24/chinese-to-pinyin.svg)](https://www.npmjs.com/package/chinese-to-pinyin)
[![Dependency Status](https://david-dm.org/zhujun24/chinese-to-pinyin/dev-status.svg)](https://www.npmjs.com/package/chinese-to-pinyin)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://www.npmjs.com/package/chinese-to-pinyin)

## 安装
```bash
npm install chinese-to-pinyin --save
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
var pinyin = require("chinese-to-pinyin")
pinyin('中文语句')
```

## 示例
```js
pinyin('今天天气真好') // jīn tiān tiān qì zhēn hǎo
```

## 支持多音字
```js
pinyin('蚌埠六安哪吒都灵') // bèng bù lù ān né zhā dū líng
```

## 略去声调
```js
pinyin('今天天气真好', {removeTone: true}) // jin tian tian qi zhen hao
```

## 声调转数字
```js
pinyin('今天天气真好', {toneToNumber: true}) // jin1 tian1 tian1 qi4 zhen1 hao3
```

## 声调转数字,只输出音调
```js
pinyin('今天天气真好', {toneToNumberOnly: true}) // 1 1 1 4 1 3
```

## 移除拼音间的空格
```js
pinyin('今天天气真好', {removeSpace: true}) // jīntiāntiānqìzhēnhǎo
```

## 保留未翻译的非中文字符
```js
pinyin('1今天天气dd dd真e好fff', { keepRest: true }) // 1jīn tiān tiān qìdd ddzhēnehǎofff
```

## 获取中文首字母
```js
pinyin('今天天气真好', { firstCharacter: true }) // j t t q z h
// 获取中文首字母时，保留未翻译的非中文字符
pinyin('1今2天3天4气5真6好aaa', { keepRest: true, firstCharacter: true }) // 1j2t3t4q5z6haaa
// 获取中文首字母时，不保留未翻译的非中文字符
pinyin('1今2天3天4气5真6好aaa', { firstCharacter: true }) // j t t q z h
```
