// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import type Moment from 'moment';
import { ipcRenderer } from 'electron';
import { AllHtmlEntities } from 'html-entities';
import styles from './ThreadPreview.css';

export const evenTableColor = '#88a4ce';
export const oddTableColor = '#92b5e8';

type Props = {
  index: number,
  style: {
    height: number,
    top: number
  },
  messageCount?: number,
  date?: string,
  snippet: string,
  id: string,
  selectedEmail: string,
  userEmail: string,
  selectedStartDate: Moment,
  selectedEndDate: Moment
};

export default class ThreadPreview extends Component<Props> {
  props: Props;

  static defaultProps = {
    messageCount: 0,
    date: ''
  };

  render() {
    const {
      date: dateString,
      messageCount,
      style,
      index,
      snippet,
      id,
      selectedEmail,
      userEmail,
      selectedStartDate,
      selectedEndDate
    } = this.props;
    const getDate = date => new Date(parseInt(date, 10));
    const getFormattedDate = date => getDate(date).toLocaleDateString();
    const displayDate = messageCount > 0 ? getFormattedDate(dateString) : null;
    const displayText = snippet
      ? AllHtmlEntities.decode(snippet)
      : '{{ no preview }}';

    const launchThread = () =>
      ipcRenderer.send('showThread', {
        id,
        selectedEmail,
        userEmail,
        selectedStartDate: selectedStartDate.unix(),
        selectedEndDate: selectedEndDate.unix()
      });

    return (
      <div
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.keyCode === 13) {
            launchThread();
            e.preventDefault();
          }
        }}
        style={{
          ...style,
          backgroundColor: index % 2 === 0 ? evenTableColor : oddTableColor
        }}
        className={classNames(styles.content, styles.clickable)}
        onClick={launchThread}
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
