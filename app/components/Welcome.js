// @flow
import React, { Component } from 'react';

type Props = {
  user: {
    email: string,
    displayName: string
  },
  signOut: () => void
};

export default class Welcome extends Component<Props> {
  props: Props;

  render() {
    const {
      user: { email, displayName },
      signOut
    } = this.props;
    return (
      <div>
        <div>Hello, {displayName}</div>
        <div>{email}</div>
        <div>
          <button onClick={signOut}>Sign Out</button>
        </div>
      </div>
    );
  }
}
