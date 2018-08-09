// @flow
import * as React from 'react';
import 'react-virtualized/styles.css';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return <div style={{ height: '100%' }}>{this.props.children}</div>;
  }
}
