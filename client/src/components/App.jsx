import React, { useState, useEffect } from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import CreateArea from "./CreateArea";

function App() {
  const [noteList, setNoteList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3030/");
      const json = await response.json();
      setNoteList(json);
    }
    fetchData();
  });

  function addNote(note) {
    setNoteList(prev => {
      return [...noteList, note];
    });
  }

  function deleteNote(id) {
    setNoteList(prevNotes => {
      return prevNotes.filter(note => {
        return id !== note._id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNote} />
      {noteList.map((note, index) => (
        <Note
          key={note._id}
          id={note._id}
          favorite={note.favorite}
          title={note.title}
          content={note.content}
          deleteNote={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
