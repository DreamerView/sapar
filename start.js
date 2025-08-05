const { app, BrowserWindow,dialog } = require('electron');
const http = require('http');
const path = require('path');

// 1. Запускаем сервер из app.js
require(path.join(__dirname, 'app.js'));

function waitForServer(url, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const check = () => {
      http.get(url, res => {
        if ([200, 404].includes(res.statusCode)) {
          resolve(); // сервер запущен
        } else {
          retry();
        }
      }).on('error', retry);
    };

    const retry = () => {
      if (Date.now() - start > timeout) {
        reject(new Error('Сервер не отвечает'));
      } else {
        setTimeout(check, 500);
      }
    };

    check();
  });
}

async function createWindow() {
  try {
    await waitForServer('http://localhost/auth');

    const win = new BrowserWindow({
      width: 1000,
      height: 700,
      minWidth: 420,   // 👈 Минимальная ширина
      minHeight: 400,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
      }
    });
    win.setMenu(null);
    win.loadURL('http://localhost');
    win.on('close', (e) => {
        const choice = dialog.showMessageBoxSync(win, {
            type: 'question',
            buttons: ['Нет', 'Да'],
            defaultId: 0,
            cancelId: 0,
            title: 'Выход',
            message: 'Вы действительно хотите закрыть приложение?',
        });

        if (choice === 0) {
            e.preventDefault(); // Отменить закрытие
        }
    });
    // win.webContents.openDevTools();
  } catch (err) {
    console.error('Ошибка запуска сервера:', err.message);
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
