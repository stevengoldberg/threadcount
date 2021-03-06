// @flow
import React, { Component } from 'react';
import { InfiniteLoader, AutoSizer, List } from 'react-virtualized';
import Contact from './Contact';
import styles from './ContactList.css';
import Tooltip from './Tooltip';

type Props = {
  getContacts: () => void,
  searchContacts: () => void,
  contactList?: Array<Object>,
  nextUrl: string,
  accessToken?: string,
  selectedEmail: string
};

export default class ContactList extends Component<Props> {
  props: Props;

  static defaultProps = {
    accessToken: '',
    contactList: []
  };

  render() {
    const {
      getContacts,
      contactList,
      selectedEmail,
      nextUrl,
      ...contactProps
    } = this.props;

    function rowRenderer({ key, index, style }) {
      return (
        <div key={key} style={style}>
          <Contact {...contactList[index]} {...contactProps} index={index} />
        </div>
      );
    }

    function isRowLoaded({ index }) {
      return !!contactList[index];
    }

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <Tooltip text="Select a contact from this list to search for threads" />
          <div className={styles.selection}>
            {selectedEmail || 'Select a contact'}
          </div>
        </div>
        <InfiniteLoader
          loadMoreRows={() => {
            if (nextUrl) {
              getContacts(nextUrl);
            }
          }}
          rowCount={9999}
          isRowLoaded={isRowLoaded}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  height={height}
                  width={width}
                  rowRenderer={rowRenderer}
                  rowCount={contactList.length}
                  noRowsRenderer={() => (
                    <div className={styles.notFound}>
                      No contacts found for the current query
                    </div>
                  )}
                  rowHeight={96}
                  onRowsRendered={onRowsRendered}
                  ref={registerChild}
                  className={styles.listContainer}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    );
  }
}
