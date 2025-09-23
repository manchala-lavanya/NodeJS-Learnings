const { tutorials } = require("../models");
const { body } = require('express-validator');

const checkDuplicateTitles = async (title) => {
    const existingTutorial = await tutorials.findOne({ 'title': title });
    if (existingTutorial) {
        throw new Error('Title already exists.');
    }
    return true;
}
exports.createRecordValidator = [
    body('title').trim().notEmpty().withMessage("Title cannot be empty").bail().custom(checkDuplicateTitles),
    body('description').trim().notEmpty().withMessage("Decription cannot be empty"),
    body('published').trim().notEmpty().withMessage("Published cannot be empty")
]