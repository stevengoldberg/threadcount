// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import Welcome from './Welcome';
import SignIn from './SignIn';
import ThreadList from '../containers/ThreadList';
import ContactList from '../containers/ContactList';
import Query from '../containers/Query';
import ActionButtons from '../containers/ActionButtons';
import Counts from '../containers/Counts';

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
        <div>
          {loggedIn ? (
            <div className={styles.top}>
              <Welcome user={user} signOut={signOut} />
              <Query />
              <ActionButtons />
            </div>
          ) : (
            <SignIn signIn={googleSignIn} />
          )}
        </div>
        <div className={styles.bottom}>
          {loggedIn && (
            <div className={styles.left}>
              <ContactList />
            </div>
          )}
          {loggedIn && (
            <div className={styles.right}>
              <ThreadList />
              <Counts />
            </div>
          )}
        </div>
      </div>
    );
  }
}
