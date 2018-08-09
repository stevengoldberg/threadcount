// @flow
import React, { Component } from 'react';
import Button from './Button';

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
          <Button onClick={signIn}>Sign In</Button>
        </div>
      </div>
    );
  }
}
