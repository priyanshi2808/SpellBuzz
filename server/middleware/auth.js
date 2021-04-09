const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../config/default.json')
const auth = async (req,res,next)=>{
    // console.log('auth middleware')
    // next()
    try {
        // const token = req.header('Authorization').replace('Bearer ', '')
        const token = req.cookies.jwt
        console.log('Toke',token)
        if(token === undefined){
            console.log('Executing')
            next()}
        else{
       // console.log('TOken',token)
        const decoded = jwt.verify(token, config.jwtSecret)
      //  console.log('DECO',decoded)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log('User',user)
      //  console.log('USER',user)
     //   console.log(user)
       //console.log("AUTH JS FILE")
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()}
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth