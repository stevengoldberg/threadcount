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
  accessToken?: string,
  queryThreads: () => void
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
      nextUrl,
      accessToken,
      searchContacts,
      queryThreads
    } = this.props;

    function rowRenderer({ key, index, style }) {
      return (
        <div key={key} style={style}>
          <Contact
            {...contactList[index]}
            accessToken={accessToken}
            queryThreads={queryThreads}
          />
        </div>
      );
    }

    function isRowLoaded({ index }) {
      return !!contactList[index];
    }

    return (
      <div className={styles.container}>
        <form>
          <label htmlFor="contactSearch">
            <input
              id="contactSearch"
              ref={node => {
                this.contactSearch = node;
              }}
            />
          </label>
          <button onClick={() => searchContacts(this.contactSearch.value)}>
            Search
          </button>
        </form>
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
                    <div>Search for contacts to see them here</div>
                  )}
                  rowHeight={120}
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
