// @flow

import React, { Component } from 'react';
import styles from './Button.css';

type Props = {
  onClick?: () => void,
  children: React.node
};

export default class Button extends Component<Props> {
  props: Props;

  static defaultProps = {
    onClick: () => undefined
  };
  render() {
    const { onClick, children } = this.props;
    return (
      <button onClick={onClick} className={styles.root}>
        {children}
      </button>
    );
  }
}
