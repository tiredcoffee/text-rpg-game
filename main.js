// Modules to control application life and create native browser window
const electron = require('electron')
const {app, BrowserWindow, Menu} = require('electron')
const fs = require('fs')
const path = require('path')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let devtools

if (process.platform === 'darwin') {
  let template = [{
    label: 'FromScratch',
    submenu: [{
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click: () => {
        app.quit();
      }
    }]
  }, {
    label: 'Edit',
    submenu: [{
      label: 'Undo',
      accelerator: 'CmdOrCtrl+Z',
      selector: 'undo:'
    }, {
      label: 'Redo',
      accelerator: 'Shift+CmdOrCtrl+Z',
      selector: 'redo:'
    }, {
      type: 'separator'
    }, {
      label: 'Cut',
      accelerator: 'CmdOrCtrl+X',
      selector: 'cut:'
    }, {
      label: 'Copy',
      accelerator: 'CmdOrCtrl+C',
      selector: 'copy:'
    }, {
      label: 'Paste',
      accelerator: 'CmdOrCtrl+V',
      selector: 'paste:'
    }, {
      label: 'Select All',
      accelerator: 'CmdOrCtrl+A',
      selector: 'selectAll:'
    }]
  }]

  let osxMenu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(osxMenu);
}

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    frame: false,
    icon: 'assets/media/icons/Icon_64x64.png'
  })
  mainWindow.setMenu(null)

  devtools = new BrowserWindow({
    show: false
  })

  mainWindow.webContents.setDevToolsWebContents(devtools.webContents)
  mainWindow.webContents.openDevTools({ mode: 'detach' })

  mainWindow.once('ready-to-show', function () {
    devtools.show()
    mainWindow.maximize()
    mainWindow.show()
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    devtools.close()
    mainWindow = null
  })
  devtools.on('closed', function () {
    devtools = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
