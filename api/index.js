//импортируем установленные пакеты
var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING =
  "mongodb+srv://babinigor:Thunder.5@notes.peze1yc.mongodb.net/?retryWrites=true&w=majority&appName=Notes";

var DATABASENAME = "notesdb";
var database;

app.listen(5038, () => {
  Mongoclient.connect(CONNECTION_STRING, (err, client) => {
    database = client.db(DATABASENAME);
    console.log("Connected to database");
  });
});

app.get("/api/notes/GetNotes", (request, response) => {
  database
    .collection("notescollection")
    .find({})
    .toArray((err, result) => {
      response.send(result);
    });
});

app.post("/api/notes/AddNotes", multer().none(), (request, response) => {
  database.collection("notescollection").count({}, function (err, numOfDocs) {
    database.collection("notescollection").insertOne({
      id: (numOfDocs + 1).toString(),
      description: request.body.newNotes,
    });
    response.json("success");
  });
});

app.delete("/api/notes/DeleteNotes", (request, response) => {
  database.collection("notescollection").deleteOne({
    id: request.query.id,
  });
  response.json("deleted");
});
