// @flow
import React, { Component } from 'react';
import styles from './Thread.css';
import decodeHtml from '../utils/decode-html';

type Props = {
  index: number,
  style: Object,
  messageCount?: number,
  date: string,
  snippet: string
};

export default class Thread extends Component<Props> {
  props: Props;

  static defaultProps = {
    messageCount: 0
  };

  render() {
    const {
      date: dateString,
      messageCount,
      style,
      index,
      snippet
    } = this.props;
    const oddColor = '#92b5e8';
    const evenColor = '#88a4ce';
    const getDate = date => new Date(parseInt(date, 10));
    const getFormattedDate = date => getDate(date).toLocaleDateString();
    const displayDate = messageCount > 0 ? getFormattedDate(dateString) : null;
    const displayText = snippet ? decodeHtml(snippet) : '{{ no preview }}';

    return (
      <div
        style={{
          ...style,
          backgroundColor: index % 2 === 0 ? evenColor : oddColor
        }}
        className={styles.content}
      >
        <div className={styles.date}>{displayDate}</div>
        <div className={styles.snippet}>{displayText}</div>
        {messageCount > 0 && (
          <span className={styles.count}>[{messageCount}]</span>
        )}
      </div>
    );
  }
}
