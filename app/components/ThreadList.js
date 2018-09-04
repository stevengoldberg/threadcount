// @flow
import React, { Component } from 'react';
import { AutoSizer, List } from 'react-virtualized';
import Thread from '../components/Thread';
import styles from './ThreadList.css';

type Props = {
  threadsByEmail: Object,
  selectedEmail: string,
  loadingThreads: boolean
};

export default class ThreadList extends Component<Props> {
  props: Props;

  render() {
    const { threadsByEmail, selectedEmail, loadingThreads } = this.props;
    const threadsForUser = threadsByEmail[selectedEmail];

    let display;
    if (loadingThreads) {
      display = <div className={styles.message}>Loading...</div>;
    } else if (threadsForUser) {
      display = (
        <AutoSizer>
          {({ height, width }) => (
            <div style={{ width: `${width}px` }}>
              <div className={styles.header}>
                <div className={styles.dateHeader}>Date</div>
                <div className={styles.snippetHeader}>Snippet</div>
                <div className={styles.countHeader}>Messages</div>
              </div>
              <List
                height={height - 25}
                width={width}
                rowRenderer={rowRenderer}
                rowCount={threadsForUser.length}
                noRowsRenderer={() => (
                  <div className={styles.message}>
                    No threads found for selected parameters
                  </div>
                )}
                rowHeight={30}
              />
            </div>
          )}
        </AutoSizer>
      );
    } else {
      display = (
        <div className={styles.message}>Use the controls to search</div>
      );
    }

    const rowRenderer = ({ key, index, style }) => (
      <Thread
        {...threadsForUser[index]}
        style={style}
        key={key}
        index={index}
      />
    );
    return <div className={styles.container}>{display}</div>;
  }
}
