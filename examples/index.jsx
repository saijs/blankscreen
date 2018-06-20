/* eslint no-console:0 */
import './index.less';
import BlankScreen from '../src/index';
import React from 'react';
import ReactDOM from 'react-dom';

BlankScreen.global.onError = function(err) {
  console.error('full-page blank screen:', err);
};
BlankScreen.global.onSuccess = function(meta) {
  console.log('full-page OK:', meta);
};


class Component extends React.Component {
  state = {
    disabled: false,
    readOnly: false,
    value: 5,
    defaultTab: 1,
    actualClientHeight: 0,
  };

  onChange = (value) => {
    console.log('onChange:', value);
    this.setState({ value });
  }
  toggleDisabled = () => {
    this.setState({
      disabled: !this.state.disabled,
    });
  }
  toggleReadOnly = () => {
    this.setState({
      readOnly: !this.state.readOnly,
    });
  }
  render() {
    const { state } = this;
    return (
      <div>APP</div>
    );
  }
}

ReactDOM.render(<Component />, document.getElementById('__react-content'));
