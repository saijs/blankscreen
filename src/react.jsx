import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BlankScreenBase from './base.js';

class BlankScreen extends Component {
  componentDidMount() {
    const props = this.props;
    const element = this.refs.blankscreenroot;
    this.tracker = new BlankScreenBase(element, {
      rule: {
        element: props['rule-element'] || 0,
        text: props['rule-text'] || 0,
      },
      onError: props.onError,
      onSuccess: props.onSuccess,
    });

    if (props.autoStart) {
      this.tracker.start();
    }
  }

  start() {
    const element = ReactDOM.findDOMNode(this.refs.blankscreenroot);
    this.tracker._element = element;
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
