// @flow
import React, { Component } from 'react';
import styles from './welcome.css';
import UserCard from './UserCard';

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
        <div>
          <div>
            Welcome! <button onClick={signOut}>Sign Out</button>
          </div>
          <UserCard imageSrc={picture} fullName={name} email={email} />
        </div>
      </div>
    );
  }
}
