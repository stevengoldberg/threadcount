// @flow
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import styles from './ContactSearch.css';

type Props = {
  searchContacts: () => void
};

export default class ContactSearch extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
  }

  render() {
    const { searchContacts } = this.props;
    const { search } = this.state;
    const debouncedSearch = debounce(() => searchContacts(search, 500));

    return (
      <div className={styles.container}>
        <input
          id="contactSearch"
          ref={node => {
            this.contactSearch = node;
          }}
          placeholder="Search for a contact"
          className={styles.input}
          onKeyUp={() => {
            this.setState(
              {
                search: this.contactSearch.value
              },
              debouncedSearch
            );
          }}
        />
      </div>
    );
  }
}
