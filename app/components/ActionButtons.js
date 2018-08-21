// @flow
import React, { Component } from 'react';
import type Moment from 'moment';
import Button from './Button';
import styles from './ActionButtons.css';

type Props = {
  startDate: Moment,
  endDate: Moment,
  selectedEmail: string,
  queryThreads: () => void,
  signOut: () => void,
  selectedAnalytic: 'wordCloud' | 'wordCount',
  updateSelectedAnalytic: () => void
};

export default class ActionButtons extends Component<Props> {
  render() {
    const {
      queryThreads,
      selectedEmail,
      startDate,
      endDate,
      signOut,
      selectedAnalytic,
      updateSelectedAnalytic
    } = this.props;
    const handleUpdateAnalytic = e => {
      updateSelectedAnalytic(e.target.value);
    };
    return (
      <div className={styles.root}>
        <fieldset className={styles.analytics}>
          <label htmlFor="wordCount">
            <input
              type="radio"
              id="wordCount"
              value="wordCount"
              checked={selectedAnalytic === 'wordCount'}
              onChange={handleUpdateAnalytic}
            />
            Word Count
          </label>
          <label htmlFor="wordCloud">
            <input
              type="radio"
              id="wordCloud"
              value="wordCloud"
              checked={selectedAnalytic === 'wordCloud'}
              onChange={handleUpdateAnalytic}
            />
            Word Cloud
          </label>
        </fieldset>

        <div className={styles.buttonContainer}>
          <Button
            onClick={() =>
              queryThreads({
                email: selectedEmail,
                startDate,
                endDate
              })
            }
          >
            search
          </Button>
          <Button onClick={signOut} type="cancel">
            Sign Out
          </Button>
        </div>
      </div>
    );
  }
}
