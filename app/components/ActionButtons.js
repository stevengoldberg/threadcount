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
  signOut: () => void
};

export default class ActionButtons extends Component<Props> {
  render() {
    const {
      queryThreads,
      selectedEmail,
      startDate,
      endDate,
      signOut
    } = this.props;
    return (
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
    );
  }
}
