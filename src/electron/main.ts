import { app, BrowserWindow } from 'electron';
import path from 'path';

app.whenReady().then(() => {
    const mainWindow = new BrowserWindow({});
    mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react', 'index.html'));
});