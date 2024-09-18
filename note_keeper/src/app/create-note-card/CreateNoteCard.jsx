import React, {useState} from 'react';
import NoteCardButton from "../note-card-button/NoteCardButton.jsx";

export default function CreateNoteCard(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")

    function addNote() {
        const note = {
            title: title,
            content: content
        };
        fetch('http://localhost:3000/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            }
        ).then(response => {
            if (response.ok) {
                console.log('Note added');
                setTitle("")
                setContent("")
                props.reloadCallback();
            } else {
                console.error('Failed to add note');
            }
        }).catch(error => console.error(error));
    }

    function onChangeTitle(event) {
        setTitle(event.target.value)
    }

    function onChangeContent(event) {
        setContent(event.target.value)
    }

    return <div className="create-note-card">
        <input type="text" placeholder="Title" onChange={onChangeTitle} value={title}/>
        <textarea placeholder="Take a note..." onChange={onChangeContent} value={content}/>
        <NoteCardButton action={addNote}>Add</NoteCardButton>
    </div>;
}