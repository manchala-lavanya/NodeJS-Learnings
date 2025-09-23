//Import validation middleware
const { createRecordValidator } = require("../utils/validation.js"); 

module.exports = app => {
  //Import tutorial controller functions
  const tutorials = require("../controllers/tutorial.controller.js");
  //Import Express router
  const router = require("express").Router();


  //Create a new Tutorial with validation
  router.post("/", createRecordValidator, tutorials.create);

  // Create a new Tutorial
  router.post("/", tutorials.create);

  // Retrieve all Tutorials
  router.get("/", tutorials.findAll);

  // Retrieve all published Tutorials
  router.get("/published", tutorials.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", tutorials.findOne);

  // Update a Tutorial with id
  router.put("/:id", tutorials.update);

  // Delete a Tutorial with id
  router.delete("/:id", tutorials.delete);

  // Create a new Tutorial
  router.delete("/", tutorials.deleteAll);

  app.use("/api/tutorials", router);
};