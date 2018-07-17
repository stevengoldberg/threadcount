// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import Welcome from './Welcome';
import SignIn from './SignIn';
import Query from '../containers/Query';

type Props = {
  user: {
    email?: string,
    name?: string
  },
  googleSignIn: () => void,
  signOut: () => void,
  initApp: () => void
};

export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    const { initApp } = props;
    initApp();
  }

  render() {
    const { user, googleSignIn, signOut } = this.props;
    const { name } = user;
    const loggedIn = !!name;
    return (
      <div>
        <h2>Welcome to Words with Friends!</h2>
        <div className={styles.container}>
          {loggedIn ? (
            <div>
              <Welcome user={user} signOut={signOut} />
              <Query />
            </div>
          ) : (
            <SignIn signIn={googleSignIn} />
          )}
        </div>
      </div>
    );
  }
}
