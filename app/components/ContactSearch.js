// @flow
import React, { Component } from 'react';

type Props = {
  searchContacts: () => void
};

export default class ContactSearch extends Component<Props> {
  props: Props;

  render() {
    const { searchContacts } = this.props;
    return (
      <div>
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
      </div>
    );
  }
}
