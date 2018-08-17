// @flow
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import type Moment from 'moment';
import styles from './Query.css';
import ContactSearch from '../containers/ContactSearch';

type Props = {
  updateStartDate: () => void,
  updateEndDate: () => void,
  selectedEmail: string,
  startDate: Moment,
  endDate: Moment
};

export default class Query extends Component<Props> {
  props: Props;

  render() {
    const {
      selectedEmail,
      startDate,
      endDate,
      updateStartDate,
      updateEndDate
    } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <ContactSearch />
          <div className={styles.email}>
            {' '}
            {selectedEmail || 'No contact selected'}
          </div>
        </div>
        <div className={styles.container}>
          <DatePicker
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={updateStartDate}
            showYearDropdown
            className={styles.input}
          />
          <div>Start Date</div>
        </div>
        <div className={styles.container}>
          <DatePicker
            selected={endDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            onChange={updateEndDate}
            showYearDropdown
            className={styles.input}
          />
          <div>End Date</div>
        </div>
      </div>
    );
  }
}
