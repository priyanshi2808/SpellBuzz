const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require ("jsonwebtoken");
const config=require("../config/default.json")

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    avatar: {
        type: String,
    },
    bio: {
        type: String
    },
    Score: {
        type: Number,
        default: 0
    },
    age: {
        type: Number
    },
    school: {
        type: String,
    },
    tokens: [{
        token: {
            type : String,
            required : true
        }
    }],
    verificationValid: {
        type: Date,
    }
})


userSchema.methods.generateAuthToken = async function () {
    try{
        const token = jwt.sign({_id:this._id.toString()  }, config.jwtSecret);
        this.tokens = this.tokens.concat({token})
        await this.save();
       // console.log(token);
        return token;
    }catch(err)
    {
        console.log(err);
    }
} 
 
/* 
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.encryptPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

userSchema.methods.validPassword = function (password) {
  var encryptPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
  return this.encryptPassword === encryptPassword;
};
 */
module.exports = mongoose.model("User", userSchema);
