const MeduUser = require('../models/MeducomUser');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

const router = require('express').Router();

//UPDATE USER
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if(req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }

    try {
        const updatedUser = await MeduUser.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true}
        )
        res.status(200).json(updatedUser)
    } catch(err) {
        res.status(500).json(err);
    }
})

//DELETE USER
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await MeduUser.findByIdAndDelete(req.params.id)
        const { password, ...others } = user._doc;

        res.status(200).json({...others})
        
    } catch(err) {
        res.status(500).json(err)
    }
})


//GET USER

router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await MeduUser.findById(req.params.id)
        res.status(200).json(user)
    } catch(err) {
        res.status(500).json(err)
    }
})


//GET ALL USERS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new; //checking if there is a query new=true
    try {
        const users = query ? await MeduUser.find().sort({ _id: -1 }).limit(5) : await MeduUser.find()
        res.status(200).json(users)
    } catch(err) {
        res.status(500).json(err)
    }
})


//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
})

//Register a new User

router.post("/register", async (req, res) => {
    const newUser = new MeduUser({
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, "jestin").toString()
    })
console.log(newUser)
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
        console.log(savedUser)
        
    } catch (err) {
        res.status(500).json(err)
    }
    
})

//Login a User

router.post("/login", async (req, res) => {
    try {
        const user = await MeduUser.findOne({ username: req.body.username})

        !user && res.status(401).json("Wrong credentials!")

        const hashedPassword = CryptoJS.AES.decrypt( user.password, "jestin")
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        originalPassword !== req.body.password && res.status(401).json("Wrong Credentials!")

        const accessToken = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            "jestin",
            { expiresIn: "3d" }
        )
        //removing password to show all other user information other than the password
        //MongoDB stores all the documents in a folder _doc, so use _doc whan passing user
        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken})
    }catch (err){
        res.status(500).json(err)
    }
})

module.exports = router;