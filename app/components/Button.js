// @flow

import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './Button.css';

type Props = {
  onClick?: () => void,
  children: React.node,
  type?: 'normal' | 'cancel'
};

export default class Button extends Component<Props> {
  props: Props;

  static defaultProps = {
    onClick: () => undefined,
    type: 'normal'
  };

  render() {
    const { onClick, children, type } = this.props;
    return (
      <button
        type="button"
        onClick={onClick}
        className={classNames(styles.root, {
          [styles.normal]: type === 'normal',
          [styles.cancel]: type === 'cancel'
        })}
      >
        {children}
      </button>
    );
  }
}
