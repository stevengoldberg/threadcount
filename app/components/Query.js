// @flow
import React, { Component } from 'react';

type Props = {
  queryThreads: () => void
};

export default class Query extends Component<Props> {
  props: Props;

  render() {
    const { queryThreads } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="them">
            Their email
            <input
              id="them"
              ref={node => {
                this.theirEmail = node;
              }}
            />
          </label>
          <label htmlFor="after">
            Get messages after
            <input
              type="date"
              id="after"
              ref={node => {
                this.afterDate = node;
              }}
            />
          </label>
          <button
            onClick={() => {
              const values = {
                theirEmail: this.theirEmail.value,
                afterDate: this.afterDate.value
              };
              queryThreads(values);
            }}
          >
            submit
          </button>
        </form>
      </div>
    );
  }
}
