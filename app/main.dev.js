/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import electron, { app, BrowserWindow, ipcMain, dialog } from 'electron';
import MenuBuilder from './menu';
import { errorMap } from './utils/error-map';

let mainWindow = null;
let threadWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const { width } = electron.screen.getPrimaryDisplay().workAreaSize;
  const mainWidth = Math.min(1536, width * 0.9);
  const mainHeight = mainWidth * 0.75;

  mainWindow = new BrowserWindow({
    show: false,
    width: mainWidth,
    height: mainHeight
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);
  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
    threadWindow = null;
  });

  mainWindow.webContents.on('new-window', (e, url) => {
    e.preventDefault();
    electron.shell.openExternal(url);
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  ipcMain.on('error', (event, arg) => {
    dialog.showErrorBox('Error', errorMap[arg]);
  });

  // window.addEventListener('keydown', closeThreadWindow)

  ipcMain.on(
    'showThread',
    (
      event,
      { id, selectedEmail, userEmail, selectedStartDate, selectedEndDate }
    ) => {
      const mainSize = mainWindow.getSize();
      threadWindow = new BrowserWindow({
        show: false,
        width: parseInt(mainSize[0] * 0.9, 10),
        height: parseInt(mainSize[1] * 0.75, 10),
        resizable: false,
        parent: mainWindow,
        modal: true,
        backgroundColor: '#232c39'
      });
      threadWindow.loadURL(
        `file://${__dirname}/app.html#/thread?id=${id}&selectedEmail=${selectedEmail}&userEmail=${userEmail}` +
          `&startDate=${selectedStartDate}&endDate=${selectedEndDate}`
      );
      threadWindow.show();
      threadWindow.focus();
      threadWindow.once('closed', () => {
        threadWindow = null;
      });
      ipcMain.once('signOut', () => {
        if (threadWindow) {
          threadWindow.close();
        }
      });
      ipcMain.once('closeThread', () => {
        if (threadWindow) {
          threadWindow.close();
        }
      });
    }
  );
});
