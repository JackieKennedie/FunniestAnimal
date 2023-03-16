// cd /Users/stephenwhetstone/Desktop/~/wo/html:css/animal_leaderboard

const { response } = require("express");
const express = require("express");
const datastore = require("nedb");

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => console.log("🐻"));

app.use(express.static("public"));
app.use(express.json({limit: "1mb"}));

const database = new datastore("database.db");
database.loadDatabase();

//insertAnimal();

app.get("/api", (request, response) => {
    database.find({type:"animal"}, (err, data) => {
        response.json(data);
    });
});

app.put("/api", (request, response) => {
    let req = parseInt(request.body.user_score);
    let id = parseInt(request.body._id);

    database.findOne({_id: id}, {score: 1, votes: 1, total: 1}, (err, data) => {
        let total = parseInt(data.total) + req;
        let new_votes = parseInt(data.votes) + 1;
        let new_score = total / new_votes;
        
        database.update({_id: id}, {$set: {score: new_score, votes: new_votes, total: total}}, (err, data) => {
        });
    });
    //response.json("🐧");
});

database.persistence.setAutocompactionInterval(5000);

function insertAnimal() {
    const name = ["Horse", "Bear", "Monkey", "Penguin", "Turtle"];
    const image = ["🐴", "🐻", "🐵", "🐧", "🐢"];

    for(let i = 0; i < name.length; i++ ) {
        const doc = {
            type: "animal",
            image: image[i],
            name: name[i],
            score: 0,
            total: 0, 
            votes: 0,
            _id: i + 1,
        };
    
        database.insert(doc, (err, data)=>{});
    }
}