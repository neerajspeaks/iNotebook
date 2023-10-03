import React, {useContext} from 'react';
import NoteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {
    const context = useContext(NoteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    const handleDelete = () => {
        deleteNote(note._id);
        props.showAlert("Deleted successfully", "success");
    };
    return (
        <div className="col-md-3">
            <div className="card my-3 mx-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title"> {note.title}</h5>
                        <i className="fa-solid fa-trash fa-sm mx-2" onClick = {handleDelete}></i>
                        <i className="fa-regular fa-pen-to-square fa-sm" onClick = {() => updateNote(note)}></i>
                    </div>
                    <p className="card-text"><small>{note.description}</small></p>

                </div>
            </div>
        </div>
    );
}

export default NoteItem;
