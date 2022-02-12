// dependencies
const bcrypt = require("bcrypt");
const path = require("path");
const User = require("../models/People");

// users template rendering
async function getUsers(req, res, next) {
  try {
    // fetch all users
    const users = await User.find();

    // render template with user data
    res.render("users", {
      users: users,
    });
  } catch (error) {
    next(error);
  }
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

// remove user controller
async function removeUser(req, res, next) {
  try {
    // fetch the user by id and delete
    const user = await User.findByIdAndDelete({
      _id: req.params.id
    });

    // remove the user avatar if any
    if (user.avatar) {
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    } 

    res.status(200).json({
      message: "User remove successfully."
    });
  } catch (error) {
    res
      .status(500)
      .json({ errors: { common: { msg: "Could not delete the user." } } });
  }
}

// exports module
module.exports = { getUsers, addUser, removeUser };
