import React from "react";
// import DeleteIcon from "@material-ui/icons/Delete";

function Note(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button
        name={props.id}
        onClick={event => {
          event.preventDefault();
          const noteId = event.target.name;

          props.deleteNote(noteId);

          async function fetchData() {
            console.log(noteId);
            const settings = {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              }
            };
            try {
              const response = await fetch(
                "http://localhost:3030/" + noteId,
                settings
              );
              const json = await response.json();
              return json;
            } catch (e) {
              return e;
            }
          }
          fetchData();
        }}
      >
        {/* <DeleteIcon /> */}
        Delete
      </button>
    </div>
  );
}

export default Note;
