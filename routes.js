var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/login', function(req, res) {
    passport.authenticate('local', function(error, username){
        if(error) {
            return res.status(403).send(error);
        } else {
            req.logIn(username, function(error) {
                if(error) {
                    return res.status(500).send("Serialization error");
                } else {
                    return res.status(200).send("Welcome");
                }
            });
        }
    })(req, res);
});

router.post('/logout', function(req, res) {
    if(req.isAuthenticated()) {
        req.logout();
        return res.status(200).send("logout successful");
    }
    return res.status(403).send("log in first");
    

});

router.get('/proba', function(req, res) {
    if(req.isAuthenticated()) {
        return res.status(200).send("you are logged in");
    } else {
        return res.status(403).send("you have no access");
    }

})

module.exports = router;