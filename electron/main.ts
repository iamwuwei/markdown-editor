import path from 'node:path'
import { BrowserWindow, app, BrowserWindowConstructorOptions } from 'electron'

app.whenReady().then(() => {
  const isDev = process.env.NODE_ENV === 'development'

  const options: BrowserWindowConstructorOptions = {
    width: 800,
    height: 600,
    show: false, // Use 'ready-to-show' event to show window
    vibrancy: 'under-window',
    visualEffectState: 'active',
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
      devTools: isDev ? true : false,
    },
  }

  const mainWindow = new BrowserWindow(options)

  mainWindow.loadFile('dist/index.html')

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow?.isVisible()) {
      mainWindow?.show();
    }

    if (isDev) {
      mainWindow.webContents.openDevTools()
    }
  });
});

app.once('window-all-closed', () => app.quit())
