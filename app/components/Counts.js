// @flow
import React, { Component } from 'react';
import defer from 'lodash/defer';
import debounce from 'lodash/debounce';
import moment from 'moment';
import get from 'lodash/get';
import styles from './Counts.css';
import Charts from './Charts';
import Spinner from './Spinner';

type Count = {
  myMessages: number,
  theirMessages: number,
  myWords: number,
  theirWords: number,
  frequencyMap: {}
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

  constructor(props) {
    super(props);
    this.state = {
      chartSize: 0
    };
  }

  componentDidMount() {
    defer(this.setChartSize);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  setChartSize = () => {
    const containerHeight = this.container.getBoundingClientRect().height;
    this.setState({
      chartSize: Math.floor(containerHeight / 2)
    });
  };

  handleResize = debounce(() => {
    this.setChartSize();
  }, 250);

  render() {
    const {
      messageCountsByEmail,
      startDate,
      endDate,
      selectedEmail,
      areMessagesLoading
    } = this.props;

    const { chartSize } = this.state;

    const { myMessages, theirMessages, myWords, theirWords } = get(
      messageCountsByEmail,
      selectedEmail,
      {}
    );

    let display;

    if (areMessagesLoading) {
      display = (
        <div className={styles.message}>
          <div className={styles.spinner}>
            <Spinner size="5x" />
          </div>
          <div>Loading messages...</div>
        </div>
      );
    } else if (!myMessages && !theirMessages) {
      display = (
        <div className={styles.message}>No message data to display</div>
      );
    } else if (chartSize > 0) {
      display = (
        <Charts
          startDate={startDate}
          endDate={endDate}
          myMessages={myMessages}
          theirMessages={theirMessages}
          myWords={myWords}
          theirWords={theirWords}
          selectedEmail={selectedEmail}
          chartSize={chartSize}
        />
      );
    } else {
      display = <div className={styles.message}>Loading...</div>;
    }
    return (
      <div
        className={styles.root}
        ref={node => {
          this.container = node;
        }}
      >
        {display}
      </div>
    );
  }
}
