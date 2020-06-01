const express = require("express");
const fs = require("fs");
const path= require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function (req, res) {
    res.sendFile("notes.html",{root: path.join(__dirname,"../public")});
})

app.get("/api/notes", function(req, res){
    readFile("../db/db.json", function(err, data){
        const jsData= JSON.parse(data);
        res.json(jsData);
    })
})

app.post("/api/notes", function (req, res) {
    const notes = req.body;
    const random = Math.ceiling(Math.random() * 1000);
    notes.id = random;

    fs.readFile("../db/db.json", function (err, data) {
        if (err) throw err;
        const newNotes = JSON.parse(data);
        newNotes.push(notes);

        fs.writeFile("../db.db.json", JSON.stringify(newNotes), function (err) {
            if (err) throw err;
        })
    })
    res.json(notes);
})

app.delete("/api/notes/:id", function (req, res) {
    randomId = req.params.id;

    fs.readFile("../db/db.json"), function (err, data) {
        if (err) throw err;
        const deletedNotes = JSON.parse(data);
        const index = deletedNotes.findIndex(function (i) {
            return i.id === parseInt(randomId);
        })
        if (index != -1) deletedNotes.splice(index, 1);

        fs.writeFile("../db/db.json", JSON.stringify(deletedNotes), function (err) {
            if (err) throw err;
        })

        res.json(deletedNotes);
    }
})

app.get("*", function (req, res) {
    res.sendFile(path.join("index.html", { root: path.join(__dirname, "../public")}));
})

app.listen(PORT, function () {
     console.log("http://localhost: " + PORT);
})
