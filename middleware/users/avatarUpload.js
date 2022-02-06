function avatarUpload(req, res, next) {
  const upload = uploader(
    "avatar",
    ["images/jpeg", "images/png", "images/jpg"],
    1000000,
    "Only .jpg, .jpeg, .png format are allowed!"
  );
}

// exports module
module.exports = avatarUpload;
