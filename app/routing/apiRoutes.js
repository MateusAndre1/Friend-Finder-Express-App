//retrieve data from friend.js

var friends = require("../data/friends");

// import express app and make the array of objects in json format
module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });

    // main logic to post and make an algorythm to decide friends best match
    app.post("/api/friends", function (req, res) {

        let totalDiff = 0;

        let bestMatch = {
            name: "",
            photo: "",
            friendDiff: 1000
        };

        let matchData = req.body;
        let matchName = matchData.name;
        let matchScores = matchData.scores;

        let b = matchScores.map(function (item) {
            return parseInt(item, 10);
        });

        matchData = {
            name: req.body.name,
            photo: req.body.photo,
            scores: b
        };

        console.log(`name: ${matchName}\nMatch Score: ${matchScores}\n`);

        let total = b.reduce((a, b) => a + b, 0);

        console.log(`Sum of match score: ${total}\nBest Match diff ${bestMatch.friendDiff}\n`);



        for (let i = 0; i < friends.length; i++) {

            totalDiff = 0;
            let friendScore = friends[i].scores.reduce((a, b) => a + b, 0)
            totalDiff += Math.abs(total - friendScore);

            if (totalDiff <= bestMatch.friendDiff) {
                bestMatch.name = friends[i].name;
                bestMatch.photo = friends[i].photo;
                bestMatch.friendDiff = totalDiff;
            }
        }

        console.log(`Total Difference: ${totalDiff}`);

        friends.push(matchData);
        res.json(bestMatch);

    })
}