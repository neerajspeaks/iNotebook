import NoteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {
  const host = "http://localhost:5000";
  let initialnotes = [];

  // 1). Get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNmVhNjk3MDNmNDY0NTUyZGVkZTBjIn0sImlhdCI6MTY5NjA1NDc1N30.WsZHIn-0Pcw1K-MTL1qrTjzjVnrOhbtK-xb0OZTZrjs"
        },
      });
      const json = await response.json();
      setNotes(json);
      initialnotes = json;
    } catch (error) {
      console.log("Error occurred while fetching notes. ::: " + error);
    }

  };

  // 2). Add a new note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNmVhNjk3MDNmNDY0NTUyZGVkZTBjIn0sImlhdCI6MTY5NjA1NDc1N30.WsZHIn-0Pcw1K-MTL1qrTjzjVnrOhbtK-xb0OZTZrjs'
        },
        body: JSON.stringify({ title, description, tag })
      });

      const note = await response.json();
      setNotes(notes.concat(note));
    } catch (error) {
      console.log("Error occurred while adding notes. ::: " + error);
    }
  };

  // 3). Edit an existing note.
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNmVhNjk3MDNmNDY0NTUyZGVkZTBjIn0sImlhdCI6MTY5NjA1NDc1N30.WsZHIn-0Pcw1K-MTL1qrTjzjVnrOhbtK-xb0OZTZrjs"

        },
        body: JSON.stringify({ title, description, tag })
      });

      const json = await response.json();
      let newNotes = JSON.parse(JSON.stringify(notes));

      for (let index = 0; index < notes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }
      }
      setNotes(newNotes);
    } catch (error) {
      console.log("Error occurred while editing notes. ::: " + error);
    }
  };

  // 4). Delete an existing note.
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjUxNmVhNjk3MDNmNDY0NTUyZGVkZTBjIn0sImlhdCI6MTY5NjA1NDc1N30.WsZHIn-0Pcw1K-MTL1qrTjzjVnrOhbtK-xb0OZTZrjs"
        },
      });
      const json = response.json();

      const newNotes = notes.filter((note) => { return note._id !== id })
      setNotes(newNotes);
    } catch (error) {
      console.log("Error occurred while deleting notes. ::: " + error);
    }
  };

  const [notes, setNotes] = useState(initialnotes);

  return (<NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
    {props.children}
  </NoteContext.Provider>);
};

export default NoteState;