// @flow
import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';
import styles from './Charts.css';

const backgroundColors = [['#FF6384', '#36A2EB'], ['#FFCE56', '#17a315']];
const hoverBackgroundColors = [['#ff708f', '#45b1f9'], ['#ffd468', '#27b225']];
const borderOptions = {
  borderWidth: 0,
  hoverBorderWidth: 2
};
const formatString = 'dddd, MMM Do, YYYY';
const chartOptions = {
  maintainAspectRatio: false,
  legend: {
    labels: {
      fontColor: 'white'
    }
  }
};
const getPercentageString = (messages, total) =>
  `${((messages / total) * 100).toFixed(2)}%`;

export default class Charts extends Component<Props> {
  render() {
    const {
      startDate,
      endDate,
      myWords,
      theirWords,
      myMessages,
      theirMessages,
      totalMessages,
      selectedEmail,
      chartSize
    } = this.props;
    const totalWords = myWords + theirWords;
    return (
      <div>
        <div className={styles.section}>
          Between{' '}
          <span className={styles.data}>{startDate.format(formatString)}</span>,
          and{' '}
          <span className={styles.data}>{endDate.format(formatString)}</span>,
          you and <span className={styles.data}>{selectedEmail}</span> exchanged{' '}
          <span className={styles.data}>{totalMessages.toLocaleString()}</span>{' '}
          messages totaling{' '}
          <span className={styles.data}>{totalWords.toLocaleString()}</span>{' '}
          words!
        </div>
        <div className={styles.section}>
          <div className={styles.chartSection}>
            <div className={styles.chartContainer}>
              <div
                className={styles.chartParent}
                style={{ height: chartSize, width: chartSize }}
              >
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
                  width={chartSize}
                  height={chartSize}
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
                messages; <span className={styles.data}>{selectedEmail}</span>{' '}
                sent{' '}
                <span className={styles.data}>
                  {theirMessages.toLocaleString()} ({getPercentageString(
                    theirMessages,
                    totalMessages
                  )})
                </span>!
              </div>
            </div>
            <div className={styles.chartContainer}>
              <div
                className={styles.chartParent}
                style={{ height: chartSize, width: chartSize }}
              >
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
                  width={chartSize}
                  height={chartSize}
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
                words; <span className={styles.data}>{selectedEmail}</span> sent{' '}
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
    );
  }
}
