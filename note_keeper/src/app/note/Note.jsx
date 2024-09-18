import React from "react";
import ActionBar from "../action_bar/ActionBar.jsx";

export default function Note(props) {
    const note = props.note;
    return <div className="note-card">
        <h4 className={note.done ? 'done' : ''}>{note.title}</h4>
        <p className={note.done ? 'done' : ''}>{note.content}</p>
        <ActionBar note={note} reloadCallback={props.reloadCallback}></ActionBar>
    </div>;
}