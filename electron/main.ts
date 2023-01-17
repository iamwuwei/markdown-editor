import path from 'node:path'
import { BrowserWindow, app, BrowserWindowConstructorOptions } from 'electron'

app.whenReady().then(() => {
  const isDev = process.env.NODE_ENV === 'development'

  const options: BrowserWindowConstructorOptions = {
    width: 800,
    height: 600,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    webPreferences: {
      preload: path.resolve(__dirname, 'preload.js'),
      devTools: isDev ? true : false,
    },
  }

  const mainWindow = new BrowserWindow(options)

  mainWindow.loadFile('dist/index.html')

  if (isDev) {
    mainWindow.webContents.openDevTools()
  }
});

app.once('window-all-closed', () => app.quit())
