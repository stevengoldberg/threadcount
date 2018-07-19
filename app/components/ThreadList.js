// @flow
import React, { Component } from 'react';
import Thread from '../containers/Thread';

type Props = {
  threadsByEmail: Object,
  selectedEmail: string
};

export default class ThreadList extends Component<Props> {
  props: Props;

  render() {
    const { threadsByEmail, selectedEmail } = this.props;
    const threadsForUser = threadsByEmail[selectedEmail];
    return selectedEmail ? (
      <div>
        <div>{selectedEmail}</div>
        <table>
          <tbody>
            {threadsForUser.map(thread => (
              <Thread thread={thread} key={thread.id} />
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div>No contact selected</div>
    );
  }
}
