// @flow
import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import uuidv1 from 'uuid/v1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './Tooltip.css';

type Props = {
  text: string
};

export default class Tooltip extends Component<Props> {
  constructor(props) {
    super(props);
    this.id = uuidv1().toString();
  }
  render() {
    const { text } = this.props;
    return (
      <div className={styles.root}>
        <a data-tip data-for={this.id} className="classes">
          <FontAwesomeIcon icon={faQuestionCircle} />
        </a>
        <ReactTooltip id={this.id} type="info" effect="solid" place="bottom">
          <span>{text}</span>
        </ReactTooltip>
      </div>
    );
  }
}
