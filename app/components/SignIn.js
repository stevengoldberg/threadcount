// @flow
import React, { Component } from 'react';

type Props = {
  signIn: () => void
};

export default class SignIn extends Component<Props> {
  props: Props;

  render() {
    const { signIn } = this.props;
    return (
      <div>
        You are not signed in
        <div>
          <button onClick={signIn}>Sign In</button>
        </div>
      </div>
    );
  }
}
