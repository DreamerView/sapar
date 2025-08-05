const { Router } = require('express');
const router = Router();

const AuthController = require("../controllers/AuthController");
const auth = new AuthController();

router.post('/login', auth.login);
router.post('/register', auth.register);
router.get("/logout",auth.logout);

module.exports = router;