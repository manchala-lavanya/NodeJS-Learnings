const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//For registering the user
exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const userData = req.body;

    // Create user object
    const user = new User({
      username: userData.username, // be consistent with your schema fields (was userName vs username)
      email: userData.email,
      password: bcrypt.hashSync(userData.password, 8),
    });

    if (userData.roles && userData.roles.length > 0) {
      // Find roles by name and assign their ObjectIds to user.roles
      const roles = await Role.find({ name: { $in: userData.roles } });
      if (roles.length === 0) {
        return res.status(400).send({ message: "Specified roles not found" });
      }
      user.roles = roles.map(role => role._id);
    } else {
      // Assign default role "user"
      const userRole = await Role.findOne({ name: "user" });
      user.roles = [userRole._id];
    }

    await user.save();
    res.status(201).send({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error in registering user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

//For logging the user
exports.signin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // Find user by username and populate roles
    const user = await User.findOne({ username }).populate("roles", "-__v");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Compare password
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({ accessToken: null, message: "Invalid password" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    // Format roles for response
    const authorities = user.roles.map(role => "ROLE_" + role.name.toUpperCase());

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token,
    });
  } catch (error) {
    console.error("Error in signin:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};
