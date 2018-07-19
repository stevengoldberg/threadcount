// @flow
import React, { Component } from 'react';

type Props = {
  thread: Object
};

export default class Thread extends Component<Props> {
  props: Props;

  render() {
    const { thread } = this.props;
    return (
      <tr>
        <td>{thread.snippet}</td>
      </tr>
    );
  }
}
