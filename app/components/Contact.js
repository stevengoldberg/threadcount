// @flow
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import get from 'lodash/get';
import find from 'lodash/find';
import first from 'lodash/first';
import last from 'lodash/last';
import styles from './Contact.css';

type Link = {
  href: string,
  rel: string,
  type: string
};

type Email = {
  address: string,
  primary: string,
  rel: string
};

export type ContactType = {
  gd$email: Array<Email>,
  link: Array<Link>,
  accessToken: string,
  title: {
    $t: string
  }
};

const getFirstInitial = word => word.split('')[0].toUpperCase();

export default class Contact extends Component<ContactType> {
  props: Props;

  render() {
    const {
      gd$email,
      link: links,
      accessToken,
      title: { $t: fullName }
    } = this.props;
    const email = get(gd$email, '[0].address');
    let userDisplay;
    const imageSrc = get(find(links, link => link.gd$etag), 'href');

    if (imageSrc) {
      userDisplay = (
        <div className={styles.imageContainer}>
          <img
            src={`${imageSrc}&access_token=${accessToken}`}
            alt={email}
            className={styles.image}
          />
        </div>
      );
    } else if (fullName) {
      console.log(fullName);
      const initials =
        getFirstInitial(first(fullName.split(' '))) +
        getFirstInitial(last(fullName.split(' ')));
      userDisplay = <div className={styles.initials}>{initials}</div>;
    } else {
      userDisplay = (
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faUserCircle} size="5x" />
        </div>
      );
    }

    return (
      <div>
        {userDisplay}
        <div className={styles.email}>{email}</div>
      </div>
    );
  }
}
