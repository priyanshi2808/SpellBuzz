const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');
require("./config/conn");
const authmiddleware = require("./middleware/auth");
const static_path = path.join(path.join(__dirname, "../frontend"));
const mongoose = require('mongoose');
//**************************  routes **************************/
const SignRoutes = require('./routes/auth')
const auth = require("./routes/auth");
const ProfileRoute = require("./routes/profile");
const cookieParser = require("cookie-parser");

mongoose.set('useFindAndModify', false);


app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.static(static_path));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// *****************************ROUTES*************************************************
//app.use('/signup', SignRoutes);
app.use("/api", auth);
app.use("/profile", ProfileRoute);


// set view endine
app.set("view engine", "hbs");
const temp_path = path.join(path.join(__dirname, "../frontend/templates/views"));
app.set("views",temp_path);
const partials = path.join(path.join(__dirname, "../frontend/templates/partials"));
hbs.registerPartials(partials);
//console.log(path.join(__dirname, "../frontend/templates/views"));
// root set
app.get("/", (req,res)=>{
    res.render("login");
})

app.get('/index',(req,res)=>{
    res.render("index");
} )
app.get("/signup", (req, res) => {
    res.render("signup");
})
app.get("/login", (req, res) => {
  res.render("login");
})
/* app.get("/myProfile",authmiddleware,(req,res)=>{
    res.render("MyProfile",{
        user : req.user}
    )
}) */
/* app.get("/allProfile",authmiddleware,(req,res)=>{
    res.render("allProfiles",{
        user : req.user
    }) */


app.listen(port, () => {
    console.log(`server running at port no ${port}`);
});

module.exports = app;