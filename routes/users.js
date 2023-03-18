import mongoose from 'mongoose';
import express from 'express';
import passport from 'passport';
import * as utils from '../lib/utils.js';

const Router = express.Router();
const User = mongoose.model('User');

Router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
});

Router.post('/login', function(req, res, next) {
    User.findOne({ username: req.body.username })
        .then((user) => {
            if (!user) { return res.status(401).json({ success: false, msg: "could not find user" }); }
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
            if (isValid) {
                const tokenObject = utils.issueJWT(user);
                res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
            } else {
                res.status(401).json({ success: false, msg: "you entered the wrong password" });
            }
        })
        .catch((err) => {
            next(err);
        });
});

Router.post('/register', function(req, res, next){
    const saltHash = utils.genPassword(req.body.password);    
    const salt     = saltHash.salt;
    const hash     = saltHash.hash;
    const newUser  = new User({ username:req.body.username, hash:hash, salt:salt });

    try {
        newUser.save()
            .then((user) => {
                res.json({ success: true, user: user });
            });
    } catch (err) {
        res.json({ success: false, msg: err });
    }
});

export default Router;