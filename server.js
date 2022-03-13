const express = require("express");
const path = require("path");


let initial_path = path.join(__dirname, "public");

let app = express();
//use "express.static()" method to make "public" folder a static path
app.use(express.static(initial_path))

const dotenv = require('dotenv').config({ path: __dirname + '/.env' })



app.get("/", (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"))
})

app.get('/:id', (req, res) => {
    res.sendFile(path.join(initial_path, "about.html"));
})

app.use((req, res) => {
    res.json("This page is not found! | 404!");
})


app.listen(3000, () => {
    console.log("listening on port 3000...");
})