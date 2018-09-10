// @flow
import { ipcRenderer } from 'electron';
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { Route, NavLink } from 'react-router-dom';
import styles from './ThreadPopup.css';
import Conversation from './Conversation';
import WordCloud from '../containers/WordCloud';

type Message = {
  id: string,
  snippet: string
};

type Props = {
  getThread: () => void,
  hydrateState: () => void,
  allMessagesSuccess: () => void,
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
      hydrateState,
      allMessagesSuccess,
      location: { search }
    } = this.props;
    const searchParams = new window.URLSearchParams(search);
    const id = searchParams.get('id');
    const userEmail = searchParams.get('userEmail');
    const selectedEmail = searchParams.get('selectedEmail');
    hydrateState({
      selectedEmail,
      userEmail
    });
    getThread({ id, selectedEmail, userEmail })
      .then(() => allMessagesSuccess({ selectedEmail, userEmail }))
      .catch(e => console.log(e));

    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.closeThreadPopup();
    }
  };

  closeThreadPopup = () => {
    ipcRenderer.send('closeThread');
  };

  render() {
    const { messages, match } = this.props;
    return (
      <div className={styles.root}>
        <div className={styles.header}>
          <div
            className={styles.closeButton}
            onClick={this.closeThreadPopup}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                this.closeThreadPopup();
              }
            }}
          >
            <FontAwesomeIcon icon={faWindowClose} size="lg" />
          </div>
        </div>
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
          <Route path={`${match.url}/cloud`} render={() => <WordCloud />} />
        </div>
      </div>
    );
  }
}
