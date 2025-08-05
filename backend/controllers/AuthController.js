const PasswordModels = require("../models/passwordModels");

class AuthController extends PasswordModels {

    login = async(req, res) => {
        try {
            const password = (req.body.password || '').trim();

            if (!password) return res.json({ success: false, msg: "Пароль не может быть пустым" });
            if (!this.isValid(password)) return res.json({ success: false, msg: "Разрешены только латинские буквы, цифры и спецсимволы без пробелов" })
            
            const verify = await this.compareCryptedPassword(password);
            this.setCookie(res);
            
            res.json({ success: verify });
        } catch (error) {
            console.log(error);
            res.json({ status: false, msg: error.message });
        }
    }
    
    register = async(req,res) => {
        try {
            const password = (req.body.password || '').trim();

            if (!password) return res.json({ success: false, msg: "Пароль не может быть пустым" });
            if (!this.isValid(password)) return res.json({ success: false, msg: "Разрешены только латинские буквы, цифры и спецсимволы без пробелов" })

            const status = await this.savePassword(password);
            this.setCookie(res);
            return res.json({ success: status });
        } catch (error) {
            console.log(error);
            return res.json({ success: false, msg: error.message });
        }
    }

    verify = async(req,res) => {
        try {
            const resultAuth = this.authVerification();
            return res.render('auth', { title: 'Sapar',authMode:resultAuth });
        } catch(error) {
            console.log(error);
            return res.json({success:false, msg: error.message});
        }
    }

    logout = (req,res) => {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        });

        res.redirect("/auth");
    }
}

module.exports = AuthController;