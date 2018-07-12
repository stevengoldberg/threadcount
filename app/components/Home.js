// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import Welcome from './Welcome';
import SignIn from './SignIn';

type Props = {
  user: {
    email?: string,
    displayName?: string
  },
  googleSignIn: () => void,
  signOut: () => void
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const { user, googleSignIn, signOut } = this.props;
    const { displayName } = user;
    const loggedIn = !!displayName;
    return (
      <div>
        <h2>Welcome to Words with Friends!</h2>
        <div className={styles.container}>
          {loggedIn ? (
            <Welcome user={user} signOut={signOut} />
          ) : (
            <SignIn signIn={googleSignIn} />
          )}
        </div>
      </div>
    );
  }
}
