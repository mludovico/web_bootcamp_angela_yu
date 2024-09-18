import React from "react";
import NoteCardButton from "../note-card-button/NoteCardButton.jsx";

export default function ActionBar(props) {
    const note = props.note;
    function deleteNote() {
        fetch(`http://localhost:3000/notes/${note.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(() => {
            props.reloadCallback();
        }).catch(error => {
            console.error(error);
        });
    }

    function markDone() {
        fetch(`http://localhost:3000/notes/${note.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({...note, done: true}),
        }).then(() => {
            props.reloadCallback();
        }).catch(error => {
            console.error(error);
        });
    }
    return <div className="action-bar">
        <NoteCardButton action={markDone}>Done</NoteCardButton>
        <NoteCardButton action={deleteNote}>Delete</NoteCardButton>
    </div>;
}