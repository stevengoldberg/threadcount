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
  startDate: Moment | null,
  endDate: Moment | null
};

export default class Query extends Component<Props> {
  props: Props;

  render() {
    const { startDate, endDate, updateStartDate, updateEndDate } = this.props;
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
          <Tooltip text="Start typing a name or email address to filter the contacts list" />
          <ContactSearch />
        </div>
        <div className={styles.container}>
          <Tooltip text="Your start and end date can be at most one year apart" />
          <DatePicker
            selected={startDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            onChange={handleUpdateStartDate}
            showYearDropdown
            className={styles.input}
            placeholderText="Select a start date"
            maxDate={moment()}
            isClearable
          />
        </div>
        <div className={styles.container}>
          <Tooltip text="Click the &quot;Today&quot; button to select today's date" />
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
        </div>
      </div>
    );
  }
}
