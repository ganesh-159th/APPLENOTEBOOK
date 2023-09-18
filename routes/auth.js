const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const JWT_SECTRET = "ganeshisaniceboy";
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");

// ROUTE:1 createing using :post "/api/auth/".doesnt require auth
router.post(
  "/createuser",
  [
    body("name", "Enter valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter the correct password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    //if there are erroe in teh validation then this sectionare code with recognize it and handle the error
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check weather the use has givne the correct input are not
    try {
      let user = await User.findOne({ email: req.body.email });
      console.log(user);
      if (user) {
        return res
          .status(400)
          .json({ error: "sorry a user with this email aready email" });
      }
      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      // createing the nu=ew user here
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECTRET);
      //   console.log(authtoken)
      // .then(User => res.json(User))
      // .catch(err => { console.log(err)
      //     res.json({error:'please enter a unique address',message: err.message})})
      //   res.json(user);
      res.json({ authtoken });
      // here is used for catching the error here
    } catch (err) {
      console.log(err.message);
      res.status(500).send("some error has been occured");
    }
  }
);
//this is ROUTE2: authentication
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password  cannot be blank").exists(),
  ],
  async (req, res) => {
    // if there are error , return bad request and the error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "please try to login with the correct email " });
      }

      const passwordcompare =  bcrypt.compare(password, user.password);
      if (!passwordcompare) {
        return res
          .status(400)
          .json({ error: "please try to enter  the correct  password" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECTRET);
      res.json({ authtoken });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("internal server error has been occured");
    }
    //autentication a user using:post "/api/auth/login". no longer required
  }
);

//ROUTE 3: GET user loggedin  details  using :post "api/auth/getuser" .  login  reuired
// ROUTE 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser,  async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


module.exports = router;
