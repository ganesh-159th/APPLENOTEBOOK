const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');


//createing using :post "/api/auth/".doesnt require auth
router.post('/', [
    body('name', 'Enter valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter the correct password').isLength({ min: 5 })
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }).then(User => res.json(User)).catch(err => { console.log(err) 
        res.json({error:'please enter a unique address',message: err.message})})
    
    
   
  });
  
  
module.exports = router