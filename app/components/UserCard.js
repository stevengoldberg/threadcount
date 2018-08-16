// @flow
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import first from 'lodash/first';
import last from 'lodash/last';
import styles from './UserCard.css';

type Props = {
  fullName?: string,
  email: string,
  imageSrc?: string
};

const getFirstInitial = word => first(word.split('')).toUpperCase();
const getInitials = fullName =>
  getFirstInitial(first(fullName.split(' '))) +
  getFirstInitial(last(fullName.split(' ')));

export default class UserCard extends Component<Props> {
  props: Props;

  static defaultProps = {
    fullName: '',
    imageSrc: ''
  };

  render() {
    const { email, fullName, imageSrc } = this.props;

    let userDisplay;
    if (imageSrc) {
      userDisplay = <img src={imageSrc} alt={email} className={styles.image} />;
    } else if (fullName) {
      userDisplay = (
        <div className={styles.initials}>{getInitials(fullName)}</div>
      );
    } else {
      userDisplay = <FontAwesomeIcon icon={faUserCircle} size="5x" />;
    }
    return (
      <div>
        {userDisplay}
        <div className={styles.email}>{fullName || email}</div>
      </div>
    );
  }
}
