// @flow
import React, { Component } from 'react';
import Button from './Button';
import styles from './SignIn.css';

type Props = {
  signIn: () => void
};

export default class SignIn extends Component<Props> {
  props: Props;

  render() {
    const { signIn } = this.props;
    return (
      <div className={styles.container}>
        You are not signed in
        <div className={styles.button}>
          <Button onClick={signIn}>Sign In</Button>
        </div>
      </div>
    );
  }
}
