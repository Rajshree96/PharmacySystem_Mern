import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check file type
function checkFileType(file, cb) {
    // Allowed file types
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 6 * 1024 * 1024 }, // Limit file size to 1MB
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('businessLogo'); // 'businessLogo' is the field name for the file

export default upload;
