// @flow
import React, { Component } from 'react';
import styles from './welcome.css';

type Props = {
  user: {
    email: string,
    name: string,
    picture?: string
  }
};

export default class Welcome extends Component<Props> {
  props: Props;

  render() {
    const {
      user: { email, name }
    } = this.props;
    return <div className={styles.container}>{name || email}</div>;
  }
}
