const express = require('express')
const router = express.Router();
const User = require("../models/user");
const path = require("path");
const bcrypt = require("bcryptjs");
const gravatar=require("gravatar");
const jwt=require('jsonwebtoken');
const auth = require("../middleware/auth");
const cookie = require('cookie');
const cookieParser = require('cookie-parser');
const { check, validationResult, body } = require("express-validator");
const config = require('../config/default.json');



router.get("/signup", (req, res) => {
    //console.log("get signup");
    res.sendFile(path.join(__dirname, '../../../front_end/src', 'signup.html'));
})

router.post("/login",[
  check('email', 'Please input valid email').isEmail(),

  check('password', "password is required").exists()

],async (req, res) => {
  console.log("POST REQUEST LOGIN");

  //validate
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).send("enter valid details");
      }

  const { email, name, password } = req.body;
  try {
    let user = await User.findOne({ email });
    const salt = await bcrypt.genSalt(10);

    if (!user) {
      return res
        .status(400).send("invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400).send("invalid Credentials");
    }


   /*  const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload,
      config.jwtSecret,
      { expiresIn: 36000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }); */

      const token = await user.generateAuthToken();
      res.cookie("jwt" , token, {
        expires: new Date(Date.now()+300000000),
        httpOnly:true
      });

      //res.json(token);
      res.redirect("../index");
      console.log(res.cookie.toString());
      await user.save();

  } catch (error) {
    console.log("catch");
    console.log(error);
    res.status(400).send(error);
  }
});
router.post('/signup',[
    check('name', 'Name is required').not().isEmpty(),

    check('email', 'Please input valid email').isEmail(),

    body('password').isLength({
        min: 8,
        max: 20
      }).withMessage('Password should be 8-20 characters long')
        
  ],async (req, res) => {
    console.log("POST REQUEST");
    
    //validate
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          console.log(errors);
          return res.status(400).json("enter valid details");
        }
     /*    if ((req.body.confirmPassword === req.body.password)) {
            return  res.status(400).send("password must match!");
        } */
    try {
        const { email, name, password } = req.body;
        let user = await User.findOne({ email });
        const salt = await  bcrypt.genSalt(10);
  
        if (user) {
            return res
              .status(400).send("uesr already exists!");
          }
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });
        
        user = new User({
            name,
            email,
            password,
            avatar
          });
          user.password = await bcrypt.hash(password, salt);

          const token = await user.generateAuthToken();
          res.cookie("jwt" , token, {
            expires: new Date(Date.now()+300000000),
            httpOnly:true
          });

          //res.json(token);
         // console.log(cookie);
          await user.save();
          //res.send(user);
 
          /* const  payload = {
            user: {
              id: user.id,
              verified: false,
            },
          };

          jwt.sign(payload, 
            config.jwtSecret, 
            { expiresIn: 36000 },
            (err, token) => {
            if (err) throw err;
            res.json({ token });
          }); */
          res.redirect("../index");

    } catch (error) {
        console.log("catch");
        console.log(error);
        res.status(400).send(error); 
    }
});


router.post('/logout',auth, async (req, res) => {
    try {
        console.log('LOGOUT',req.cookies.jwt)
        req.user.tokens = req.user.tokens.filter((token) => {
            res.clearCookie('jwt')
            return token.token !== req.token
        })
        
        await req.user.save()
        //res.redirect('/')
        //res.json("logged out");
        res.redirect('/');
    } catch (e) {
        res.redirect('/')
        res.status(500).send()
    }
})


module.exports = router;