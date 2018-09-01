// @flow
import React, { Component } from 'react';
import WordCloudCanvas from 'wordcloud';
import toPairs from 'lodash/toPairs';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import styles from './WordCloud.css';

type Props = {
  messageCountsByEmail: {
    [email: string]: {
      frequencyMap: {
        [word: string]: number
      }
    }
  },
  lastQuery: {
    selectedEmail?: string
  },
  areMessagesLoading: boolean
};

export default class WordCloud extends Component<Props> {
  static defaultProps = {
    selectedEmail: ''
  };

  componentDidMount() {
    const canvasHeight = this.canvas.parentElement.getBoundingClientRect()
      .height;
    const canvasWidth = this.canvas.parentElement.getBoundingClientRect().width;
    const {
      lastQuery: { selectedEmail },
      messageCountsByEmail
    } = this.props;
    const frequencyMap = get(messageCountsByEmail, [
      selectedEmail,
      'frequencyMap'
    ]);
    this.canvas.setAttribute('height', canvasHeight);
    this.canvas.setAttribute('width', canvasWidth);
    if (frequencyMap) {
      this.renderCloud(frequencyMap);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      lastQuery: { selectedEmail },
      messageCountsByEmail
    } = this.props;
    const {
      lastQuery: { selectedEmail: prevSelectedEmail },
      messageCountsByEmail: prevMessageCountsByEmail
    } = prevProps;
    const frequencyMap = get(messageCountsByEmail, [
      selectedEmail,
      'frequencyMap'
    ]);
    const prevFrequencyMap = get(prevMessageCountsByEmail, [
      prevSelectedEmail,
      'frequencyMap'
    ]);
    if (
      selectedEmail &&
      frequencyMap &&
      !isEqual(frequencyMap, prevFrequencyMap)
    ) {
      this.renderCloud(frequencyMap);
    }
  }

  renderCloud = frequencyMap => {
    const { areMessagesLoading } = this.props;
    if (frequencyMap && !areMessagesLoading) {
      const data = toPairs(frequencyMap);
      WordCloudCanvas(this.canvas, {
        list: data,
        backgroundColor: '#232c39',
        color: 'random-light',
        weightFactor: 3,
        clearCanvas: true
      });
    }
  };

  render() {
    const {
      messageCountsByEmail,
      lastQuery: { selectedEmail },
      areMessagesLoading
    } = this.props;
    const frequencyMap = get(messageCountsByEmail, [
      selectedEmail,
      'frequencyMap'
    ]);
    let message = '';
    if (!frequencyMap) {
      message = 'No data to display';
    } else if (areMessagesLoading) {
      message = 'Loading...';
    }

    return (
      <div className={styles.root}>
        <div className={styles.message}>{message}</div>
        <canvas
          className={styles.cloud}
          id="wordCloud-canvas"
          ref={node => {
            this.canvas = node;
          }}
        />
      </div>
    );
  }
}
