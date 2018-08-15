// @flow
import React, { Component } from 'react';
import get from 'lodash/get';
import find from 'lodash/find';
import UserCard from './UserCard';
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
  gd$email: [Email],
  link: Array<Link>,
  accessToken: string,
  gd$name?: {
    gd$fullName: {
      $t: string
    }
  }
};

type Props = {
  ...ContactType,
  updateSelectedEmail: () => void
};

export default class Contact extends Component<Props> {
  props: Props;

  render() {
    const {
      gd$email,
      link: links,
      accessToken,
      updateSelectedEmail
    } = this.props;

    const fullName = get(this.props, 'gd$name.gd$fullName.$t');
    const email = get(gd$email, '[0].address');
    const baseImageSrc = get(find(links, link => link.gd$etag), 'href');

    const userDisplay = (
      <UserCard
        imageSrc={baseImageSrc && `${baseImageSrc}&access_token=${accessToken}`}
        fullName={fullName}
        email={email}
      />
    );

    return (
      <div
        onClick={() => updateSelectedEmail(email)}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            updateSelectedEmail(email);
            e.preventDefault();
          }
        }}
        role="button"
        tabIndex={0}
        className={styles.root}
      >
        {userDisplay}
      </div>
    );
  }
}
