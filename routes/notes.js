const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTERS1 : get all the notes

router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(err.message);
    res.status(500).send("internal server error has been occured");
  }
});

//ROUTER2 : post request  add a new note usign the post method "api/auth/addnote"

router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter valid name").isLength({ min: 3 }),

    body("description", "Enter the correct password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if there are erroe in teh validation then this sectionare code with recognize it and handle the error
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.log(err.message);
      res.status(500).send("internal server error has been occured");
    }
  }
);

module.exports = router;
