const express = require("express");
const fs = require("fs");

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer(handleRequest);

server.listen(PORT, function(){
    console.log("http://localhost:" + PORT);
});

function handleRequest(req, res){
    const path = req.url;
    fs.readFile(__dirname + "/index.html", function(err, data) {
        if (err) throw err;
});
}
// I am creating the routes
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "notes.html"));
});

//.post posts the data
//.delete deletes data
//.get gets data 
// update file