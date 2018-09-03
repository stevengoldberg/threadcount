// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import first from 'lodash/first';
import last from 'lodash/last';
import styles from './UserCard.css';

type Props = {
  fullName?: string,
  email: string,
  imageSrc?: string,
  showName?: boolean,
  index?: number
};

const getFirstInitial = word => first(word.split('')).toUpperCase();
const getInitials = fullName =>
  getFirstInitial(first(fullName.split(' '))) +
  getFirstInitial(last(fullName.split(' ')));

export default class UserCard extends Component<Props> {
  props: Props;

  static defaultProps = {
    fullName: '',
    imageSrc: '',
    showName: true,
    index: null
  };

  render() {
    const { email, fullName, imageSrc, showName, index } = this.props;

    let userDisplay;
    if (imageSrc) {
      userDisplay = <img src={imageSrc} alt={email} className={styles.image} />;
    } else if (fullName) {
      userDisplay = (
        <div className={styles.initials}>{getInitials(fullName)}</div>
      );
    } else {
      userDisplay = (
        <FontAwesomeIcon
          icon={faUserCircle}
          className={styles.initials}
          size="4x"
        />
      );
    }
    return (
      <div
        className={classNames(styles.root, {
          [styles.even]: index !== null && index % 2 === 0,
          [styles.odd]: index !== null && index % 2 !== 0
        })}
      >
        {userDisplay}
        {showName && <div className={styles.email}>{fullName || email}</div>}
      </div>
    );
  }
}
