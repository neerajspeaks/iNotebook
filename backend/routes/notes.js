const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');
var fetchuser = require('../middleware/fetchuser');
const user = require('../models/User');

//Route 1 : Get all the note : GET "/api/note/fetchallnote : Login required.".
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id });
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error.");
    }
});

//Route 2 : Add a new note : POST "/api/note/addnote : Login required.".
router.post('/addnote', fetchuser, [
    body('title', 'Enter a title').isLength({ min: 3 }),
    body('description', 'Description must be at least 5 characters long.').isLength({ min: 5 }),
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //If There are errors, return bad request along with errors.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const notedNote = await note.save();
        res.json(notedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error.");
    }
});

//Route 3 : Update an existing note with : put "/api/note/updatenote : Login required.".
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) { newNote.title = title };
        if (title) { newNote.description = description };
        if (title) { newNote.tag = tag };

        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found!");
        }

        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Unauthorised access!");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error.");
    }
});

//Route 4 : Delete an existing note with : delete "/api/note/deletenote : Login required.".
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Note not found!");
        }

        if (note.user.toString() != req.user.id) {
            return res.status(401).send("Unauthorised access!");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({ "Success": "Note is successfully deleted", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error.");
    }
});

module.exports = router;