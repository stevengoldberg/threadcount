// @flow
import React, { Component } from 'react';
import WordCloudCanvas from 'wordcloud';
import debounce from 'lodash/debounce';
import { scalePow } from 'd3-scale';
import toPairs from 'lodash/toPairs';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import styles from './WordCloud.css';
import Spinner from './Spinner';

type Props = {
  messageCountsByEmail: {
    [email: string]: {
      frequencyMap: {
        [selectedEmail: string]: {},
        [userEmail: string]: {}
      }
    }
  },
  selectedEmail?: string,
  userEmail: string,
  areMessagesLoading: boolean
};

export default class WordCloud extends Component<Props> {
  static defaultProps = {
    selectedEmail: ''
  };

  componentDidMount() {
    const { selectedEmail, messageCountsByEmail } = this.props;
    this.colorScale = scalePow()
      .exponent(0.25)
      .domain([10, 100])
      .range(['#42b9f4', '#d31d63']);
    const frequencyMap = get(messageCountsByEmail, [
      selectedEmail,
      'frequencyMap'
    ]);
    this.setCanvasSize(this.userCanvas);
    this.setCanvasSize(this.selectedCanvas);
    window.addEventListener('resize', this.handleResize);
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

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  setCanvasSize = el => {
    const canvasHeight = el.parentElement.getBoundingClientRect().height;
    const canvasWidth = el.parentElement.getBoundingClientRect().width;
    el.setAttribute('height', canvasHeight);
    el.setAttribute('width', canvasWidth);
  };

  handleResize = debounce(() => {
    const { messageCountsByEmail, selectedEmail } = this.props;
    const frequencyMap = get(
      messageCountsByEmail,
      [selectedEmail, 'frequencyMap'],
      {}
    );
    this.setCanvasSize(this.userCanvas);
    this.setCanvasSize(this.selectedCanvas);
    this.renderCloud(frequencyMap);
  }, 250);

  renderCloud = frequencyMap => {
    const { areMessagesLoading, userEmail, selectedEmail } = this.props;
    if (frequencyMap && !areMessagesLoading) {
      const userData = toPairs(frequencyMap[userEmail]);
      const selectedData = toPairs(frequencyMap[selectedEmail]);
      WordCloudCanvas(this.userCanvas, {
        list: userData,
        backgroundColor: '#232c39',
        weightFactor: 2,
        clearCanvas: true,
        shuffle: true,
        rotateRatio: 0.12,
        ellipticity: 0.5,
        color: (word, weight, fontSize) => this.colorScale(fontSize)
      });
      WordCloudCanvas(this.selectedCanvas, {
        list: selectedData,
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
      areMessagesLoading,
      userEmail
    } = this.props;
    const frequencyMap = get(messageCountsByEmail, [
      selectedEmail,
      'frequencyMap'
    ]);
    let message = <div />;
    if (!frequencyMap || isEmpty(frequencyMap)) {
      message = <div className={styles.message}>No word data to display</div>;
    } else if (areMessagesLoading) {
      message = (
        <div className={styles.message}>
          <div className={styles.spinner}>
            <Spinner size="5x" />
          </div>
          <div>Loading messages...</div>
        </div>
      );
    }

    return (
      <div className={styles.root}>
        {message}
        <div className={styles.container}>
          <div className={styles.labels}>
            <div>{!isEmpty(get(frequencyMap, userEmail)) && userEmail}</div>
            <div>
              {!isEmpty(get(frequencyMap, selectedEmail)) && selectedEmail}
            </div>
          </div>
          <div className={styles.canvasContainer}>
            <div className={styles.canvas}>
              <canvas
                className={styles.cloud}
                id="wordCloud-user"
                ref={node => {
                  this.userCanvas = node;
                }}
              />
            </div>
            <div className={styles.canvas}>
              <canvas
                className={styles.cloud}
                id="wordCloud-selected"
                ref={node => {
                  this.selectedCanvas = node;
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
