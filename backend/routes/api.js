// routes.js (CommonJS)

const { Router } = require('express');

const multer = require('multer');
const storage = multer({ storage: multer.memoryStorage() });
const upload = storage;

const router = Router();

const FileSystemController = require("../controllers/FileSystemController");
const fs = new FileSystemController(); 


router.get("/get-host",fs.handleHostConnection);
router.get("/current-path",fs.currentPath);
router.post("/create-folder",fs.createFolder);
router.post('/upload-chunk', upload.single('chunk'), fs.handleUploadFile);
router.delete('/delete-fs', fs.handleDelete);
router.get("/get-sub-directory", fs.handleGetSubdirectory);
router.put("/move-fs", fs.handleMoveFile);
router.patch("/rename-fs", fs.handleRenameItem);

module.exports = router;
