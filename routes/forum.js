const Forum = require('../models/Forum');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();

//UPDATE FORUM
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    
    try {
        const updatedForum = await Forum.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true}
        )
        res.status(200).json(updatedForum)
    } catch(err) {
        res.status(500).json(err);
    }
})

//DELETE FORUM
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Forum.findByIdAndDelete(req.params.id)
        const { password, ...others } = user._doc;

        res.status(200).json({...others})
        
    } catch(err) {
        res.status(500).json(err)
    }
})


//GET FORUM

router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const forum = await Forum.findById(req.params.id)
        res.status(200).json(forum)
    } catch(err) {
        res.status(500).json(err)
    }
})


//GET ALL FORUMS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new; //checking if there is a query new=true
    try {
        const forums = query ? await Forum.find().sort({ _id: -1 }).limit(5) : await Forum.find()
        res.status(200).json(forums)
    } catch(err) {
        res.status(500).json(err)
    }
})


//CREATE NEW FORUMS
router.post("/new", verifyTokenAndAdmin, async (req, res) => {
    const newForum = new Forum({
        title: req.body.title,
        heading: req.body.heading,
        comments: req.body.comments
    })

    try {
        const savedForum = await newForum.save();
        res.status(201).json(savedForum)
        
    } catch (err) {
        res.status(500).json(err)
    }
    
})

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
})

module.exports = router;