const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const auth = require("../middleware/auth");
const User = require("../models/user");
const { check, validationResult } = require("express-validator");

router.get("/me", auth, async (req, res) => {
    console.log("PROFILE GET ");
    try {
        const user = await User.findOne(mongoose.Types.ObjectId(req.user.id)).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

// create or update user profile

//router.route('/signup').post(async (req, res) =>

router.post("/", auth, async (req, res) => {
    console.log("posting profile");
    const { bio, age, school,avatar } = req.body;
    //console.log(req.user);
    // build profile object
    const profileField = {};
    if (bio)
        profileField.bio = bio;
    if (age)
        profileField.age = age;
    if (school)
        profileField.school = school;
    if(avatar)
        profileField.avatar = avatar;

    try {
        let profile = await User.findOneAndUpdate({ _id : (req.user.id)}
                    , { $set: profileField }
                    , { new: true });

            console.log("updated");
            return res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})


// update score

router.post("/score", auth, async (req, res) => {
    console.log("posting profile");
    const { Score } = req.body;
    //console.log(req.user);
    // build profile object
    const profileField = {};
    if (Score)
    profileField.Score = Score;
    try {
        let profile = await User.findOneAndUpdate({ _id : (req.user.id)}
                    , { $set: profileField }
                    , { new: true });

            console.log("updated score");
            return res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})


// get all profile

router.get('/',auth, async (req, res) => {
    console.log("all profile ");
    //console.log(req.user);
    try {
        const user = await
            User.find().select('name avatar Score');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
})

// delete a user and profile
router.delete("/", auth, async (req, res) => {

    console.log("deleting user and profile");
    try {
        // remove user
        await User.findOneAndRemove( {_id : req.user.id});
        res.json({ msg: " user removed " });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})

module.exports = router;