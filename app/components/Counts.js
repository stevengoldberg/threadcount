// @flow
import React, { Component } from 'react';
import type Moment from 'moment';
import moment from 'moment';
import { Doughnut } from 'react-chartjs-2';
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
  selectedEmail?: string,
  startDate?: Moment,
  endDate?: Moment,
  areMessagesLoaded: boolean
};

export default class Counts extends Component<Props> {
  static defaultProps = {
    selectedEmail: '',
    startDate: moment(),
    endDate: moment()
  };

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

    return (
      <div className={styles.root}>
        {areMessagesLoaded ? (
          <div>
            <div className={styles.section}>
              Between{' '}
              <span className={styles.data}>
                {startDate.format(formatString)}
              </span>, and{' '}
              <span className={styles.data}>
                {endDate.format(formatString)}
              </span>, you and{' '}
              <span className={styles.data}>{selectedEmail}</span> exchanged{' '}
              <span className={styles.data}>
                {totalMessages.toLocaleString()}
              </span>{' '}
              messages totaling{' '}
              <span className={styles.data}>{totalWords.toLocaleString()}</span>{' '}
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
                            data: [myMessages, theirMessages],
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
                      {myMessages.toLocaleString()} ({getPercentageString(
                        myMessages,
                        totalMessages
                      )})
                    </span>{' '}
                    messages;{' '}
                    <span className={styles.data}>{selectedEmail}</span> sent{' '}
                    <span className={styles.data}>
                      {theirMessages.toLocaleString()} ({getPercentageString(
                        theirMessages,
                        totalMessages
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
                            data: [myWords, theirWords],
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
                      {myWords.toLocaleString()} ({getPercentageString(
                        myWords,
                        totalWords
                      )})
                    </span>{' '}
                    words; <span className={styles.data}>{selectedEmail}</span>{' '}
                    sent{' '}
                    <span className={styles.data}>
                      {theirWords.toLocaleString()} ({getPercentageString(
                        theirWords,
                        totalWords
                      )})
                    </span>!
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>No data to display</div>
        )}
      </div>
    );
  }
}
