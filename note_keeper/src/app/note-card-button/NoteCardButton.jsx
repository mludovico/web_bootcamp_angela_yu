import React from 'react';

export default function NoteCardButton(props) {
    function onClick() {
        console.log("Button clicked");
        props.action?.call();
    }
    return <button className="note-card-button" onClick={onClick}>{props.children}</button>;
}