// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { ipcRenderer } from 'electron';
import { AllHtmlEntities } from 'html-entities';
import styles from './Thread.css';

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
  isInPopUp: boolean,
  selectedEmail: string,
  userEmail: string
};

export default class Thread extends Component<Props> {
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
      isInPopUp,
      selectedEmail,
      userEmail
    } = this.props;
    const oddColor = '#92b5e8';
    const evenColor = '#88a4ce';
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
        userEmail
      });

    return (
      <div
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.keyCode === 13 && !isInPopUp) {
            launchThread();
            e.preventDefault();
          }
        }}
        style={{
          ...style,
          backgroundColor: index % 2 === 0 ? evenColor : oddColor
        }}
        className={classNames(styles.content, {
          [styles.clickable]: !isInPopUp
        })}
        onClick={isInPopUp ? null : launchThread}
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
