const db = require("../models");
const Tutorial = db.tutorials;
const { validationResult } = require("express-validator");

exports.create = async (req, res) => {
    try {
        const result = validationResult(req);

        if (result.isEmpty()) {
            const tutorial = new Tutorial({
                title: req.body.title,
                description: req.body.description,
                published: req.body.published ? req.body.published : false
            });

            const data = await tutorial.save(tutorial)
            res.send(data);
        }
        else {
            res.send({message : result.errors[0].msg})
        }
    } catch (error) {
        console.log("Error ", error);
    }
}

exports.findAll = (req, res) => {
    const title = req.query.title;
    const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Tutorial.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retriving Tutorials"
            })
        })
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Not found Tutorial with id: " + id })
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error retriving Tutorial with id: " + id
            })
        })
}

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update cannot be empty"
        })
    }
    const id = req.params.id;

    tutorials.findIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(400).send({
                    message: "Cannot update tutorial with id=${id}. May be Tutorial was not found."
                })
            }
            else {
                res.send({ message: "Tutorial updated successfully" });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error updating Tutorial with id " + id })
        })

}

exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.findIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot delete Tutorial wiht id=${id}. Maybe Tutorial is not found"
                })
            }
            else {
                res.send({
                    message: "Tutorial with id=${id} deleted succesfully"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error cannot delete Tutorial with id " + id
            })
        })
}

exports.deleteAll = (req, res) => {

    Tutorial.deleteMany()
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot delete Tutorials"
                })
            }
            else {
                res.send({
                    message: "Tutorials deleted succesfully"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error cannot delete Tutorials"
            })
        })
}

exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};