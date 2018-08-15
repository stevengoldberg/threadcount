// @flow
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import type Moment from 'moment';
import styles from './Query.css';
import Button from '../components/Button';

type Props = {
  updateStartDate: () => void,
  updateEndDate: () => void,
  selectedEmail: string,
  startDate: Moment,
  endDate: Moment,
  queryThreads: () => void
};

export default class Query extends Component<Props> {
  props: Props;

  render() {
    const {
      selectedEmail,
      startDate,
      endDate,
      updateStartDate,
      updateEndDate,
      queryThreads
    } = this.props;
    return (
      <div className={styles.container}>
        <div className={styles.email}>
          {selectedEmail || 'No contact selected'}
        </div>
        <div className={styles.dateContainer}>
          <DatePicker
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={updateStartDate}
            showYearDropdown
          />
          <div>Start Date</div>
        </div>
        <div className={styles.dateContainer}>
          <DatePicker
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            onChange={updateEndDate}
            showYearDropdown
          />
          <div>End Date</div>
        </div>
        <Button
          onClick={() =>
            queryThreads({
              email: selectedEmail,
              afterDate: startDate,
              beforeDate: endDate
            })
          }
        >
          search
        </Button>
      </div>
    );
  }
}
