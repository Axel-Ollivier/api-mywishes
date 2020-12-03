module.exports = app => {
    const wish = require("../controllers/wish.controller.js");
    const { authJwt } = require("../middlewares");

    var router = require("express").Router();

    // Create a new post
    router.post("/",[authJwt.verifyToken] ,wish.create);

    // Retrieve all posts
    router.get("/",wish.findAll);

    // Retrieve a single post with id
    router.get("/:id",[authJwt.verifyToken], wish.findOne);

    // Update a post with id
    router.put("/:id",[authJwt.verifyToken], wish.update);

    // Delete a post with id
    router.delete("/:id",[authJwt.verifyToken], wish.delete);

    // Delete a post
    router.delete("/",[authJwt.verifyToken], wish.deleteAll);

    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use("/api/wish", router);
};
