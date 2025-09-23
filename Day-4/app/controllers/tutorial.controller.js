const db = require("../models");
const Tutorial = db.tutorials;
const { validationResult } = require("express-validator");

// Create a new tutorial
exports.create = async (request, response) => {
    try { // validate request body using express-validator
        const result = validationResult(request);
        //If validation fails, send the first error message
        if (result.isEmpty()) {
            // Create a new Tutorial object with request data
            const tutorial = new Tutorial({ 
                title: request.body.title, 
                description: request.body.description, 
                published: request.body.published ? request.body.published : false
            });

            // Save the tutorial in MongoDB
            const data = await tutorial.save(tutorial) 
            response.send(data);
        }
        else {
            //Send the saved document as response
            response.send({message : result.errors[0].msg}) 
        }
    } catch (error) {
        console.log("Error ", error); //Handle unexpected errors
    }
}

//Find all tutorials 
exports.findAll = (request, response) => {
    //Read "title" from query string
    const title = request.query.title;
    //If title is provided, use regex to filter, else return all
    const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    //Query database
    Tutorial.find(condition)
        .then(data => {
            response.send(data); //send tutorials back as response
        })
        .catch(err => {
            response.status(500).send({ //Handle DB errors
                message: err.message || "Error occurred while retrieving the Tutorials!"
            })
        })
};

//Find a single tutorial by ID
exports.findOne = (request, response) => {
    //Get tutorial ID from request params
    const id = request.params.id;

    Tutorial.findById(id) //Find tutorial in database by ID
        .then(data => {
            if (!data) { //If no tutorial found, return 404 
                response.status(404).send({ message: "Not found Tutorial with id: " + id })
            }
            else {
                response.send(data); //If found, send tutorial
            }
        })
        .catch(err => {
            response.status(500).send({ //Handle DB errors
                message: err.message || "Error retrieving Tutorial with id: " + id
            })
        })
}

//Update a tutorial by ID
exports.update = (request, response) => {
    //check if request body is empty
    if (!request.body) {
        return response.status(400).send({
            message: "Data to update cannot be empty."
        })
    }
    //Get ID from request params
    const id = request.params.id;

    //Find tutorial by ID and update with new data
    tutorials.findIdAndUpdate(id, request.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                //If no tutorial found with given id
                response.status(400).send({
                    message: "Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!"
                })
            }
            else { //If update successful
                response.send({ message: "Tutorial updated successfully." });
            }
        })
        .catch(err => { //Handle DB errors
            response.status(500).send({ message: "Error updating Tutorial with id: " + id })
        })

}

//Delete a tutorial by ID
exports.delete = (request, response) => {
    //Get ID from request params
    const id = request.params.id;
    
    //Find tutorial by ID and remove
    Tutorial.findIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) { //If no tutorial found with given id
                response.status(404).send({
                    message: "Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!"
                })
            }
            else {
                response.send({ //If deleted successful
                    message: "Tutorial with id=${id} deleted successfully."
                })
            }
        })
        .catch(err => {
            response.status(500).send({ //Handle DB errors
                message: "Error deleting Tutorial with id: " + id
            })
        })
}

//Delete all tutorials
exports.deleteAll = (request, response) => {
    //Delete all documents in the Tutorial collection
    Tutorial.deleteMany()
        .then(data => {
            if (!data) {
                //If no tutorials were deleted
                response.status(404).send({
                    message: "Cannot delete Tutorials!"
                })
            }
            else {
                response.send({ //If deleted successful
                    message: "All Tutorials deleted successfully."
                })
            }
        })
        .catch(err => {
            response.status(500).send({ //Handle DB errors
                message: "Error occured while deleting Tutorials!"
            })
        })
}

//Find all published tutorials
exports.findAllPublished = (request, response) => {
    //Query tutorials where published is true
    Tutorial.find({ published: true })
        .then(data => {
            response.send(data); //Send found tutorials in response
        })
        .catch(err => {
            response.status(500).send({ //Handle DB errors
                message:
                    err.message || "Some error occurred while retrieving Tutorials."
            });
        });
};