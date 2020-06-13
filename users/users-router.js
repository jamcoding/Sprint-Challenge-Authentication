const router = require('express').Router();

const Users = require('./users-model.js');

router.get('/', (req, res) => {
    Users.find()
        .then(user => {
            res.status(200).json(user)
        }) 
        .catch(error => {
            res.status(401).json({ message: "You shall not pass!" });
        })
});


module.exports = router;