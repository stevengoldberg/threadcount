// @flow
import React, { Component } from 'react';
import styles from './welcome.css';
import UserCard from './UserCard';

type Props = {
  user: {
    email: string,
    name: string,
    picture?: string
  }
};

export default class Welcome extends Component<Props> {
  props: Props;

  render() {
    const {
      user: { email, name, picture }
    } = this.props;
    return (
      <div className={styles.container}>
        <UserCard
          imageSrc={picture}
          showName={false}
          fullName={name}
          email={email}
        />
      </div>
    );
  }
}
