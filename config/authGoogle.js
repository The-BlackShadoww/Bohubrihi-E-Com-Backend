const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const { User } = require("../models/user");
const _ = require("lodash");

const strategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
            "http://bohubrihi-e-com-backend-app.onrender.com/auth/google/redirect",
    },
    async (accessToken, refreshToken, profile, cb) => {
        console.log("profile: ", profile);
        console.log("This is cb of Strategy");
    }
);

passport.use(strategy);
