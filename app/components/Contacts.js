// @flow
import React, { Component } from 'react';
import Contact from './Contact';
import styles from './Contacts.css';

type Props = {
  getContacts: () => void,
  searchContacts: () => void,
  contactList?: Array<Object>,
  nextUrl: string,
  accessToken?: string
};

export default class Contacts extends Component<Props> {
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
      searchContacts
    } = this.props;
    return (
      <div className={styles.container}>
        <form>
          <label htmlFor="contactSearch">
            Search contacts
            <input
              id="contactSearch"
              ref={node => {
                this.contactSearch = node;
              }}
            />
          </label>
          <div>
            <button onClick={() => searchContacts(this.contactSearch.value)}>
              Search
            </button>
          </div>
        </form>
        {contactList.map(contact => (
          <Contact {...contact} key={contact.id.$t} accessToken={accessToken} />
        ))}
        <button onClick={() => getContacts()}>Get contacts</button>
        <button onClick={() => getContacts(nextUrl)}>Get next contacts</button>
      </div>
    );
  }
}
