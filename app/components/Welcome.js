// @flow
import React, { Component } from 'react';
import styles from './welcome.css';

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
          <div>Hello, {name}</div>
          <div>{email}</div>
        </div>
        {picture && <img src={picture} alt="User" />}
        <div>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </div>
    );
  }
}
