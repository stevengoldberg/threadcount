// @flow
import React, { Component } from 'react';
import moment from 'moment';
import styles from './styles.css';

const dateFormatString = 'dddd, MMM Do, YYYY';
const timeFormatString = 'h:mm a';

type Props = {
  selectedEmail: string,
  startDate: Moment,
  endDate: Moment,
  totalMessages: number,
  lastDate: string,
  firstDate: string,
  totalWords: number
};

export default class DateTime extends Component<Props> {
  render() {
    const {
      startDate,
      endDate,
      selectedEmail,
      firstDate,
      lastDate,
      totalMessages,
      totalWords
    } = this.props;
    const firstMoment = moment(parseInt(firstDate, 10));
    const lastMoment = moment(parseInt(lastDate, 10));
    let range;

    if (!lastDate || lastMoment.diff(firstMoment, 'hours') > 24) {
      range = (
        <span>
          <span className={styles.data}>
            {startDate.format(dateFormatString)},
          </span>{' '}
          and{' '}
          <span className={styles.data}>
            {endDate.format(dateFormatString)}
          </span>
          ,{' '}
        </span>
      );
    } else {
      range = (
        <span>
          <span className={styles.data}>
            {firstMoment.format(timeFormatString)}
          </span>{' '}
          and{' '}
          <span className={styles.data}>
            {lastMoment.format(timeFormatString)}
          </span>{' '}
          on {startDate.format(dateFormatString)},{' '}
        </span>
      );
    }

    return (
      <div className={styles.section}>
        Between {range}
        you and <span className={styles.data}>
          {selectedEmail}
        </span> exchanged{' '}
        <span className={styles.data}>{totalMessages.toLocaleString()}</span>{' '}
        messages totaling{' '}
        <span className={styles.data}>{totalWords.toLocaleString()}</span>{' '}
        words!
      </div>
    );
  }
}
