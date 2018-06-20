/* eslint no-console:0 */
import './index.less';
import React from 'react';
import ReactDOM from 'react-dom';
import BlankScreen from '../src/index.js';
import ReactBlankScreen from '../src/react.jsx';

BlankScreen.onError = function(err) {
  console.error('full-page blank screen:', err);
};
BlankScreen.onSuccess = function(meta) {
  console.log('full-page OK:', meta);
};


class Component extends React.Component {
  state = {
  };

  componentDidMount() {
    setTimeout(() => {
      this.refs.bs_m_et.start();
      this.refs.bs_m_e.start();
      this.refs.bs_m_t.start();
      this.refs.bs_m_none.start();
    }, 2000);
  }

  onError = (index, err) => {
    console.log('react-component blank-screen:', index, err);
  }
  onSuccess = (index, meta) => {
    console.log('react-component OK:', index, meta);
  }

  render() {
    return (
      <div>
        <p>下面自动开始检查，有元素和文字，不白屏</p>
        <ReactBlankScreen
          rule-text={0}
          rule-element={0}
          onError={this.onError.bind(this, 'auto: element & text')}
          onSuccess={this.onSuccess.bind(this, 'auto: element & text')}
          autoStart
        >
          <div>这是文字</div>
        </ReactBlankScreen>

        <p>下面自动开始检查，有文字，无元素，不白屏</p>
        <ReactBlankScreen
          rule-text={0}
          rule-element={0}
          onError={this.onError.bind(this, 'auto: text')}
          onSuccess={this.onSuccess.bind(this, 'auto: text')}
          autoStart
        >
          这是文字
        </ReactBlankScreen>

        <p>下面自动开始检查，有元素，无文字，白屏</p>
        <ReactBlankScreen
          rule-text={0}
          rule-element={0}
          onError={this.onError.bind(this, 'auto: element')}
          onSuccess={this.onSuccess.bind(this, 'auto: element')}
          autoStart
        >
          <div></div>
        </ReactBlankScreen>

        <p>下面自动开始检查，无元素和文字，白屏</p>
        <ReactBlankScreen
          rule-text={0}
          rule-element={0}
          onError={this.onError.bind(this, 'auto: none')}
          onSuccess={this.onSuccess.bind(this, 'auto: none')}
          autoStart
        >
        </ReactBlankScreen>



        <p>下面异步开始检查，有元素和文字，不白屏</p>
        <ReactBlankScreen
          ref="bs_m_et"
          rule-text={0}
          rule-element={0}
          onError={this.onError.bind(this, 'sync: element & text')}
          onSuccess={this.onSuccess.bind(this, 'sync: element & text')}
        >
          <div>这里是文字</div>
        </ReactBlankScreen>

        <p>下面异步开始检查，有文字，无元素，不白屏</p>
        <ReactBlankScreen
          ref="bs_m_t"
          rule-text={0}
          rule-element={0}
          onError={this.onError.bind(this, 'sync: text')}
          onSuccess={this.onSuccess.bind(this, 'sync: text')}
        >
          这里是文字
        </ReactBlankScreen>

        <p>下面异步开始检查，有元素，无文字，白屏</p>
        <ReactBlankScreen
          ref="bs_m_e"
          rule-text={0}
          rule-element={0}
          onError={this.onError.bind(this, 'sync: element')}
          onSuccess={this.onSuccess.bind(this, 'sync: element')}
        >
          <div></div>
        </ReactBlankScreen>

        <p>下面异步开始检查，无元素和文字，白屏</p>
        <ReactBlankScreen
          ref="bs_m_none"
          rule-text={0}
          rule-element={0}
          onError={this.onError.bind(this, 'sync: none')}
          onSuccess={this.onSuccess.bind(this, 'sync: none')}
        >
        </ReactBlankScreen>
      </div>
    );
  }
}

ReactDOM.render(<Component />, document.getElementById('__react-content'));
