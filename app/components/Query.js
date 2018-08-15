// @flow
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import type Moment from 'moment';

type Props = {
  searchContacts: () => void,
  updateStartDate: () => void,
  updateEndDate: () => void,
  startDate: Moment,
  endDate: Moment
};

export default class Query extends Component<Props> {
  props: Props;

  render() {
    const {
      searchContacts,
      startDate,
      endDate,
      updateStartDate,
      updateEndDate
    } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="contactSearch">
            <input
              id="contactSearch"
              ref={node => {
                this.contactSearch = node;
              }}
            />
          </label>
          <button onClick={() => searchContacts(this.contactSearch.value)}>
            Search
          </button>
        </form>
        <DatePicker
          selected={startDate}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          onChange={updateStartDate}
          showYearDropdown
        />
        <DatePicker
          selected={endDate}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          onChange={updateEndDate}
          showYearDropdown
        />
      </div>
    );
  }
}
