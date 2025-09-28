const { userNameEmailValidator, userNamePasswordValidator } = require("../utils/validation.js");
const controller = require("../controllers/auth.controller.js");

module.exports = app => {
  const router = require("express").Router();

  // Middleware to set CORS headers (fixing typo and using res.header)
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post("/signup", userNameEmailValidator, controller.signup);
  router.post("/signin", userNamePasswordValidator, controller.signin);

  app.use("/api/auth", router);
  
};
