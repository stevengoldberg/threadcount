// @flow
import * as React from 'react';
import 'react-virtualized/styles.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}
