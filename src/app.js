const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

// Initialization
const app = express();

//Connect DB
mongoose.connect("mongodb://localhost:merkadito/landing", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected");
});

// Settings
app.set("port", process.env.PORT || 4000);
app.set("views", path.join(__dirname, "views"));


// Html templating setup
app.engine(
    ".hbs",
    exphbs({
        defaultLayout: "main",
        layoutsDir: path.join(app.get("views"), "layouts"),
        partialsDir: path.join(app.get("views"), "partials"),
        extname: ".hbs",
        helpers: require("./lib/handlebars.js"),
    })
);

// Html templating use
app.set("view engine", ".hbs");

// Midlewares

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Global variables
// none

// Public
app.use(express.static(path.join(__dirname, "public")));


// Routes
app.use(require("./routes/index.js"));

// Starting the server
app.listen(app.get("port"), () => {
    console.log("Server on port:", app.get("port"));
});
