// dependencies
const bcrypt = require("bcrypt");
const User = require("../models/People");

// users template rendering
function getUsers(req, res) {
  res.render("users");
}

// add user controller
async function addUser(req, res) {
  let newUser;
  // password hashing
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  // check if file uploaded
  if (req.files && req.files.length > 0) {
    // user object with avatar file
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    // user object without avatar file
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  // save user or send error
  try {
    const result = newUser.save();
    res.status(200).json({ message: "User added successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ errors: { common: { msg: "Unknown error occured." } } });
  }
}

// exports module
module.exports = { getUsers, addUser };
