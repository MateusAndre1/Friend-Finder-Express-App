//retrieve data from friend.js

var friends = require("../app/data/friend");

// import express app and make the array of objects in json format
module.exports = function (app) {
    app.get("/api/friends", function (req, red){
        res.json(friends);
    });
}

// main logic to post and make an algorythm to decide friends best match
app.post("/api/friends", function (req, res){

    let totalDiff = 0;

    let bestMatch = {
        name: "",
        photo: "",
        friendDiff: 1000
    };

})