var expect = require('chai').expect;
var convert = require('../dist/src');

describe('中文转拼音测试', function () {
  it('默认翻译', function () {
    expect(convert('今天天气真好')).to.equal('jīn tiān tiān qì zhēn hǎo');
  });
  it('略去声调', function () {
    expect(convert('今天天气真好', {noTone: true})).to.equal('jin tian tian qi zhen hao');
  });
  it('声调转数字', function () {
    expect(convert('今天的天气真好', {numberTone: true})).to.equal('jin1 tian1 de1 tian1 qi4 zhen1 hao3');
  });
  it('声调转数字,只输出音调', function () {
    expect(convert('今天天气真好', {numberToneOnly: true})).to.equal('1 1 1 4 1 3');
  });
  it('不忽略非中文字符', function () {
    expect(convert('1今a天bb天ccc气dd dd真e好fff', {filterChinese: true})).to.equal('1 jīn a tiān bb tiān ccc qì dd dd zhēn e hǎo fff');
  });
});
