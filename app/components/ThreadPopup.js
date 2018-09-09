// @flow
import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import styles from './ThreadPopup.css';
import Conversation from './Conversation';

type Message = {
  id: string,
  snippet: string
};

type Props = {
  getThread: () => void,
  location: {
    search: string
  },
  match: {
    url: string
  },
  messages: Array<Message>
};

export default class ThreadPage extends Component<Props> {
  componentDidMount() {
    const {
      getThread,
      location: { search }
    } = this.props;
    const searchParams = new window.URLSearchParams(search);
    const id = searchParams.get('id');
    const userEmail = searchParams.get('userEmail');
    const selectedEmail = searchParams.get('selectedEmail');
    getThread({ id, selectedEmail, userEmail });
  }

  render() {
    const { messages, match } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.nav}>
          <NavLink to="/thread" exact activeClassName={styles.active}>
            Conversation
          </NavLink>
          <NavLink to="/thread/count" activeClassName={styles.active}>
            Word Count
          </NavLink>
          <NavLink to="/thread/cloud" activeClassName={styles.active}>
            Word Cloud
          </NavLink>
        </div>
        <div className={styles.content}>
          <Route
            exact
            path="/thread"
            render={props => <Conversation {...props} messages={messages} />}
          />
          <Route path={`${match.url}/count`} render={() => <div>Count</div>} />
          <Route path={`${match.url}/cloud`} render={() => <div>Cloud</div>} />
        </div>
      </div>
    );
  }
}
