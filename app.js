const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
mongoose.connect("mongodb://localhost/keeper", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  favorite: {
    type: Boolean,
    default: false
  },
  dateAdded: {
    type: Date,
    default: new Date()
  }
});

const Note = mongoose.model("Note", noteSchema);

app
  .route("/")
  .get(async (req, res) => {
    const notes = await Note.find();
    res.send(notes);
  })
  .post(async (req, res) => {
    const { title, content, favorite } = req.body;
    const newNote = await new Note({
      title,
      content,
      favorite
    });
    newNote.save();

    res.send(newNote);
  });

app
  .route("/:id")
  .put(async (req, res) => {
    const note = await Note.updateOne(
      { id: req.params._id },
      {
        title: req.body.title,
        content: req.body.content,
        favorite: req.body.favorite
      }
    );
    res.send(note);
  })
  .patch(async (req, res) => {
    const note = await Note.updateOne(
      { id: req.params._id },
      {
        $set: req.body
      }
    );
    res.send(note);
  })
  .delete(async (req, res) => {
    const noteId = req.params.id;

    Note.findByIdAndDelete(noteId, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(`Successfully deleted note: ${noteId}`);
      }
    });
  });

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
