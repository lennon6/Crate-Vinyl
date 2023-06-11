const db = require('../models/poolsModels');
const bcrypt = require('bcrypt');

const loginController = {};

// middleware for creating a user

loginController.createUser = async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      // Check if username already exists
      const sqlCheckUsername = 'SELECT * FROM users WHERE username = $1';
      const usernameExists = await db.query(sqlCheckUsername, [username]);
  
      if (usernameExists.rows.length > 0) {
        return res.status(400).json({ error: 'Username already taken' });
      }
  
      const hash = await bcrypt.hash(password, 10);
      const sqlAddUser = 'INSERT INTO users (username, password) VALUES ($1, $2)';
      const results = await db.query(sqlAddUser, [username, hash]);
  
      return next();
    } catch (err) {
      return next({
        log: 'error',
        message: { err: 'Error in creating user' },
      });
    }
  };

// middleware for verifying a user

loginController.verifyUser = async (req, res, next) => {
    const { username, password } = req.body;
  
    try {
      const sqlVerifyUser = 'SELECT * FROM users WHERE username = $1';
      const results = await db.query(sqlVerifyUser, [username]);
  
      if (results.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const user = results.rows[0];
  
      const isValid = await bcrypt.compare(password, user.password);
  
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      req.userId = user.id;
      return next();
    } catch (err) {
      return next({
        log: 'error',
        message: { err: 'Error in verifying user' },
      });
    }
  };


module.exports = loginController;