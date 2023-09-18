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
//ROUTE:3  update the existsing note "api/note/updatenote"

router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // create a new note object
  try {
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // find the note nto be update

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json({ note });
  } catch (error) {
    console.log(err.message);
    res.status(500).send("internal server error has been occured");
  }
});
//ROUTE:4  delete the existing the content "api/note/deletenote"

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // find the note nto be update and  deleteted

    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }
    // allow deletion onlu if user owns this note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({
      Sucess: "note has been deleted from the note book",
      note: note,
    });
  } catch (error) {
    console.log(err.message);
    res.status(500).send("internal server error has been occured");
  }
});

module.exports = router;
