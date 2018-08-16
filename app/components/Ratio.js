// @flow
import React, { Component } from 'react';

type Props = {
  ratio: {
    totalMessages: number,
    myMessages: number,
    theirMessages: number
  }
};

export default class Ratio extends Component<Props> {
  render() {
    const { ratio } = this.props;
    console.log(ratio);
    return <div>foo</div>;
  }
}
