const router = require('express').Router();
const jwt = require('jsonwebtoken')
//var router = express.Router();
//const static_path = path.join(path.join(__dirname, "../../front_end"));
//app.use(express.static(static_path));
//app.use('/signup', Signup);
/*
const auth = async (req,res,next)=>{
     console.log('auth middleware');
    // next()
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        console.log(req.body)
       
        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}
/*
router.post(
    "/signup",
    [
     // check("name", "name should be at least 3 char").isLength({ min: 3 }),
     // check("email", "email is required").isEmail(),
     // body('password').isLength({
     //   min: 8,
     //   max: 20
     // }).withMessage('Password should be 8-20 characters long')
        
    ],
    signup
  );*/
//module.exports = auth;