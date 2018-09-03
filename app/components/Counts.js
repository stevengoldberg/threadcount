// @flow
import React, { Component } from 'react';
import defer from 'lodash/defer';
import debounce from 'lodash/debounce';
import type Moment from 'moment';
import moment from 'moment';
import get from 'lodash/get';
import styles from './Counts.css';
import Charts from './Charts';

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
    const defaultCounts = {
      myMessages: 0,
      theirMessages: 0,
      myWords: 0,
      theirWords: 0
    };
    const { myMessages, theirMessages, myWords, theirWords } = get(
      messageCountsByEmail,
      `${selectedEmail}`,
      defaultCounts
    );

    const totalMessages = myMessages + theirMessages;

    let display;

    if (areMessagesLoading) {
      display = <div>Loading messages...</div>;
    } else if (totalMessages === 0) {
      display = <div>No messages to display</div>;
    } else if (this.state.chartSize > 0) {
      display = (
        <Charts
          startDate={startDate}
          endDate={endDate}
          myMessages={myMessages}
          theirMessages={theirMessages}
          myWords={myWords}
          theirWords={theirWords}
          totalMessages={totalMessages}
          selectedEmail={selectedEmail}
          chartSize={this.state.chartSize}
        />
      );
    } else {
      display = <div>Loading...</div>;
    }
    console.log('render');
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
