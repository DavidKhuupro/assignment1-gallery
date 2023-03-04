/* 
Lab - GitHub Cyclic
Pushed to Github and Connected to Cyclic
Please use following to test Cyclic URL

https://david-khuu-lab2.cyclic.app/
*/

const HTTP_PORT = process.env.PORT || 3000;

// use require to bring in necessary modules
const express = require("express");
const exphbs = require('express-handlebars');
const path = require("path");
const app = express();
const readline = require("linebyline");


// read each line of text in imagelist.txt and declare pokemon array
const rl = readline("./imagelist.txt");
let pokemon = [];

// push pokemon array as values for line
rl.on("line", (line, lineCount, byteCount) => {
    pokemon.push(path.parse(line).name);
})
.on("error", (err) => {
    console.error(err);
});


// connect .hbs in views folder
app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: false,
    layoutsDir: path.join(__dirname, "/views")
}));
app.set("view engine", ".hbs");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('./'));
app.use(express.static('public'));
app.use(express.static('images'));


// get values for browser side
app.get("/", (req, res) => {
    let someData = {
        collection : pokemon,
        choice : "Gotta catch them all"
    };

    res.render('content', {
    data: someData});
});


// post selected image/button or use default if unselected
app.post("/", (req, res) => {
    let inputData = req.body.rdoImage;
    if (inputData == undefined) {
        inputData = "Gotta catch them all"
    }
    let someData = {
        collection : pokemon,
        choice : inputData
    };

    res.render('content', {
    data: someData});
});


const server = app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`);
});