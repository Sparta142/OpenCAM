import path from 'path';
import { app, BrowserWindow, dialog } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { forwardToRenderer, triggerAlias, replayActionMain } from 'electron-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import * as reducers from '../shared/reducers';
import { updateResources } from '../shared/actions';
import Kraken from './kraken';

// Redux
const openCamApp = combineReducers(reducers);
const store = createStore(
    openCamApp,
    {
        resources: {
            fanSpeed: {
                name: 'Fan speed',
                value: 0,
                suffix: 'RPM',
            },
            pumpSpeed: {
                name: 'Pump speed',
                value: 0,
                suffix: 'RPM',
            },
            liquidTemp: {
                name: 'Liquid temperature',
                value: 0,
                suffix: '°C',
            },
            cpuTemp: {
                name: 'CPU temperature',
                value: 0,
                suffix: '°C',
            },
        },
        settings: {
            pumpSetpoint: 100,
            fanSetpoint: 100,
        },
    },
    applyMiddleware(
        triggerAlias,
        forwardToRenderer,
    ),
);

replayActionMain(store);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

// Handle to the NZXT Kraken device
let kraken;

const createWindow = async () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 334,
        height: 224,
        useContentSize: true,
        resizable: false,
        show: false,
        icon: path.join(__dirname, '../renderer/images/icons/icon.png'),
        backgroundColor: '#2f3640',
    });

    // and load the index.html of the app.
    mainWindow.loadURL(path.join(__dirname, '../renderer/index.html'));

    // Remove the menu bar (File, Edit, View, Window, Help).
    mainWindow.setMenu(null);

    // Open the DevTools.
    const isDevMode = process.execPath.match(/[\\/]electron/);

    if (isDevMode) {
        await installExtension(REACT_DEVELOPER_TOOLS);
        mainWindow.webContents.openDevTools();
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });

    mainWindow.on('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

app.on('quit', () => {
    // Cleanly disconnect from the Kraken device.
    if (kraken) {
        kraken.disconnect();
        kraken = null;
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// Set up the Kraken device.
try {
    kraken = new Kraken();

    kraken.on('data', (data) => {
        store.dispatch(updateResources({
            fanSpeed: { value: data.fanSpeed },
            pumpSpeed: { value: data.pumpSpeed },
            liquidTemp: { value: data.liquidTemp },
        }));
    });
    kraken.connect();

    // TODO: remember to unsubscribe when kraken disconnected
    store.subscribe(() => {
        const state = store.getState();

        kraken.pumpSetpoint = state.settings.pumpSetpoint;
        kraken.fanSetpoint = state.settings.fanSetpoint;
    });
} catch (e) {
    dialog.showErrorBox(e.name, e.message);
    app.quit();
}
