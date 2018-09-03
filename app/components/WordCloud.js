// @flow
import React, { Component } from 'react';
import WordCloudCanvas from 'wordcloud';
import { scalePow } from 'd3-scale';
import toPairs from 'lodash/toPairs';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
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
  selectedEmail?: string,
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
    const { selectedEmail, messageCountsByEmail } = this.props;

    this.colorScale = scalePow()
      .exponent(0.25)
      .domain([10, 100])
      .range(['#42b9f4', '#d31d63']);

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
    const { selectedEmail, messageCountsByEmail } = this.props;
    const {
      selectedEmail: prevSelectedEmail,
      messageCountsByEmail: prevMessageCountsByEmail
    } = prevProps;
    const frequencyMap = get(
      messageCountsByEmail,
      [selectedEmail, 'frequencyMap'],
      {}
    );
    const prevFrequencyMap = get(prevMessageCountsByEmail, [
      prevSelectedEmail,
      'frequencyMap'
    ]);
    if (
      selectedEmail &&
      frequencyMap &&
      (!isEqual(frequencyMap, prevFrequencyMap) ||
        selectedEmail !== prevSelectedEmail)
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
        weightFactor: 2,
        clearCanvas: true,
        shuffle: true,
        rotateRatio: 0.12,
        ellipticity: 0.5,
        color: (word, weight, fontSize) => this.colorScale(fontSize)
      });
    }
  };

  render() {
    const {
      messageCountsByEmail,
      selectedEmail,
      areMessagesLoading
    } = this.props;
    const frequencyMap = get(messageCountsByEmail, [
      selectedEmail,
      'frequencyMap'
    ]);
    let message = '';
    if (!frequencyMap || isEmpty(frequencyMap)) {
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
