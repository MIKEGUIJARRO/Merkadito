const express = require("express");
const router = express.Router();
const Comment = require("../database/models/comments.js");

// Principles routes of my app
router.get("/", (req, res) => {
    res.render("index");
});

//Create
router.post("/commentary", function (req, res) {
    console.dir(req.body);
    const { name, phone, comment } = req.body.commentary;
    const newComment = {
        name: name,
        phone: phone,
        comment: comment,
    };
    Comment.create(newComment, function (error, comment) {
        if (error) {
            console.log('Error');
        } else {
            res.redirect("/");
        }
    });
});

module.exports = router;
