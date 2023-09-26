const router = require("express").Router();
const authorize = require("../middlewares/authorize");
const passport = require("passport");

//https://bohubrihi-e-com-backend-app.onrender.com/auth/google
router
    .route("/")
    .get(passport.authenticate("google", { scope: ["profile", "email"] }));

//https://bohubrihi-e-com-backend-app.onrender.com/auth/google/redirect
router
    .route("/redirect")
    .get(passport.authenticate("google", { session: false }), (req, res) => {
        console.log("This is the user: ", req.user);
        res.send(req.user);
    });

module.exports = router;
