// @flow
import React, { Component } from 'react';
import type Moment from 'moment';
import moment from 'moment';
import get from 'lodash/get';
import { Doughnut } from 'react-chartjs-2';
import styles from './Counts.css';

type Count = {
  totalMessages: number,
  myMessages: number,
  theirMessages: number,
  myWords: number,
  theirWords: number,
  totalWords: number
};

type Props = {
  messageCountsByEmail: {
    [email: string]: Count
  },
  selectedEmail?: string,
  startDate?: Moment,
  endDate?: Moment,
  areMessagesLoading: boolean
};

export default class Counts extends Component<Props> {
  static defaultProps = {
    selectedEmail: '',
    startDate: moment(),
    endDate: moment()
  };

  render() {
    const {
      messageCountsByEmail,
      startDate,
      endDate,
      selectedEmail,
      areMessagesLoading
    } = this.props;
    const counts = get(messageCountsByEmail, `${selectedEmail}`, {
      totalMessages: 0,
      myMessages: 0,
      theirMessages: 0,
      myWords: 0,
      theirWords: 0,
      totalWords: 0
    });

    const formatString = 'dddd, MMM Do, YYYY';
    const getPercentageString = (messages, total) =>
      `${((messages / total) * 100).toFixed(2)}%`;
    const chartOptions = {
      maintainAspectRatio: false,
      legend: {
        labels: {
          fontColor: 'white'
        }
      }
    };
    const backgroundColors = [['#FF6384', '#36A2EB'], ['#FFCE56', '#17a315']];
    const hoverBackgroundColors = [
      ['#ff708f', '#45b1f9'],
      ['#ffd468', '#27b225']
    ];
    const borderOptions = {
      borderWidth: 0,
      hoverBorderWidth: 2
    };
    const CHART_SIZE = 200;

    let display;

    if (areMessagesLoading) {
      display = <div>Loading messages...</div>;
    } else if (counts.totalMessages === 0) {
      display = <div>No messages to display</div>;
    } else
      display = (
        <div>
          <div className={styles.section}>
            Between{' '}
            <span className={styles.data}>
              {startDate.format(formatString)}
            </span>, and{' '}
            <span className={styles.data}>{endDate.format(formatString)}</span>,
            you and <span className={styles.data}>{selectedEmail}</span>{' '}
            exchanged{' '}
            <span className={styles.data}>
              {counts.totalMessages.toLocaleString()}
            </span>{' '}
            messages totaling{' '}
            <span className={styles.data}>
              {counts.totalWords.toLocaleString()}
            </span>{' '}
            words!
          </div>
          <div className={styles.section}>
            <div className={styles.chartSection}>
              <div className={styles.chartContainer}>
                <div className={styles.chartParent}>
                  <Doughnut
                    data={{
                      datasets: [
                        {
                          data: [counts.myMessages, counts.theirMessages],
                          backgroundColor: backgroundColors[0],
                          hoverBackgroundColor: hoverBackgroundColors[0],
                          ...borderOptions
                        }
                      ],
                      labels: ['You', selectedEmail]
                    }}
                    width={CHART_SIZE}
                    height={CHART_SIZE}
                    options={chartOptions}
                  />
                </div>
                <div className={styles.caption}>
                  You sent{' '}
                  <span className={styles.data}>
                    {counts.myMessages.toLocaleString()} ({getPercentageString(
                      counts.myMessages,
                      counts.totalMessages
                    )})
                  </span>{' '}
                  messages; <span className={styles.data}>{selectedEmail}</span>{' '}
                  sent{' '}
                  <span className={styles.data}>
                    {counts.theirMessages.toLocaleString()} ({getPercentageString(
                      counts.theirMessages,
                      counts.totalMessages
                    )})
                  </span>!
                </div>
              </div>
              <div className={styles.chartContainer}>
                <div className={styles.chartParent}>
                  <Doughnut
                    data={{
                      datasets: [
                        {
                          data: [counts.myWords, counts.theirWords],
                          backgroundColor: backgroundColors[1],
                          hoverBackgroundColor: hoverBackgroundColors[1],
                          ...borderOptions
                        }
                      ],
                      labels: ['You', selectedEmail]
                    }}
                    width={CHART_SIZE}
                    height={CHART_SIZE}
                    options={chartOptions}
                  />
                </div>
                <div className={styles.caption}>
                  You sent{' '}
                  <span className={styles.data}>
                    {counts.myWords.toLocaleString()} ({getPercentageString(
                      counts.myWords,
                      counts.totalWords
                    )})
                  </span>{' '}
                  words; <span className={styles.data}>{selectedEmail}</span>{' '}
                  sent{' '}
                  <span className={styles.data}>
                    {counts.theirWords.toLocaleString()} ({getPercentageString(
                      counts.theirWords,
                      counts.totalWords
                    )})
                  </span>!
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    return <div className={styles.root}>{display}</div>;
  }
}
