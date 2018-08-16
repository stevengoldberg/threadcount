// @flow
import React, { Component } from 'react';
import type Moment from 'moment';
import styles from './Counts.css';

type Props = {
  counts: {
    totalMessages: number,
    myMessages: number,
    theirMessages: number,
    myWords: number,
    theirWords: number,
    totalWords: number
  },
  selectedEmail: string,
  startDate: Moment,
  endDate: Moment,
  areMessagesLoaded: boolean
};

export default class Counts extends Component<Props> {
  render() {
    const {
      counts: {
        totalMessages,
        myMessages,
        theirMessages,
        myWords,
        theirWords,
        totalWords
      },
      startDate,
      endDate,
      selectedEmail,
      areMessagesLoaded
    } = this.props;
    const formatString = 'dddd, MMM Do, YYYY';
    const getPercentageString = (messages, total) =>
      `${((messages / total) * 100).toFixed(2)}%`;
    return (
      <div className={styles.root}>
        {areMessagesLoaded ? (
          <div>
            <div className={styles.section}>
              Between{' '}
              <span className={styles.data}>
                {startDate.format(formatString)}
              </span>, and&nbsp;
              <span className={styles.data}>
                {endDate.format(formatString)}
              </span>, you and&nbsp;
              <span className={styles.data}>{selectedEmail}</span>{' '}
              exchanged&nbsp;
              <span className={styles.data}>
                {totalMessages.toLocaleString()}
              </span>{' '}
              messages!
            </div>
            <div className={styles.section}>
              You sent{' '}
              <span className={styles.data}>
                {myMessages.toLocaleString()} ({getPercentageString(
                  myMessages,
                  totalMessages
                )})
              </span>messages;{' '}
              <span className={styles.data}>{selectedEmail}</span> sent&nbsp;
              <span className={styles.data}>
                {theirMessages.toLocaleString()} ({getPercentageString(
                  theirMessages,
                  totalMessages
                )})
              </span>!
            </div>
            <div className={styles.section}>
              Your exchanges consisted of{' '}
              <span className={styles.data}>{totalWords.toLocaleString()}</span>{' '}
              total words! You sent&nbsp;
              <span className={styles.data}>
                {myWords.toLocaleString()} ({getPercentageString(
                  myWords,
                  totalWords
                )})
              </span>{' '}
              words;&nbsp;
              <span className={styles.data}>{selectedEmail}</span> sent&nbsp;
              <span className={styles.data}>
                {theirWords.toLocaleString()} ({getPercentageString(
                  theirWords,
                  totalWords
                )})
              </span>!
            </div>
          </div>
        ) : (
          <div>No data to display</div>
        )}
      </div>
    );
  }
}
