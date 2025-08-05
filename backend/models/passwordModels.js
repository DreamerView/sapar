const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const {app} = require('electron');

class PasswordModel {
    constructor() {
        const projectName = "SaparMini";
        const documentPath = app.getPath('documents');
        const docPath = path.posix.normalize(documentPath.replace(/\\/g, '/'));
        this.projectPath = `${docPath}/${projectName}`; 
        this.passwordPath = `${this.projectPath}/password.txt`;
    }

    // Проверка допустимых символов
    isValid(password) {
        const allowed = /^[\x21-\x7E]+$/; // Только английские символы, цифры и спецсимволы (без пробелов и кириллицы)
        return allowed.test(password);
    }

    initProject (hashedPassword) {
        !fs.existsSync(this.projectPath) && fs.mkdirSync(this.projectPath);
        !fs.existsSync(this.passwordPath) && fs.writeFileSync(this.passwordPath,hashedPassword);
        return true;
    }

    // Сохраняет захешированный пароль
    async savePassword(password) {
        if (!this.isValid(password)) throw new Error('Недопустимый пароль');
        const hash = await bcrypt.hash(password, 10);
        const status = this.initProject(hash);
        return status;
    }

    async compareCryptedPassword(password) {
        if(!this.isValid(password)) throw new Error("Недопустимый пароль");
        if(!fs.existsSync(this.passwordPath)) throw new Error("Пароля нету в базе данных");
        const content = fs.readFileSync(this.passwordPath,'utf8');
        const verify = await bcrypt.compare(password,content);
        if(!verify) throw new Error("Пароли не совпадают");
        return verify;
    }

    setCookie = (res) => {
         res.cookie('token', 'sapar123', {
            httpOnly: true,     // защищает от доступа через JS
            secure: false,      // true — только по HTTPS
            maxAge: 86400000,   // время жизни куки (1 день)
            sameSite: 'strict'  // запрет межсайтовых запросов
        });
    }

    authVerification = () => {
        const verify = fs.existsSync(this.passwordPath) ? "auth" : "register";
        return verify;
    };

    getCookie = (req) => {
        const token = req.cookies.token;
        return token;
    }

    // Проверка наличия файла пароля
    isRegistered() {
        return fs.existsSync(this.passwordPath);
    }
}

module.exports = PasswordModel;
