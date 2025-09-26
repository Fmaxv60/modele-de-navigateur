const { app, WebContentsView, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const si = require('systeminformation');

app.whenReady().then(() => {

  // BrowserWindow initiate the rendering of the angular toolbar
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: "Uniweb",
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.maximize();

  if (app.isPackaged){
    win.loadFile('dist/browser-template/browser/index.html');
  } else {
    win.loadURL('http://localhost:4200');
  }

  // WebContentsView initiate the rendering of a second view to browser the web
  const view = new WebContentsView();
  win.contentView.addChildView(view);

  // Always fit the web rendering with the electron windows
  function fitViewToWin() {
    const winSize = win.webContents.getOwnerBrowserWindow().getBounds();
    view.setBounds({ x: 0, y: 55, width: winSize.width, height: winSize.height });
  }

  win.on('resize', () => {
    fitViewToWin();
  });
  // Register events handling from the toolbar
  ipcMain.on('toogle-dev-tool', () => {
    if (win.webContents.isDevToolsOpened()) {
      win.webContents.closeDevTools();
    } else {
      win.webContents.openDevTools({ mode: 'detach' });
    }
  });

  view.webContents.on('did-navigate', () => {
    win.webContents.send('url-changed', view.webContents.getURL());
  });

  ipcMain.on('go-back', () => {
    view.webContents.navigationHistory.goBack();
  });

  ipcMain.handle('can-go-back', () => {
    return view.webContents.navigationHistory.canGoBack();
  });

  ipcMain.on('go-forward', () => {
    view.webContents.navigationHistory.goForward();
  });

  ipcMain.handle('can-go-forward', () => {
    return view.webContents.navigationHistory.canGoForward();
  });

  ipcMain.on('refresh', () => {
    view.webContents.reload();
  });

  ipcMain.handle('go-to-page', (event, url) => {
    return view.webContents.loadURL(url);
  });

  ipcMain.handle('current-url', () => {
    return view.webContents.getURL();
  });

  // Register events handling from the main windows
  win.once('ready-to-show', () => {
    fitViewToWin();
    view.webContents.loadURL('https://amiens.unilasalle.fr');
  });

  win.on('resized', () => {
    fitViewToWin();
  });


  // New feature
  setInterval(async () => {
    try {
      const memData = await si.mem();
      if (win) {
        win.webContents.send('memory-usage', {
          used: process.memoryUsage().rss,
          total: memData.total
        });
      }
    } catch (err) {
      console.error('Error getting memory info:', err);
    }
  }, 1000);

});
