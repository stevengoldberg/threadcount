// @flow

import React, { Component } from 'react';
import moment from 'moment';
import {
  AutoSizer,
  Table,
  Column,
  CellMeasurer,
  CellMeasurerCache
} from 'react-virtualized';
import { getFromValue } from '../utils/is-message-ours';
import decodeMessage from '../utils/decode-message';
import cleanMessage from '../utils/clean-message';
import styles from './Conversation.css';
import { evenTableColor, oddTableColor } from './ThreadPreview';

type Message = {
  internalDate: string,
  payload: {
    body?: {
      data: string
    },
    parts?: [],
    headers: [
      {
        name: string,
        value: string
      }
    ]
  }
};

type Props = {
  messages?: Array<Message>
};

const cache = new CellMeasurerCache({
  defaultHeight: 30,
  minHeight: 30,
  fixedWidth: true
});

export default class Conversation extends Component<Props> {
  static defaultProps = {
    messages: []
  };

  getRow = ({ index }) => {
    const { messages } = this.props;
    const message = messages[index];
    return {
      date: moment(parseInt(message.internalDate, 10)).format('M/DD/YY h:mm a'),
      sender: getFromValue(message),
      message: cleanMessage(decodeMessage(message))
    };
  };

  renderMessage = ({ dataKey, parent, rowIndex, style }) => {
    const row = this.getRow({ index: rowIndex });
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={dataKey}
        parent={parent}
        rowIndex={rowIndex}
      >
        <div style={style} className={styles.message}>
          {row.message}
        </div>
      </CellMeasurer>
    );
  };

  render() {
    const { messages } = this.props;

    return messages.length > 0 ? (
      <AutoSizer>
        {({ height, width }) => (
          <Table
            height={height}
            width={width}
            deferredMeasurementCache={cache}
            headerHeight={25}
            overscanRowCount={2}
            rowHeight={cache.rowHeight}
            rowCount={messages.length}
            rowGetter={this.getRow}
            rowClassName={styles.tableRow}
            rowStyle={({ index }) => {
              if (index > -1) {
                return {
                  backgroundColor:
                    index % 2 === 0 ? evenTableColor : oddTableColor
                };
              }
            }}
          >
            <Column
              width={150}
              label="Date"
              dataKey="date"
              headerClassName={styles.tableHeader}
              className={styles.date}
            />
            <Column
              width={200}
              label="Sender"
              dataKey="sender"
              headerClassName={styles.tableHeader}
              className={styles.sender}
            />
            <Column
              width={width - 325}
              label="Message"
              dataKey="message"
              cellRenderer={this.renderMessage}
              headerClassName={styles.tableHeader}
            />
          </Table>
        )}
      </AutoSizer>
    ) : (
      <div>Loading...</div>
    );
  }
}
