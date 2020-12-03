const db = require("../models");
const Wish = db.wish;

// Create and Save a new wish
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({message: "Content can not be empty!"});
        return;
    }

    // Create a wish
    const wish = new Wish({
        title: req.body.title,
        author: req.body.author,
    });

    // Save wish in the database
    wish
        .save(wish)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the wish."
            });
        });
};

// Retrieve all wishes from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {$regex: new RegExp(title), $options: "i"}} : {};

    Wish.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving wishes."
            });
        });
};

// Find a single wish with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Wish.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found wish with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving wish with id=" + id});
        });
};

// Update a wish by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Wish.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update wish with id=${id}. Maybe wish was not found!`
                });
            } else res.send({message: "Wish was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating wish with id=" + id
            });
        });
};

// Delete a wish with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Wish.findByIdAndRemove(id, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete wish with id=${id}. Maybe wish was not found!`
                });
            } else {
                res.send({
                    message: "Wish was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete wish with id=" + id
            });
        });
};

// Delete all wishes from the database.
exports.deleteAll = (req, res) => {
    Wish.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Wishes were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all wishes."
            });
        });
};