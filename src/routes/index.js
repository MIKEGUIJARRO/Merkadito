const express = require("express");
const router = express.Router();
const Comment = require("../database/models/comments.js");

// Principles routes of my app
router.get("/", (req, res) => {
    res.render("index", { index: true });
});

//Create Commentary
router.post("/commentary", function (req, res) {
    console.dir(req.body);
    const { name, phone, comment } = req.body;

    const newComment = {
        name: name,
        phone: phone,
        comment: comment,
    };

    Comment.create(newComment, function (error, comment) {
        if (error) {
            console.log("Error");
            res.statusCode = 404;
        } else {
            console.log("New comment");
            res.json({code: 200, data: "Comentario guardado exitosamente"})
        }
    });
});

//Login
router.get("/admin", (req, res) => {
    res.render("admin");
});

router.post("/admin", function (req, res) {
    const { id, password } = req.body.admin;
    if (id === "a01612042MikeGuijarro" && password === "Ransomware500*") {
        res.redirect("/dashboard");
    } else {
        res.redirect("/admin");
    }
});

//Dashboard
router.get("/dashboard", (req, res) => {
    res.render("dashboard");
});
module.exports = router;
