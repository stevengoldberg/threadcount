// @flow
import React, { Component } from 'react';
import Contact from './Contact';
import styles from './Contacts.css';

type Props = {
  getContacts: () => void,
  contactList: Array<Object>,
  nextUrl: string,
  accessToken?: string
};

export default class Contacts extends Component<Props> {
  props: Props;

  static defaultProps = {
    accessToken: ''
  };

  render() {
    const { getContacts, contactList, nextUrl, accessToken } = this.props;
    return (
      <div className={styles.container}>
        {contactList.map(contact => (
          <Contact {...contact} key={contact.id.$t} accessToken={accessToken} />
        ))}
        <button onClick={() => getContacts()}>Get contacts</button>
        <button onClick={() => getContacts(nextUrl)}>Get next contacts</button>
      </div>
    );
  }
}
