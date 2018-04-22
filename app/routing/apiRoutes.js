var friendsData = require("../data/friends.js")

module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {
        
        var userInput = req.body;
        var userScores = userInput.scores;

        var bestMatch = {
            bestMatchName: "",
            bestMatchPhoto: "",
            matchScore: 50
        }

        var scoreDiff = 0;

        for (var i = 0; i < friendsData.length; i++) {
            scoreDiff = 0
            for (var h = 0; h < 10; h++) {
                scoreDiff = scoreDiff + Math.abs(parseInt(friendsData[i].scores[h]) - parseInt(userScores[h]));
            }

            if (scoreDiff < bestMatch.matchScore) {
                bestMatch.bestMatchName = friendsData[i].name;
                bestMatch.bestMatchPhoto = friendsData[i].photo;
                bestMatch.matchScore = scoreDiff;
            }
        };

        friendsData.push(userInput);
        res.json(bestMatch);
    });

};