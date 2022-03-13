const express = require("express");
const path = require("path");

let initial_path = path.join(__dirname, "public");

let app = express();
//use "express.static()" method to make "public" folder a static path
app.use(express.static(initial_path))

app.get("/", (req, res) => {
    res.sendFile(path.join(initial_path, "index.html"))
})

app.listen(3000, () => {
    console.log("listening on port 3000...");
})