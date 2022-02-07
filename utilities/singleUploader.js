// dependencies
const path = require("path");
const multer = require("multer");
const createError = require("http-errors");

// uploader function
function uploader(subfolderPath, allowedFileTypes, maxFileSize, errorMessage) {
  // file upload folder
  const UPLOADS_FOLDER = `${__dirname}/../public/uploads/${subfolderPath}`;

  // define the storage
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOADS_FOLDER);
    },
    filename: function (req, file, cb) {
      // get the file extension
      const fileExt = path.extname(file.originalname);
      // get the file name
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();

      cb(null, fileName + fileExt);
    },
  });

  // prepare the final multer upload object
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: maxFileSize,
    },
    fileFilter: (req, file, cb) => {
      // check if file exists in allowedFileTypes array
      if (allowedFileTypes.include(file.mimetype)) {
        cb(null, true);
      } else {
        cb(createError(errorMessage));
      }
    },
  });
  return upload;
}

// export module
module.exports = uploader;
