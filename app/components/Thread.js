// @flow
import React, { Component } from 'react';
import styles from './Thread.css';
import decodeHtml from '../utils/decode-html';

type Props = {
  thread: Object,
  index: number,
  style: Object
};

export default class Thread extends Component<Props> {
  props: Props;

  render() {
    const { thread, style, index } = this.props;
    const oddColor = '#92b5e8';
    const evenColor = '#88a4ce';

    return (
      <div
        style={{
          ...style,
          backgroundColor: index % 2 === 0 ? evenColor : oddColor
        }}
        className={styles.content}
      >
        {decodeHtml(thread.snippet)}
      </div>
    );
  }
}
