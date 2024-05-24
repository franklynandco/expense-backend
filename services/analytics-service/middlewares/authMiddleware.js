// authMiddleware.js

const jwt = require('jsonwebtoken');
const secret = 'your_jwt_secret_key';

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verify the token
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Failed to authenticate token' });
    }

    
    req.userId = decoded.id;
    next();
  });
};

module.exports = authMiddleware;
