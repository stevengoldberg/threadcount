// @flow
import React, { Component } from 'react';
import styles from './Home.css';
import Welcome from './Welcome';
import SignIn from './SignIn';
import ContactSearch from '../containers/ContactSearch';
import ThreadList from '../containers/ThreadList';
import ContactList from '../containers/ContactList';
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
      <div className={styles.container}>
        <div>
          {loggedIn ? (
            <div className={styles.top}>
              <Welcome user={user} signOut={signOut} />
              <Query />
            </div>
          ) : (
            <SignIn signIn={googleSignIn} />
          )}
        </div>
        <div className={styles.bottom}>
          {loggedIn && (
            <div className={styles.left}>
              <ContactSearch />
              <ContactList />
            </div>
          )}
          <div className={styles.right}>{loggedIn && <ThreadList />}</div>
        </div>
      </div>
    );
  }
}
