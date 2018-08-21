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
import WordCloud from '../containers/WordCloud';

type Props = {
  user: {
    email?: string,
    name?: string
  },
  googleSignIn: () => void,
  signOut: () => void,
  initApp: () => void,
  selectedAnalytic: 'wordCloud' | 'wordCount'
};

export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    const { initApp } = props;
    initApp();
  }

  render() {
    const { user, googleSignIn, signOut, selectedAnalytic } = this.props;
    const { name } = user;
    const loggedIn = !!name;
    let analytic;
    if (selectedAnalytic === 'wordCount') {
      analytic = <Counts />;
    } else if (selectedAnalytic === 'wordCloud') {
      analytic = <WordCloud />;
    }
    return (
      <div className={styles.container}>
        {loggedIn ? (
          <div className={styles.top}>
            <Welcome user={user} signOut={signOut} />
            <Query />
            <ActionButtons />
          </div>
        ) : (
          <SignIn signIn={googleSignIn} />
        )}
        <div className={styles.bottom}>
          {loggedIn && (
            <div className={styles.left}>
              <ContactList />
            </div>
          )}
          {loggedIn && (
            <div className={styles.right}>
              <ThreadList />
              {analytic}
            </div>
          )}
        </div>
      </div>
    );
  }
}
