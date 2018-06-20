import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BlankScreenBase from './base.js';

class BlankScreen extends Component {
  componentDidMount() {
    const props = this.props;
    const element = this.refs.blankscreenroot;
    this.tracker = new BlankScreenBase(element, {
      rule: {
        text: props['rule-text'] || 0,
      },
      onError: props.onError,
      onSuccess: props.onSuccess,
      autoStart: props.autoStart,
    });
  }

  start() {
    this.tracker.start();
  }

  render() {
    return (
      <div ref="blankscreenroot">
        {this.props.children}
      </div>
    );
  }
}

export default BlankScreen;
