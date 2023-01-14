import path from 'node:path';
import { BrowserWindow, app } from 'electron';

app.whenReady().then(() => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
    },
  });

  mainWindow.loadFile('dist/index.html');
  mainWindow.webContents.openDevTools();
});

app.once('window-all-closed', () => app.quit());
