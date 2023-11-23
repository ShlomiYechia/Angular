const express = require('express');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const common = require('../common');
const router = express.Router();
const bcrypt = require('bcryptjs');

const secret = common.secret;

router.get('/', async(req, res)=>{
    try{
        const users = await User.find();
        res.send(users)
    }catch(error){
        res.status(404).send(error);
    }
});

router.post('/login', async (req, res) => {
    let user = await User.findOne({
        username: req.body.username,
    });

    if (user) {
        bcrypt.compare(req.body.password, user.password).then((result)=>{
            if(result){

                const token = jwt.sign({
                    _id: user._id,
                    username: user.username
                }, secret);

                res.send({
                    token: token,
                    username: user.username,
                    phone: user.phone,
                    email: user.email
                });
                res.end();
            }
            else{
                res.status(404);
                res.send("incorrect password");
                res.end();
            }
        })
    } 
    else {
        res.sendStatus(404); // Use sendStatus to send the status code directly
    }
});

router.post('/', async (req, res) => {
    bcrypt.hash(req.body.password,10).then(async (hashedPassword) => {
   
        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            phone: req.body.phone,
        });
       
        try {
            await newUser.save();
            res.status(201).send(newUser);
        } catch (error) {
            res.status(400).send(error);
        }
       })
   
   });

   router.put('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findOneAndUpdate(
            { _id: id },
            {
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                phone: req.body.phone,
            },
            { new: true } // Return the updated document
        );
        res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await User.deleteOne({
            _id: req.params.id,
        });
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
});
router.get('/logout', (req, res) => {
    // Destroy the user's session
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        // Clear authentication cookies (if used)
        res.clearCookie('session-id'); // Replace with your cookie name

        // Redirect to the login page or a logged-out state
        res.redirect('/login'); // Redirect to your login page
    });
});

module.exports = router;
