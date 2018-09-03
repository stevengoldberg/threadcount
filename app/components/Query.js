// @flow
import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import type Moment from 'moment';
import styles from './Query.css';
import ContactSearch from '../containers/ContactSearch';
import Tooltip from './Tooltip';

type Props = {
  updateStartDate: () => void,
  updateEndDate: () => void,
  selectedEmail: string,
  startDate: Moment | null,
  endDate: Moment | null
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
    const handleUpdateStartDate = date =>
      !date || !endDate || date.isBefore(endDate)
        ? updateStartDate(date)
        : updateStartDate(endDate);
    const handleUpdateEndDate = date =>
      !date || !startDate || date.isAfter(startDate)
        ? updateEndDate(date)
        : updateEndDate(startDate);
    return (
      <div className={styles.root}>
        <div className={styles.container}>
          <Tooltip text="Start typing a name or email address" />
          <div>
            <ContactSearch />
            <div className={styles.email}>
              {' '}
              {selectedEmail || 'No contact selected'}
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <Tooltip text="Choose a date for the lower bound of your search" />
          <div>
            <DatePicker
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onChange={handleUpdateStartDate}
              showYearDropdown
              className={styles.input}
              minDate={moment(endDate).subtract(1, 'year')}
              placeholderText="Select a start date"
              isClearable
            />
            <div>Start Date</div>
          </div>
        </div>
        <div className={styles.container}>
          <Tooltip text="Your start and end date may be a maximum of 1 year apart" />
          <div>
            <DatePicker
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              onChange={handleUpdateEndDate}
              showYearDropdown
              className={styles.input}
              maxDate={moment()}
              placeholderText="Select an end date"
              isClearable
              todayButton="Today"
            />
            <div>End Date</div>
          </div>
        </div>
      </div>
    );
  }
}
