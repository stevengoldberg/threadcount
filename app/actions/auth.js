import { parse } from 'url';
import { remote } from 'electron';
import qs from 'qs';
import { RSAA } from 'redux-api-middleware';
import { typeGenerator } from '../utils/type-utils';

export const SIGN_OUT = 'SIGN_OUT';
export const profileActions = typeGenerator('profile');
export const tokenActions = typeGenerator('token');

const GOOGLE_AUTHORIZATION_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';
const GOOGLE_PROFILE_URL = 'https://www.googleapis.com/userinfo/v2/me';
const GOOGLE_CLIENT_ID =
  '450795344871-a2ee77mbk9ndsein2sadl9tmi2p7qor6.apps.googleusercontent.com';
const GOOGLE_REDIRECT_URI = 'com.gchat.analytics:/oauth2Callback';

export function googleSignIn() {
  return async dispatch => {
    const code = await signInWithPopup();
    await dispatch(fetchAccessTokens(code));
    await dispatch(fetchGoogleProfile());
  };
}

function fetchGoogleProfile() {
  return {
    [RSAA]: {
      endpoint: GOOGLE_PROFILE_URL,
      method: 'GET',
      types: profileActions
    }
  };
}

function fetchAccessTokens(code) {
  const body = qs.stringify({
    code,
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: GOOGLE_REDIRECT_URI,
    grant_type: 'authorization_code'
  });
  return {
    [RSAA]: {
      endpoint: GOOGLE_TOKEN_URL,
      method: 'POST',
      types: tokenActions,
      body,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  };
}

function signInWithPopup() {
  return new Promise((resolve, reject) => {
    const authWindow = new remote.BrowserWindow({
      width: 500,
      height: 600,
      show: true
    });

    // TODO: Generate and validate PKCE code_challenge value
    const urlParams = {
      response_type: 'code',
      redirect_uri: GOOGLE_REDIRECT_URI,
      client_id: GOOGLE_CLIENT_ID,
      scope:
        'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
    };
    const authUrl = `${GOOGLE_AUTHORIZATION_URL}?${qs.stringify(urlParams)}`;

    function handleNavigation(url) {
      const { query } = parse(url, true);
      if (query) {
        if (query.error) {
          reject(new Error(`There was an error: ${query.error}`));
        } else if (query.code) {
          // Login is complete
          authWindow.removeAllListeners('closed');
          setImmediate(() => authWindow.close());

          // This is the authorization code we need to request tokens
          resolve(query.code);
        }
      }
    }

    authWindow.on('closed', () => {
      // TODO: Handle this smoothly
      throw new Error('Auth window was closed by user');
    });

    authWindow.webContents.on('will-navigate', (event, url) => {
      handleNavigation(url);
    });

    authWindow.webContents.on(
      'did-get-redirect-request',
      (event, oldUrl, newUrl) => {
        handleNavigation(newUrl);
      }
    );

    authWindow.loadURL(authUrl);
  });
}

export function signOut() {
  return {
    type: SIGN_OUT
  };
}
