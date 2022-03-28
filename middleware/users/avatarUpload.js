// dependencies
const uploader = require("../../utilities/singleUploader");

// avatar upload middleware function
function avatarUpload(req, res, next) {
  // uploader utilities call for get upload object
  const upload = uploader(
    "avatars",
    ["image/jpeg", "image/png", "image/jpg"],
    1000000,
    "Only .jpg, .jpeg, .png format are allowed!"
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
module.exports = avatarUpload;
