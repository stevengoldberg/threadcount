// @flow
import React, { Component } from 'react';
import { InfiniteLoader, AutoSizer, List } from 'react-virtualized';
import Contact from './Contact';
import styles from './Contacts.css';

type Props = {
  getContacts: () => void,
  searchContacts: () => void,
  contactList?: Array<Object>,
  nextUrl: string,
  accessToken?: string
};

export default class ContactList extends Component<Props> {
  props: Props;

  static defaultProps = {
    accessToken: '',
    contactList: []
  };

  render() {
    const { getContacts, contactList, nextUrl, ...contactProps } = this.props;

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
                    <div>No contacts found for the current query</div>
                  )}
                  rowHeight={96}
                  onRowsRendered={onRowsRendered}
                  ref={registerChild}
                />
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    );
  }
}
