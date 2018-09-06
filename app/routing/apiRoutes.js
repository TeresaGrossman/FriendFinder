var friendsArray = require("../data/friends.js");

module.exports = function(app){
    app.get("/api/friends", function(req, res){
        res.json(friendsArray);
    })

    app.post("/api/friends", function(req, res){
        console.log(req.body);

        var newFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: req.body.scores.map(score => {
                return parseInt(score);
            })
        }

        var totalMatches = [];

        console.log("new friend after .map: ", newFriend)

        for(let i = 0; i < friendsArray.length; i++){
            var matchScore = [];

            for(let y = 0; y < newFriend.scores.length; y++){
                matchScore.push(Math.abs(newFriend.scores[y] - friendsArray[i].scores[y]));
            }

            totalMatches.push(matchScore);
        }

        console.log("totalMatches: ", totalMatches);

        var chosenFriendArray = [];

        for(let i = 0; i < totalMatches.length; i++){
            chosenFriendArray.push(totalMatches[i].reduce(function(accumulator, currentValue){
                return accumulator + currentValue
            }))
        }

        console.log("chosenFriendArray: ", chosenFriendArray);

        var matchedFriendIndex = Math.min.apply(null, chosenFriendArray);
        console.log("matchedFriendIndex: " + matchedFriendIndex);

        var friendsArrayIndex = chosenFriendArray.indexOf(matchedFriendIndex);

        var bestFriend = friendsArray[friendsArrayIndex];



        res.json(bestFriend);
    })
}