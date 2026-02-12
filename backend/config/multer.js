// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// // Ensure uploads directory exists
// const uploadDir = 'uploads';
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadDir);
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//         cb(null, true);
//     } else {
//         cb(new Error('Only PDF files are allowed'), false);
//     }
// };

// const upload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
// });

// module.exports = upload;




// --------------------------------------------------------------------------------------


// const multer = require('multer');
// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// require('dotenv').config();

// // Configure Cloudinary with your credentials from .env
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'ai_learning_assistant', // Cloudinary folder name
//     format: async (req, file) => 'pdf', 
//     public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`,
//     resource_type: 'raw' // Required for PDF files in Cloudinary
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'application/pdf') {
//     cb(null, true);
//   } else {
//     cb(new Error('Only PDF files are allowed'), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
// });

// module.exports = { upload, cloudinary };








const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
require('dotenv').config();

// 1. Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// 2. Setup Memory Storage
// We use memoryStorage so req.file.buffer becomes available
const storage = multer.memoryStorage();

// 3. File Filter to ensure only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

// 4. Export the middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

module.exports = { upload, cloudinary };