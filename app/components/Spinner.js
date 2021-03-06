// @flow
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

type Props = {
  size: 'xs' | 'sm' | 'lg' | '2x' | '3x' | '5x' | '7x' | '10x'
};

export default class Spinner extends Component<Props> {
  render() {
    const { size } = this.props;
    return <FontAwesomeIcon icon={faCircleNotch} size={size} spin />;
  }
}
