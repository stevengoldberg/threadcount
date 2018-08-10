// @flow
import React, { Component } from 'react';
import styles from './Thread.css';
import decodeHtml from '../utils/decode-html';

type Message = {
  internalDate: string
};

type Props = {
  thread: Object,
  index: number,
  style: Object,
  messages?: Array<Message>
};

export default class Thread extends Component<Props> {
  props: Props;

  static defaultProps = {
    messages: []
  };

  render() {
    const { thread, style, index, messages } = this.props;
    const oddColor = '#92b5e8';
    const evenColor = '#88a4ce';
    const getDate = message => new Date(parseInt(message.internalDate, 10));
    const getFormattedDate = message => getDate(message).toLocaleDateString();
    const displayDate = messages.length ? getFormattedDate(messages[0]) : null;
    const displayText = thread.snippet
      ? decodeHtml(thread.snippet)
      : '{{ no preview }}';

    return (
      <div
        style={{
          ...style,
          backgroundColor: index % 2 === 0 ? evenColor : oddColor
        }}
        className={styles.content}
      >
        <span className={styles.date}>{displayDate}</span>
        {displayText}
        {messages.legnth && (
          <span className={styles.count}>[{messages.length}]</span>
        )}
      </div>
    );
  }
}
