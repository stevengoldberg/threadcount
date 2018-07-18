// @flow
import React, { Component } from 'react';
import Thread from './Thread';

type Props = {
  threadsByEmail: Object
};

export default class ThreadList extends Component<Props> {
  props: Props;

  render() {
    const { threadsByEmail } = this.props;
    const emails = Object.keys(threadsByEmail);
    return (
      <div>
        {emails.map(email => (
          <table>
            <tr>
              <th>{email}</th>
            </tr>
            <Thread messages={threadsByEmail[email]} />
          </table>
        ))}
      </div>
    );
  }
}
