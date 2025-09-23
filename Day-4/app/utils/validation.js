const { tutorials } = require("../models")

exports.checkDuplicateTitles = (title) => {
    return tutorials.find({'title': title})   
}