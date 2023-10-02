import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import NoteContext from '../context/notes/NoteContext';

const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes, editNote } = context;

    const ref = useRef(null);
    const refClose = useRef(null);

    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });


    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    };

    useEffect(() => {
        getNotes();
    }, []);

    const handleClick = (event) => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();
        setNote({ id: "", etitle: "", edescription: "", etag: "" });
    };

    const handleChange = (event) => {
        setNote({ ...note, [event.target.name]: event.target.value });
    };

    return (
        <>
            <AddNote />
            <button ref={ref} type="button" className="d-none btn btn-primary" data-bs-toggle="modal" data-bs-target="#examplemodal"></button>
            <div className="modal" id="examplemodal" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={handleChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChange} minLength={5} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                <h2>Your Notes</h2>
                <div className="container mx-2">
                    {notes.handleChange === 0 && 'No notes to display.'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    );
}

export default Notes;
