var friendsData = require("../data/friends.js")

module.exports = function (app) {

    app.get('/api/friends', function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function (req, res) {
        
        var userInput = req.body;

        var bestMatch = {
            bestMatchName: "",
            bestMatchPhoto: "",
            matchScore: 50
        }

        var scoreDiff = 0;

        for (var i = 0; i < friendsData.length; i++) {
            scoreDiff = 0
            for (var h = 0; h < 10; i++) {
                var friendScore = friendsData[i].scores[h];
                var userScore = userInput[0].scores[h];
                scoreDiff = scoreDiff + Math.abs(parseInt(friendScore) - parseInt(userScore));
            }

            if (scoreDiff < bestMatch.matchScore) {
                bestMatch.bestMatchName = friendsData[i].name;
                bestMatch.bestMatchPhoto = friendsData[i].photo;
                bestMatch.matchScore = scoreDiff;
            }
        };

        friendsData.push(req.body);
        res.json(bestMatch);
    });

};