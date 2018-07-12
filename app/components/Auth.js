// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

type Props = {
  googleSignIn: () => void
};

export default class Auth extends Component<Props> {
  props: Props;

  render() {
    const { googleSignIn } = this.props;
    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        Sign in
        <button onClick={googleSignIn}>Click here</button>
      </div>
    );
  }
}
