// @flow
import React, { Component } from 'react';

type Props = {
  messages: Object
};

export default class ThreadList extends Component<Props> {
  props: Props;

  render() {
    const { messages } = this.props;
    return <table>{messages.map(message => <tr>{message.snippet}</tr>)}</table>;
  }
}
