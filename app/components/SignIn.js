// @flow
import electron from 'electron';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments } from '@fortawesome/free-solid-svg-icons';
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
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.title}>Welcome to ThreadCount</div>
          <FontAwesomeIcon icon={faComments} size="5x" />
        </div>
        <a
          href="https://github.com/stevengoldberg/threadcount"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          github.com/stevengoldberg
        </a>
        <div className={styles.version}>
          Version {electron.remote.app.getVersion()}{' '}
        </div>
        <div className={styles.button}>
          <Button onClick={signIn}>Sign in with Google</Button>
        </div>
      </div>
    );
  }
}
