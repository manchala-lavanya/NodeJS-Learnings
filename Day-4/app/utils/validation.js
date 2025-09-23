const { tutorials } = require("../models");
const { body } = require('express-validator');

//Validator to check for duplicate title
const checkDuplicateTitles = async (title) => {
    //To check if a tutorial with the same title already exists
    const existingTutorial = await tutorials.findOne({ 'title': title });
    if (existingTutorial) {
        throw new Error('Title already exists.');
    }
    return true; //validation passed
}

//Export validation rules for creating a tutorial
exports.createRecordValidator = [
    //Validate 'title' field
    body('title')
        .trim()
        .notEmpty()
        .withMessage("Title cannot be empty")
        .bail()
        .custom(checkDuplicateTitles),
    //Validate 'description' field
    body('description')
        .trim()
        .notEmpty()
        .withMessage("Decription cannot be empty"),
    //Validate 'published' field
    body('published')
        .trim()
        .notEmpty()
        .withMessage("Published cannot be empty")
];