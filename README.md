# README

白屏监控组件，支持多实例，默认支持全屏白屏监控，和 React 组件白屏监控。

## USAGE

全局白屏监控：

```js
import BlankScreen from 'blankscreen';

BlankScreen.onError = function(err) {
  console.log('full-page blank screen', err);
}
BlankScreen.onError = function(err) {
  console.log('full-page blank screen', err);
}
```

React 组件白屏监控：

```
import ReactBlankScreen from 'blankscreen/react';

render() {
  return (
    <ReactBlankScreen
      rule-element={3}
      rule-text={10}
      onError={this.onError}
      onSuccess={this.onSuccess}
    >
      <div></div>
    </ReactBlankScreen>
  );
}
```

基础用法：

```js
import BaseBlankScreen from 'blankscreen/base';

const bs = new BaseBlankScreen(element, {
  rule: {
    text: 0,
    element: 0,
  },
  onError: err => console.error(err),
  onSuccess: meta => console.log(meta),
})
bs.start();
```

## 白屏判定规则


文字\元素 | 有 | 无
----------|----|----
       有 | 黑 | 黑
       无 | 白 | 白

原则上，只通过是否有指定个数的『文字』来判定是否白屏，
子元素个数多少不作为判定条件，只作为附加信息。

注：

- 黑：判定为不是白屏。
- 白：判定为白屏。

## API

### BlankScreen

- {HTMLElement} element 监控的元素，如果是 React 元素，则是其子节点。
- {Number} rule-element 白屏规则：HTML 元素最少个数，默认 0 个，子元素的个数少于或等于这个值，则认为是白屏。
- {Number} rule-text: 白屏规则：有效文本（提出无效空白符）最少个数，默认 0 个。子节点有效文本少于或等于这个值，则认为是白屏。
- {Function} onError: 最终判定为白屏时，会触发 onError
- {Function} onSuccess: 页面开始正常渲染时，会触发 onSuccess


/* PANGU_DISABLE */
