const FileSystemModel = require("../models/FileSystemModels");
const os = require('os');
const interfaces = os.networkInterfaces();
const localIp = Object.values(interfaces).flat().find(i => i.family === 'IPv4' && !i.internal)?.address;

class FileSystemController extends FileSystemModel {

    currentPath = async(req, res) => {
        const fsPath =  req.query.fs ? req.query.fs : '/';
        const render = await this.toPath(fsPath);
        const response = { 
            title: 'Sapar',
            list:render?.modifiedResult || [],
            name:render?.title || null, 
            typePath:render?.type || "file", 
            fileType:render?.fileType || {}, 
            fileContent:render?.fileContent || "",
            fileList:render?.fileList || [],
            fileInfo: render?.fileInfo || {},
            breadCrumbs:render?.breadCrumbs || []
        };
        res.render('index', response)
    }

    searchPath = async (req, res) => {
        const fsPath = req.query.fs || null;
        if (!fsPath) return res.json([]);

        const allMatches = await this.searchAll(fsPath);
        const limited = allMatches.slice(0, 10);
        return res.json(limited);
    };

    createFolder = async(req,res) => {
        try {
            const {name,url} = req.body;
            if(!name || !url) throw new Error("Поля не должны быть пустыми");
            const result = await this.createFolderHandler(name,url);
            return res.json(result);
        } catch(error) {
            return res.json({ status: false, msg: error?.message || "Что-то пошло не так" });
        }
    }

    handleUploadFile = async(req,res) => {
        const { base64Path, fileName, index, total } = req.body;

        const result = await this.handleChunkUpload({
            base64Path,
            fileName,
            index: parseInt(index),
            total: parseInt(total),
            buffer: req.file.buffer
        });

        res.json(result);
    }

    handleDelete = async(req,res) => {
        const { base64Path } = req.body;
        const result = await this.deleteEntry(base64Path);
        return res.json(result);
    }

    handleGetSubdirectory = async(req,res) => {
        try {
            const { fs } = req.query;
            const pathBase64 = fs || "/";
            const result = await this.getSubfolders(pathBase64);
            return res.json(result);
        } catch(error) {
            return res.status(500).json({status:false,error:error});
        }
    }

    handleMoveFile = async(req,res) => {
        try {
            const { base64Targets, base64Dest } = req.body;
            const result = await this.moveItems(base64Targets,base64Dest);
            return res.json(result);
        } catch(error) {
            return res.status(500).json({status:false,error:error});
        }
    }

    handleRenameItem = async(req,res) => {
        try {
            const { name, newName, path } = req.body;
            const result = await this.renameItem(name,newName,path);
            return res.json(result);
        } catch(error) {
            return res.status(500).json({status:false,error:error});
        }
    }

    handleHostConnection = async(req,res) => {
        res.json({host:"http://sapar.local",ip:`http://${localIp}`});
    }
    
}

module.exports = FileSystemController;