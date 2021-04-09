const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
require("./config/conn");
//const authmiddleware = require("./middleware/auth");
const static_path = path.join(path.join(__dirname, "../../front_end"));
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



app.listen(port, () => {
    console.log(`server running at port no ${port}`);
});

module.exports = app;