// @flow
import React, { Component } from 'react';
import styles from './welcome.css';
import UserCard from './UserCard';
import Button from './Button';

type Props = {
  user: {
    email: string,
    name: string,
    picture?: string
  },
  signOut: () => void
};

export default class Welcome extends Component<Props> {
  props: Props;

  render() {
    const {
      user: { email, name, picture },
      signOut
    } = this.props;
    return (
      <div className={styles.container}>
        <UserCard imageSrc={picture} fullName={name} email={email} />
        <Button onClick={signOut}>Sign Out</Button>
      </div>
    );
  }
}
