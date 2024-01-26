const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1 get all the notes login required  http://localhost:4000/api/notes/fetchallnotes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status().send("Internal server Error");
  }
});

//Route 2 add new note login required  http://localhost:4000/api/notes/addnote
router.post( 
  "/addnote",
  fetchuser,
  [
    body("title", "Enter valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.send({ errors: result.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await note.save();
      res.json(savednote);
    } catch (error) {
      console.error(error.message);
      res.status().send("Internal server Error");
    }
  }
);

//Route 3 update an existing note login required  http://localhost:4000/api/notes/updatenote/:id
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try{
  const { notes, title, description, tag } = req.body;
  const newnote = {};
  if (title) {
    newnote.title = title;
  }
  if (description) {
    newnote.description = description;
  }
  if (tag) {
    newnote.tag = tag;
  }

  //find the note to be updated
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
  //allow updation only if user owns this note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }
  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newnote },
    { new: true }
  );
  res.json(note);
    }
    catch (error) {
        console.error(error.message);
        res.status().send("Internal server Error");
      }
});

//Route 4 delete a note login required  http://localhost:4000/api/notes/deletenote/:id
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try{
    //find the note to be deleted
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not Found");
  }
    //allow deletion only if user owns this note
  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }
  note=await Notes.findByIdAndDelete(req.params.id)
  res.json({'Success':"Note has been deleted",note:note})
}
catch (error) {
    console.error(error.message);
    res.status().send("Internal server Error");
  }
});

module.exports = router;
