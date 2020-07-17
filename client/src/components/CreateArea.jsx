import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: ""
  });
  const [isExpanded, setExpanded] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function expand(event) {
    setExpanded(true);
  }

  function addNote(event) {
    event.preventDefault();

    props.addNote(note);

    async function fetchData() {
      const settings = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(note)
      };
      try {
        const response = await fetch("http://localhost:3030/", settings);
        const json = await response.json();
        return json;
      } catch (e) {
        return e;
      }
    }
    fetchData();
    setNote({ title: "", content: "" });
    setExpanded(false);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            onChange={handleChange}
            name="title"
            placeholder="Title"
            value={note.title}
          />
        )}
        <textarea
          onChange={handleChange}
          onClick={expand}
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
          value={note.content}
        >
          {note.content}
        </textarea>
        <Zoom in={isExpanded}>
          <Fab onClick={addNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
