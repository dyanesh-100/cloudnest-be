const multer = require('multer')
const { request } = require('express')
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {fileSize: 3 * 1024 * 1024 * 1024},
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            
            'image/jpeg', 
            'image/png', 
            'image/gif', 
            'image/bmp', 
            'image/svg+xml', 
            'image/webp', 

            'video/mp4', 
            'video/mkv', 
            'video/avi', 
            'video/mov', 
            'video/x-msvideo', 
            'video/x-flv', 

            'audio/mp3', 
            'audio/wav', 
            'audio/aac', 
            'audio/m4a', 
            'audio/ogg', 
            'audio/wma', 

            'application/pdf', 
            'application/msword', 
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
            'application/vnd.ms-excel', 
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
            'application/vnd.ms-powerpoint', 
            'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
            'text/plain', 
            'text/csv', 

            
            'application/zip', 
            'application/x-rar-compressed', 
            'application/gzip', 
            'application/x-7z-compressed', 

            
            'application/octet-stream', // General binary data
            'application/x-www-form-urlencoded' // Form data
        ];
 
        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
}).single('file')


module.exports = upload