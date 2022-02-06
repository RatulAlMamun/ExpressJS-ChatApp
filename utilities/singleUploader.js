const multer = require("multer");

function uploader(subfolderPath, allowedFileTypes, maxFileSize, errorMessage) {
  // file upload folder
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolderPath}`;

  // define the storage
  const storage = multer.diskStorage({});
  return upload;
}

// export module
module.exports = uploader;
