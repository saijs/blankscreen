# README

React 白屏监控组件

## USAGE

```
import BlankScreen from 'blankscreen';

render() {
  return (
    <BlankScreen
      rule-element={3}
      rule-text={10}
      onError={this.onError}
      onSuccess={this.onSuccess}
    >
      <div></div>
    </BlankScreen>
  );
}
```

## API

### BlankScreen

- {HTMLElement} element 监控的元素，如果是 React 元素，则是其子节点。
- {Number} rule-element 白屏规则：HTML 元素最少个数，默认 0 个，子元素的个数少于或等于这个值，则认为是白屏。
- {Number} rule-text: 白屏规则：有效文本（提出无效空白符）最少个数，默认 0 个。子节点有效文本少于或等于这个值，则认为是白屏。
- {Function} onError: 最终判定为白屏时，会触发 onError
- {Function} onSuccess: 页面开始正常渲染时，会触发 onSuccess
