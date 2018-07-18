// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import Welcome from './Welcome';
import SignIn from './SignIn';
import Query from '../containers/Query';
import ThreadList from '../containers/ThreadList';
import Contacts from '../containers/Contacts';

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
      <div className={styles.container}>
        <div className={styles.left}>
          {loggedIn ? (
            <div className={styles.leftContainer}>
              <Welcome user={user} signOut={signOut} />
              <Contacts />
            </div>
          ) : (
            <SignIn signIn={googleSignIn} />
          )}
        </div>
        <div className={styles.right}>
          {loggedIn && (
            <div>
              <Query />
              <ThreadList />
            </div>
          )}
        </div>
      </div>
    );
  }
}
