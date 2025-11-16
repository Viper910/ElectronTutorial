import { app, BrowserWindow } from 'electron';
import path from 'path';
import { isDevMode } from './utils.js';

app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({});
    
    if (isDevMode()) {
        mainWindow.loadURL('http://localhost:5123');
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react', 'index.html'));
    }
});