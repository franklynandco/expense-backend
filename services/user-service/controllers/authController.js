const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

const secret = 'your_jwt_secret';

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  userModel.createUser({ username, email, password }, (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error registering user' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  userModel.findUserByEmail(email, (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '5h' });
    res.status(200).json({ token });
  });
};


