// dependecies
const uploader = require("../../utilities/multipleUploader");

// attchment uploader makeMiddleware
function attachmentUpload(req, res, next) {
  const upload = up;
  loader(
    "attachments",
    ["image/jpeg", "image/jpg", "image/png"],
    1000000,
    2,
    "Only .jpg, jpeg or .png format allowed!"
  );

  // call the middleware function
  upload.any()(req, res, (err) => {
    if (err) {
      res.status(500).json({
        errors: {
          avatar: {
            msg: err.message,
          },
        },
      });
    } else {
      next();
    }
  });
}

// exports module
module.exports = attachmentUpload;
