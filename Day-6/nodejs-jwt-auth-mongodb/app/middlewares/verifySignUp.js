const User = require("../models/user.model");
const Role = require("../models/role.model");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    let user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).send({ message: "Username already exists!" });
    }

    user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({ message: "Email is already in use!" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!["user", "moderator", "admin"].includes(req.body.roles[i])) {
        return res.status(400).send({ message: "Role does not exist!" });
      }
    }
  }

  next();
};

module.exports = { checkDuplicateUsernameOrEmail, checkRolesExisted };
