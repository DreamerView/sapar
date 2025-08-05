const { Router } = require('express');
const router = Router();

// MIddleWares
const authVerify = require("../middleware/authVerify");
const authSuccess = require("../middleware/authSuccess"); 

// Controllers
const AuthController = require("../controllers/AuthController");
const auth = new AuthController();

const FileSystemController = require("../controllers/FileSystemController");
const fs = new FileSystemController();

router.get('/',authVerify, fs.currentPath);
router.get("/fs-search", fs.searchPath);

router.get('/auth', authSuccess, auth.verify);

module.exports = router;