// server.js
const bonjour = require('bonjour')();
const { app }    = require('electron');
const os = require('os');
const interfaces = os.networkInterfaces();

const express = require('express');
const cookieParser = require('cookie-parser');

const serverApp = express();
const PORT = 80;

const path = require('path');
const engine = require('ejs-mate');


const documentsPath  = app.getPath('documents');
const uploadsPath    = path.join(documentsPath, 'SaparMini', 'uploads');

serverApp.use('/media', express.static(uploadsPath, {
  setHeaders(res, file) {
    // inline–отображение, а не attachment
    res.setHeader('Content-Disposition', 'inline');
  }
}));

serverApp.use(express.json());
serverApp.use(cookieParser());

const apiRouter = require('./backend/routes/api.js');
const userRouter = require("./backend/routes/auth.js");
const mainRouter = require("./backend/routes/main.js");

serverApp.use('/api', apiRouter);
serverApp.use("/auth-api",userRouter);
serverApp.use("", mainRouter);

serverApp.engine('ejs', engine);
serverApp.set('view engine', 'ejs');
serverApp.set('views', path.join(__dirname, 'views'));

const YEAR_IN_MS = 365 * 24 * 60 * 60 * 1000;

serverApp.use(
  express.static(path.join(__dirname, 'public'), {
    // Кэшировать 1 год (браузеры будут считать ресурс неизменным)
    maxAge: YEAR_IN_MS,
    immutable: true,
    // Отключаем условные запросы — клиент никогда не придёт «спросить» ETag/Last-Modified
    etag: false,
    lastModified: false,
    // На всякий случай, можно жестко задать заголовок:
    setHeaders: (res, filePath) => {
      res.setHeader('Cache-Control', `public, max-age=${YEAR_IN_MS/1000}, immutable`);
    }
  })
);

const localIp = Object.values(interfaces).flat().find(i => i.family === 'IPv4' && !i.internal)?.address;

serverApp.use((req, res, next) => {
  res.status(404).render('error-page',{status:404,title:"Страница не найдено",image:"/images/not-found.png"});
});

// Запускаем сервер
serverApp.listen(PORT, '0.0.0.0', () => {
    console.log(`Sapar доступен на http://${localIp}:${PORT}`);
});

bonjour.publish({
  name: 'Sapar Mini',
  type: 'http',
  port: PORT,
  host: 'sapar.local' || localIp
});