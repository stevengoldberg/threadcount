// @flow
import React, { Component } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import Thread from '../containers/Thread';
import styles from './ThreadList.css';

type Props = {
  threadsByEmail: Object,
  selectedEmail: string
};

export default class ThreadList extends Component<Props> {
  props: Props;

  render() {
    const { threadsByEmail, selectedEmail } = this.props;
    const threadsForUser = threadsByEmail[selectedEmail];

    const rowRenderer = ({ key, index, style }) => (
      <Thread
        thread={threadsForUser[index]}
        style={style}
        key={key}
        index={index}
      />
    );
    return selectedEmail ? (
      <div className={styles.container}>
        <div>{selectedEmail}</div>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              rowRenderer={rowRenderer}
              rowCount={threadsForUser.length}
              noRowsRenderer={() => (
                <div>No threads found for selected parameters</div>
              )}
              rowHeight={30}
            />
          )}
        </AutoSizer>
      </div>
    ) : (
      <div className={styles.container}>No contact selected</div>
    );
  }
}
