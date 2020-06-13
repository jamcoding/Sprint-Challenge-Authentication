const bcryptjs = require('bcryptjs');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

const Users = require('../users/users-model.js');
const { isValid } = require('../users/users-service.js');


router.post('/register', (req, res) => {
  // implement registration
  const credentials = req.body;

  if (isValid(credentials)) {
    const hash = bcryptjs.hashSync(credentials.password, 10);
    credentials.password = hash;

    Users.add(credentials)
      .then(user => {
        res.status(201).json({ data: user })
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      }) 
  } else {
    res.status(400).json({ message: 'please provide username and password' })
  }
});

router.post('/login', (req, res) => {
  // implement login
  const { username, password } = req.body;

  if(isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: 'welcome',
            token
          })
        } else {
          res.status(401).json({ message: 'You shall not pass!' })
        }
      })
      .catch(error => {
        res.status(500).json({ message: error.message })
      })
  } else {
    res.status(400).json({ message: 'please provide username and password' })
  }
});

function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    };

    const options = {
        expiresIn: '1h'
    };

    return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
