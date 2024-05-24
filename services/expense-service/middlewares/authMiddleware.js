const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret_key'; // Make sure this matches the one used to sign the token

const verifyToken = (req, res, next) => {
  let token = req.headers['authorization'] || req.headers['x-access-token'];

  console.log('Authorization Header:', req.headers['authorization']);
  console.log('X-Access-Token Header:', req.headers['x-access-token']);

  if (!token) {
    console.error('No token provided');
    return res.status(403).send({ error: 'No token provided' });
  }

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trim(); // Remove 'Bearer ' from string
  }

  console.log('Token:', token);

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err);
      return res.status(500).send({ error: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;





