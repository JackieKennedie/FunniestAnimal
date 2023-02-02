// cd /Users/stephenwhetstone/Desktop/~/wo/html:css/animal_leaderboard

const express = require("express");
const datastore = require("nedb");

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => console.log("🐻"));

app.use(express.static("public"));
app.use(express.json({limit: "1mb"}));

const database = new datastore("database.db");
database.loadDatabase();


app.get("/api", (request, response) => {
    database.find({type:"animal"}, (err, data) => {
        response.json(data);
    });
});

app.post("/api", (request, response) => {
    console.log(".");
});


